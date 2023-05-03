import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";
const appSettings = {
  databaseURL:
    "https://playground-a44d9-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shopingList");

const addButtonEL = document.getElementById("add-button");
const inputFiledEL = document.getElementById("input-field");
const shopingListEL = document.getElementById("shoping-list");

addButtonEL.addEventListener("click", function () {
  let inputValue = inputFiledEL.value;
  push(shoppingListInDB, inputValue);
  clearInputField();
});

const clearInputField = () => {
  inputFiledEL.value = "";
};

const addElementInShopingList = (item) => {
  let itemID = item[0];
  let itemValue = item[1];
  let newElement = document.createElement("li");

  newElement.textContent = itemValue;

  newElement.addEventListener("click", () => {
    let exactLocationOfItemInDB = ref(database, `shopingList/${itemID}`);
    remove(exactLocationOfItemInDB);
  });

  shopingListEL.append(newElement);
};

onValue(shoppingListInDB, function (snapshot) {
  if (snapshot.exists()) {
    let listItem = Object.entries(snapshot.val());

    clearListItem();
    for (let i = 0; i < listItem.length; i++) {
      let currentItem = listItem[i];
      let currentItemID = currentItem[0];
      let currentItemValue = currentItem[1];

      addElementInShopingList(currentItem);
    }
  } else {
    shopingListEL.innerHTML = "No item here... yet";
  }
});

const clearListItem = () => {
  shopingListEL.innerHTML = "";
};

/* let scrimbaUsers = {
  "00": "1@gmail.com",
  "01": "2@gmail.com",
  "02": "3@gmail.com",
  "03": "4@gmail.com",
};

let scrimbaUsersEmails = Object.values(scrimbaUsers);
console.log(scrimbaUsersEmails);

let scrimbaUsersID = Object.keys(scrimbaUsers);
console.log(scrimbaUsersID);

let scrimbaUsersEnteries = Object.entries(scrimbaUsers);
console.log(scrimbaUsersEnteries);
 */
