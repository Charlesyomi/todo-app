let todoItems = [];
let completedTodoItems = [];
let activeTodoItems = [];

const todoList = document.getElementById("todo-list");
const todoField = document.getElementById("todo-input");

// function getTodoValue() {
//   const todoField = document.getElementById("todo-input");
//   return todoField.value;
// }

document.getElementById("todo-form").addEventListener("submit", (e) => {
  e.preventDefault();
  //   todoDescriptionValue = getTodoValue;
  const todoDescriptionValue = todoField.value;
  updateTodoList(todoDescriptionValue);
  todoField.value = null;
});

function setAttributes(elem, attrs) {
  /*attr contains key value pairs of attributes we want to set and their values*/
  if (typeof attrs === "object") {
    Object.entries(attrs).forEach(([key, value]) =>
      elem.setAttribute(key, value)
    );
  } else {
    console.warn(
      "setAttributes function must have an object as the second argument"
    );
  }
}

// function createCheckBtnUI() {
//   const checkBtn = document.createElement("input");
//   setAttributes(checkBtn, {});
// }
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
}
