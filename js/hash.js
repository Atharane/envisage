const insertButton = document.getElementById("insert-btn");
const deleteButton = document.getElementById("delete-btn");
const messageEl = document.getElementById("alert-message");
const crossIcon = document.getElementById("cross-icon");
const size = 7; // size of hash table, preferably prime

let hashTable = [
  [],
  [],
  [],
  [],
  [],
  [
    { key: "ath", value: 101 },
    { key: "hat", value: 102 },
    { key: "tah", value: 103 },
  ],
  [],
];

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

    // hashTable.push([]);
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
    sum += key.charCodeAt(i) * 10 + index;
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

function addRedBorder(el) {
  console.log(`adding red borders to cell[${el}]`);
  el.style.borderColor = "crimson";
}

function removeBorder(el) {
  el.style.borderColor = "#f5f5f7";
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
  addRedBorder(index_el);

  setTimeout(() => {
    removeBorder(index_el);
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
  let len = row.length;

  let rowEl = document.getElementsByClassName("row")[index];
  let cells = rowEl.children;

  console.log(cells);

  let i = 0;
  for (i; i < len; i++) {
    setTimeout(() => {
      addRedBorder(i);
    }, 0);

    console.log(i);

    if (row[i].key === key_el.value) {
      row.splice(i, 1);
      break;
    }

    setTimeout(() => {
      removeBorder(cells[i]);
    }, (i+1) * 500);
  }

  // if key doesn't exist, show error message
  if (i == len || len == 0) {
    let message_content = document.getElementById("alert-message-content");
    message_content.textContent = `Key ${key_el.value} not found`;
    messageEl.style.display = "flex";
    key_el.value = "";
    return;
  }

  renderCells(index);
  key_el.value = "";
});

renderRows(size);
renderCells(5);
