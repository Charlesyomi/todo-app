// import * as Store from "./store.js";
import { renderTodo, reRenderItemsOnload } from "./render.js";
import { createTodo } from "./crud.js";
// import { listenForDrag } from "./drag.js";

// let numTodoCreated = 0;
// let Store.todoItemsRef = [];
// let completedTodoItems = [];
// const activeTodoItems = [];

// function setAttributes(elem, attrs) {
//   if (typeof attrs === "object") {
//     Object.entries(attrs).forEach(([key, value]) =>
//       elem.setAttribute(key, value)
//     );
//   } else {
//     console.warn(
//       "setAttributes function must have an object as the second argument"
//     );
//   }
// }

document.getElementById("todo-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const todoInput = document.getElementById("todo-input").value;

  if (todoInput.length === 0) return;

  // a case of converting an edit to a fresh todo fresh todo

  if (document.getElementById("todo-edit")) {
    document.getElementById("todo-edit").remove();
  }

  const todoItem = createTodo(todoInput);
  renderTodo(todoItem);

  document.getElementById("todo-input").value = "";
});

// function Store.generateStorageId() {
//   const todoId = `#${++numTodoCreated}`;
//   localStorage.setItem("numTodoCreated", JSON.stringify(numTodoCreated));
//   return todoId;
// }
// function createTodo(descp) {
//   const todoItem = {
//     descp,
//     completionStatus: false,
//     id: Store.generateStorageId(),
//   };

//   Store.todoItemsRef.push(todoItem);
//   console.log(Store.todoItemsRef);

//   localStorage.setItem("todoItemsRef", JSON.stringify(Store.todoItemsRef));

//   return todoItem;
// }

// function createListItemUI(itemID) {
//   const todoItem = document.createElement("li");
//   todoItem.setAttribute("draggable", "true");
//   todoItem.setAttribute("id", itemID);
//   todoItem.setAttribute("class", "todo__item todo__item--active");

//   listenForDrag(todoItem);
//   return todoItem;
// }
// function createTodoDescriptionUI(descp) {
//   const todoDescription = document.createElement("p");
//   todoDescription.innerText = descp;
//   todoDescription.setAttribute("class", "todo__descp");

//   todoDescription.addEventListener("click", (ev) => {
//     editTodo(ev.target);
//   });

//   todoDescription.addEventListener("dblclick", () => {
//     window.open("./item-page.html", "_self");
//   });

//   // for now due to the shady implementation completed tasks cannot be edited
//   return todoDescription;
// }

// function createCheckBtnUI(status = false) {
//   const checkForm = document.createElement("form");
//   checkForm.setAttribute("class", "check-form");

//   const checkBtn = document.createElement("input");

//   const checkBtnAttributes = {
//     type: "checkbox",
//     class: "check-btn",
//   };

//   setAttributes(checkBtn, checkBtnAttributes);

//   checkBtn.checked = status;
//   checkBtn.addEventListener("change", handleTodoCheckBtnChange);
//   checkForm.appendChild(checkBtn);

//   return checkForm;
// }

// function createDeleteTodoUI() {
//   const deleteTodoBtn = document.createElement("button");
//   deleteTodoBtn.innerText = `delete task`;

//   deleteTodoBtn.addEventListener("click", handleDeleteTodoBtnClick);

//   return deleteTodoBtn;
// }

// function renderTodo(todo) {
//   const todoListItemNode = createListItemUI(todo.id);
//   const todoDescription = createTodoDescriptionUI(todo.descp);
//   const todoCheckForm = createCheckBtnUI(todo.completionStatus);
//   const todoCheckBtn = todoCheckForm.children[0];
//   const deleteTodoBtn = createDeleteTodoUI();

//   todoListItemNode.appendChild(todoDescription);
//   todoListItemNode.appendChild(todoCheckForm);
//   todoListItemNode.appendChild(deleteTodoBtn);

//   document.getElementById("todo-list").appendChild(todoListItemNode);

//   if (todo.completionStatus === true) {
//     handleTodoCheckBtnChange.call(todoCheckBtn);
//   }

//   // not added in the createCheckBtnUI cause the checkForm wont have any parents at the time of creation
// }

// function handleTodoCheckBtnChange() {
//   const todoText = this.parentElement.parentElement.children[0];

//   const todoListItemNode = this.parentElement.parentElement;

//   if (this.checked) {
//     todoText.outerHTML = `<s class = "todo__descp todo__descp--completed">${todoText.innerHTML}</s>`;

//     todoListItemNode.classList.add("todo__item--completed");
//     todoListItemNode.classList.remove("todo__item--active");
//   }
//   if (!this.checked) {
//     todoText.replaceWith(createTodoDescriptionUI(todoText.innerHTML));

//     // todoText.outerHTML = `<p class = "todo__descp ">${todoText.innerHTML}</p>`;

//     todoListItemNode.classList.remove("todo__item--completed");
//     todoListItemNode.classList.add("todo__item--active");
//   }
//   Store.editItemsRef(this, "status");
// }

// function handleDeleteTodoBtnClick() {
//   // just in case someone decides to delete after setting the task up for editing
//   if (document.getElementById("todo-edit")) {
//     document.getElementById("todo-edit").remove();
//   }

//   const todoNode = this.parentElement;

//   Store.editItemsRef(todoNode, "delete");

//   todoNode.remove();
// }

function showOnlyActiveTasks() {
  const itemNodes = document.getElementsByClassName("todo__item");
  for (let i = 0; i < itemNodes.length; i++) {
    itemNodes[i].classList.remove("completely-hidden");
  }

  const completedItemNodes = document.getElementsByClassName(
    "todo__item--completed"
  );

  for (let i = 0; i < completedItemNodes.length; i++) {
    completedItemNodes[i].classList.add("completely-hidden");
  }
}

function showOnlyCompletedTasks() {
  const itemNodes = document.getElementsByClassName("todo__item");
  for (let i = 0; i < itemNodes.length; i++) {
    itemNodes[i].classList.remove("completely-hidden");
  }

  const activeItemNodes = document.getElementsByClassName("todo__item--active");

  for (let i = 0; i < activeItemNodes.length; i++) {
    activeItemNodes[i].classList.add("completely-hidden");
  }
}

function showAllTasks() {
  const itemNodes = document.getElementsByClassName("todo__item");
  for (let i = 0; i < itemNodes.length; i++) {
    itemNodes[i].classList.remove("completely-hidden");
  }
}

document.getElementById("show-active").addEventListener("click", () => {
  showOnlyActiveTasks();
  history.pushState("active", "", "active");
});
document.getElementById("show-completed").addEventListener("click", () => {
  showOnlyCompletedTasks();
  history.pushState("completed", "", "completed");
});
document.getElementById("show-all").addEventListener("click", () => {
  showAllTasks();
  history.pushState("all", "", "/");
});

// function editTodo(descpNode) {
//   console.log("edit todo function now running for:", descpNode);
//   let descpValue = descpNode.textContent;

//   document.getElementById("todo-input").value = descpValue;

//   document.getElementById("todo-input").focus();

//   if (document.getElementById("todo-edit")) {
//     document.getElementById("todo-edit").remove();
//   }

//   const editBtn = document.createElement("input");
//   setAttributes(editBtn, {
//     type: "button",
//     value: "edit",
//     class: "todo-form__edit",
//     id: "todo-edit",
//   });

//   document
//     .getElementById("todo-form")
//     .insertBefore(editBtn, document.getElementById("todo-submit"));

//   editBtn.addEventListener("click", (ev) => {
//     handleEditBtnClick(ev.target, descpNode);
//   });
// }

// function handleEditBtnClick(editBtn, editNode) {
//   console.log("i will update:", editNode);

//   const editedDescp = document.getElementById("todo-input").value;

//   if (editedDescp.length === 0) return;

//   //  update in the dom
//   editNode.textContent = editedDescp;

//   // UPDATE in the store
//   // const todoId = getItemId(editNode);
//   // const index = Store.todoItemsRef.findIndex((item) => item.id === todoId);
//   // Store.todoItemsRef[index].descp = editedDescp;

//   Store.editItemsRef(editNode, "descp", editedDescp);
//   console.log(Store.todoItemsRef);

//   // clear the input field
//   document.getElementById("todo-input").value = "";

//   // delete the edit button so a new one can  be created to target a new task
//   editBtn.remove();
// }

// function reRenderItemsOnload() {
//   Store.getItemsFromStore();

//   if (Store.todoItemsRef.length === 0) return;
//   Store.todoItemsRef.forEach((item) => {
//     renderTodo(item);
//   });
// }

// TODO: you should probably also clear the input field onload
window.addEventListener("load", reRenderItemsOnload);

window.addEventListener("popstate", (event) => {
  if (event.state) {
    if (event.state === "all") showAllTasks();
    if (event.state === "completed") showOnlyCompletedTasks();
    if (event.state === "active") showOnlyActiveTasks;
  }
});

history.replaceState("all", "", document.location.href);
