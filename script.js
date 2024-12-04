const todoList = document.getElementById("todo-list");
const todoField = document.getElementById("todo-input");
const todoItems = [];
const completedTodoItems = [];
const activeTodoItems = [];

// getElementByClassName returns a live list which means it is automatically updated --- should be good for keeping my local storage up to date

document.getElementById("todo-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const todoDescriptionValue = todoField.value;
  updateTodoList(todoDescriptionValue);
  // todoDescriptionValue = null;
  todoField.value = null;
});

// function getTodoDescription(){

// }

// write a function such as createDomNode or createBtn ui to handle this creations
// write a function to create ui components need for the update list function
function updateTodoList(todoDescriptionValue) {
  if (todoDescriptionValue.length === 0) return;
  //   display an error message telling the user he has not inputed anything

  const todoDescription = document.createElement("p");
  todoDescription.innerText = todoDescriptionValue;
  // // todoDescription.setAttribute("draggable", "true");
  todoDescription.setAttribute("class", "todo__descp");

  const checkBtn = document.createElement("input");
  // <input type="checkbox" name="" id=""></input>
  // create a function to set multiple attributes for an element
  // give the checkbox a label of mark task complete/reopen task for accessibility
  checkBtn.setAttribute("type", "checkbox");
  checkBtn.setAttribute("name", "");
  checkBtn.setAttribute("id", "");
  checkBtn.setAttribute("class", "check-btn");
  // checkBtn.setAttribute("onclick", "initButtons(this)");

  const checkForm = document.createElement("form");
  checkForm.setAttribute("class", "check-form");
  checkForm.appendChild(checkBtn);

  const deleteTodoBtn = document.createElement("button");
  deleteTodoBtn.innerText = `delete task`;

  // const itemID = todoList.childElementCount + 1;
  // console.log(itemID);
  const todoItem = document.createElement("li");
  todoItem.setAttribute("draggable", "true");
  // todoItem.setAttribute("id", `todo-item${itemID}`);
  // todoItem.innerHTML = `<p class="todo__descp">${todoDescriptionValue}</p><button class="btn todo__btn">mark task as complete</button>`;

  todoItem.appendChild(todoDescription);
  todoItem.appendChild(checkForm);
  todoItem.appendChild(deleteTodoBtn);
  todoItems.push(todoItem);
  activeTodoItems.push(todoItem);

  console.log(activeTodoItems);
  console.log(todoItems);

  todoList.appendChild(todoItem);

  listenForDrag(todoItem);

  initButtons(checkBtn, deleteTodoBtn);

  // initButtons(checkBtn);

  // updateLocalStorageStore(todoItem);

  // storeInLocalStore();
  updateLocalStorageStore();

  return todoItem;
}

// handle drag and drop

function listenForDrag(target) {
  target.addEventListener("dragstart", handleDragStart);
  target.addEventListener("dragenter", handleDragEnter);
  target.addEventListener("dragover", handleDragOver);
  target.addEventListener("dragleave", handleDragLeave);
  target.addEventListener("drop", handleDrop);
  target.addEventListener("dragend", handleDragEnd);

  // the order of the listeners in this case doesn't really matter
}

let dragSrcEl;

function handleDragStart(ev) {
  console.log("event: ", ev);
  dragSrcEl = ev.target;
  // console.log(dragSrcEl.id);

  // const transferObject = {
  //   object: dragSrcEl,
  // };

  // console.log(JSON.stringify(transferObject));

  // console.log(ev.target);
  // const dataTransferred = dragSrcEl;
  // console.log(dataTransferred);
  // const dataReceived = JSON.parse(dataTransferred);
  // console.log(dataReceived);

  // ev.dataTransfer.setData("text", dragSrcEl.id);
  ev.dataTransfer.effectAllowed = "move";
  // transfer json data

  // console.log(ev.dataTransfer.effectAllowed);

  // ev.dataTransfer.setData("text/javascript", this.innerHTML);
}
function handleDragOver(ev) {
  // console.log("event: ", ev);
  ev.preventDefault();
  return false;
}
function handleDragEnter(ev) {
  // console.log("event: ", ev);
}
function handleDragLeave(ev) {
  // console.log("event: ", ev);
}

// fired on the dropzone
function handleDrop(ev) {
  ev.stopPropagation();
  console.log("event: ", ev);

  if (dragSrcEl !== this) {
    // let dataReceived = ev.dataTransfer.getData("text");

    const dropSrcEl = this;

    // console.log(dataReceived);
    console.log(dropSrcEl);

    swapElemNodes(dragSrcEl, dropSrcEl);
    // swapIDs(dragSrcEl, dropSrcEl);

    // IN THE END I DIDN'T GET TO USE THE DATA TRANSFER PROPERTY(AN OBJECT) OF TH DRAG AND DROP EVENT JUST MOVED ENTIRE DOM NODES
  }
  return false;
}
function handleDragEnd(ev) {
  // console.log("event: ", ev);
}

// HANDLE TASK COMPLETION

const todoBtns = document.getElementsByClassName("todo__btn");

function initButtons(checkBtn, deleteTodoBtn) {
  checkBtn.addEventListener("change", toggleTaskCompletion);
  deleteTodoBtn.addEventListener("click", deleteTodo);
}

function toggleTaskCompletion() {
  console.log("toggle button works");
  const itemToggled = this.parentElement.parentElement.children[0];

  if (this.checked) {
    itemToggled.outerHTML = `<del class = "todo__descp todo__descp--complete">${itemToggled.innerHTML}</del>`;

    // activeTodoItems.pop(this.parentElement.parentElement);
    removeItem(activeTodoItems, this.parentElement.parentElement);
    console.log(`sucessfully removed completed task`);
    completedTodoItems.push(this.parentElement.parentElement);

    console.log("activeTodoItems:", activeTodoItems);
    console.log("completedTodoItems:", completedTodoItems);
    // console.log("all todo:", todoItems);
  }
  if (this.checked === false) {
    itemToggled.outerHTML = `<p class = "todo__descp todo__descp--incomplete">${itemToggled.innerHTML}</p>`;
    // console.log("piiie");

    activeTodoItems.push(this.parentElement.parentElement);
    // completedTodoItems.pop(this.parentElement.parentElement);
    removeItem(completedTodoItems, this.parentElement.parentElement);

    console.log("activeTodoItems:", activeTodoItems);
    console.log("completedTodoItems:", completedTodoItems);
    // console.log("all todo:", todoItems);
  }

  updateLocalStorageStore();
}

function markTaskComplete() {}

function swapElemNodes(elem1, elem2) {
  const afterElem2 = elem2.nextElementSibling;
  const parent = elem2.parentNode;

  if (afterElem2 === elem1) parent.insertBefore(elem1, elem2);
  else {
    elem1.replaceWith(elem2);
    parent.insertBefore(elem1, afterElem2);
  }
}

function swapIDs(elem1, elem2) {
  const hold = elem1.id;
  elem1.id = elem2.id;
  elem2.id = hold;
}

document
  .getElementById("show-active")
  .addEventListener("click", showOnlyActiveTasks);
document
  .getElementById("show-completed")
  .addEventListener("click", showOnlyCompletedTasks);
document.getElementById("show-all").addEventListener("click", showAllTasks);

function showOnlyActiveTasks() {
  todoItems.forEach((element) => {
    element.classList.remove("completely-hidden");
  }); // makes sure that no matter what element does not have this class twice
  completedTodoItems.forEach((element) => {
    element.classList.add("completely-hidden");
  });
  // todoItems.forEach((element) => {
  //   element.classList.add("completely-hidden");
  // });
  // activeTodoItems.forEach((element) => {
  //   element.classList.remove("completely-hidden");
  // });
  // completedTodoItems.forEach((element) => {
  //   element.classList.add("completely-hidden");
  // });

  console.log("activeTodoItems:", activeTodoItems);
}
function showOnlyCompletedTasks() {
  todoItems.forEach((element) => {
    element.classList.remove("completely-hidden");
  }); // makes sure that no matter what element does not have this class twice
  activeTodoItems.forEach((element) => {
    element.classList.add("completely-hidden");
  });

  // console.log("hi there");

  // first of all check if the classlist is present
  // an error may occur depending on when the task arrays are updated and when the show***tasks are called
  // todoItems.forEach((element) => {
  //   element.classList.add("completely-hidden");
  // });

  // activeTodoItems.forEach((element) => {
  //   element.classList.add("completely-hidden");
  // });
  // todoItems.forEach((element) => {
  //   element.classList.add("completely-hidden");
  // });
  // completedTodoItems.forEach((element) => {
  //   element.classList.remove("completely-hidden");
  // });

  console.log("completedTodoItems:", completedTodoItems);
}
function showAllTasks() {
  // todoItems.forEach((element) => {
  //   element.classList.remove("completely-hidden");
  // });

  todoItems.forEach((element) => {
    element.classList.remove("completely-hidden");
  });
  console.log("all todo:", todoItems);
}

function removeItem(arr, itemValue) {
  // credit: justin liu on stackoverflow

  let itemIndex = arr.indexOf(itemValue);

  if (itemIndex > -1) arr.splice(itemIndex, 1);

  return arr;
}

function deleteTodo() {
  console.log("testing");

  const todoDeleted = this.parentElement;

  removeItem(activeTodoItems, todoDeleted);
  removeItem(completedTodoItems, todoDeleted);
  removeItem(todoItems, todoDeleted);
  updateLocalStorageStore();

  todoDeleted.remove();

  console.log("activeTodoItems:", activeTodoItems);
  console.log("completedTodoItems:", completedTodoItems);
  console.log("todoItems:", todoItems);
}

// implement local storage

const localStorageStore = [];

function updateLocalStorageStore() {
  localStorageStore.length = 0;

  for (let i = 0; i < todoItems.length; i++) {
    const todoDescriptionValue = todoItems[i].children[0].innerHTML;

    const checkBtn = todoItems[i].children[1].children[0];

    const todoCompletionState = checkBtn.checked;

    localStorageStore.push({
      descp: todoDescriptionValue,
      status: todoCompletionState,
    });
  }

  console.log("localStorageStore: ", localStorageStore);

  updateLocalStorage();
}

function updateLocalStorage() {
  localStorage.setItem("storedTodos", JSON.stringify(localStorageStore));
}

// load local storage content when the page loads

window.addEventListener("load", loadPrevStoredTodos);

function loadPrevStoredTodos() {
  const prevStoredTodos = JSON.parse(localStorage.getItem("storedTodos"));
  console.log("prevStoredTodos: ", prevStoredTodos);

  if (prevStoredTodos.length > 0) {
    for (let i = 0; i < prevStoredTodos.length; i++) {
      const todoItem = updateTodoList(prevStoredTodos[i].descp);
      if (prevStoredTodos[i].status === true) {
        checkBtn = todoItem.children[1].children[0];
        console.log(checkBtn);
        checkBtn.checked = true;
        toggleTaskCompletion.bind(checkBtn);
      }
    }
  }
}
