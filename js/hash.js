const insertButton = document.getElementById("insert-btn");
const deleteButton = document.getElementById("delete-btn");
const messageEl = document.getElementById("alert-message");
const crossIcon = document.getElementById("cross-icon");
const size = 7; // size of hash table, preferably prime

let hashTable = [];

function renderRows(size) {
  let HashTableEl = document.getElementById("hash-table");
  for (let i = 0; i < size; i++) {
    /* 
    <div class="row-wrapper">
      <div class="index" id="index-${i}">${i}</div>
      <div class="row" id="row-${i}"></div>
    </div>
    */

    let row_wrapper = document.createElement("div");
    row_wrapper.className = "row-wrapper";

    let index = document.createElement("div");
    index.className = "index";
    index.id = `index-${i}`;
    index.textContent = i;

    let row = document.createElement("div");
    row.className = "row";
    row.id = `row-${i}`;

    row_wrapper.appendChild(index);
    row_wrapper.appendChild(row);

    HashTableEl.appendChild(row_wrapper);

    hashTable.push([]);
  }
}

function renderCells(row_index) {
  let rowEl = document.getElementById(`row-${row_index}`);
  rowEl.innerHTML = "";

  let row = hashTable[row_index];

  for (let i = 0; i < row.length; i++) {
    /*
    <div class="cell">
      <span class="key">${row[i].key}</span>
      <span class="value">${row[i].value}</span>
    </div>
    */

    let cell = document.createElement("div");
    cell.className = "cell";

    let key = document.createElement("span");
    key.className = "key";
    key.textContent = row[i].key;

    let value = document.createElement("span");
    value.className = "value";
    value.textContent = row[i].value;

    cell.appendChild(key);
    cell.appendChild(value);

    rowEl.appendChild(cell);
  }
}

function hash(key) {
  let sum = 0;
  let index = 1;

  for (let i = 0; i < key.length; i++) {
    // ASCII * 10 + index
    sum += key.charCodeAt(i) * index;
    index++;
  }
  return sum % size;
}

crossIcon.addEventListener("click", () => {
  messageEl.style.display = "none";
});

function showErrorMessage(message) {
  messageEl.style.display = "flex";
  let message_content = document.getElementById("alert-message-content");
  message_content.innerHTML = message;

  setTimeout(() => {
    messageEl.style.display = "none";
  }, 1500);
}

// addRedBorder RETURNS A FUNCTION that adds red border to the element
function addRedBorder(el) {
  return () => {
    el.style.borderColor = "crimson";
  };
}

// removeBorder RETURNS A FUNCTION that removes border from the element
function removeBorder(el) {
  return () => {
    el.style.borderColor = "#f5f5f7";
  };
}

insertButton.addEventListener("click", () => {
  const key_el = document.getElementById("key-input");
  const value_el = document.getElementById("value-input");

  if (key_el.value === "" || value_el.value === "") {
    showErrorMessage("Please fill in all fields");
    return;
  }

  let index = hash(key_el.value);
  hashTable[index].unshift({ key: key_el.value, value: value_el.value });

  let index_el = document.getElementById(`index-${index}`);
  addRedBorder(index_el)();

  setTimeout(() => {
    removeBorder(index_el)();
    renderCells(index);
    key_el.value = "";
    value_el.value = "";
  }, 600);
});

deleteButton.addEventListener("click", () => {
  const key_el = document.getElementById("key-input");

  if (key_el.value === "") {
    showErrorMessage("Enter a valid key");
    return;
  }

  let index = hash(key_el.value);

  let row = hashTable[index];
  let rowEl = document.getElementById(`row-${index}`);
  let cells = rowEl.children;

  // no entries in the bucket
  if (cells.length === 0) {
    showErrorMessage("Key not found");
    return;
  }

  let animationInterval = 400; // milliseconds

  for (var i = 0; i < cells.length; i++) {
    var child = cells[i];

    setTimeout(addRedBorder(child), i * animationInterval);

    if (row[i].key === key_el.value) {
      row.splice(i, 1);

      setTimeout(() => {
        renderCells(index);
        key_el.value = "";
      }, (i + 1) * animationInterval);

      break;
    }

    setTimeout(removeBorder(child), (i + 1) * animationInterval);

    if (i === cells.length - 1) {
      setTimeout(()=>{showErrorMessage("Key not found")}, (i + 1) * animationInterval);
    }
  }
});

renderRows(size);
