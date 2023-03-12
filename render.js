import * as Store from "./store.js"; //needed for when items are rerendered from the store
import * as CRUD from "./crud.js";
import { listenForDrag } from "./drag.js";

function setAttributes(elem, attrs) {
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

function createListItemUI(itemID) {
  const todoItem = document.createElement("li");
  todoItem.setAttribute("draggable", "true");
  todoItem.setAttribute("id", itemID);
  todoItem.setAttribute("class", "todo__item todo__item--active");

  listenForDrag(todoItem);
  return todoItem;
}

function createTodoDescriptionUI(descp) {
  const todoDescription = document.createElement("p");
  todoDescription.textContent = descp;
  todoDescription.setAttribute("class", "todo__descp");

  todoDescription.addEventListener("click", (ev) => {
    CRUD.editTodo(ev.target);
  });

  todoDescription.addEventListener("dblclick", () => {
    window.open("./item-page.html", "_self");
  });

  // for now due to the shady implementation completed tasks cannot be edited
  return todoDescription;
}

function createCheckBtnUI(status = false) {
  const checkForm = document.createElement("form");
  checkForm.setAttribute("class", "check-form");

  const checkBtn = document.createElement("input");

  const checkBtnAttributes = {
    type: "checkbox",
    class: "check-btn",
  };

  setAttributes(checkBtn, checkBtnAttributes);

  checkBtn.checked = status;
  checkBtn.addEventListener("change", CRUD.handleTodoCheckBtnChange);
  checkForm.appendChild(checkBtn);

  return checkForm;
  //   note we are returning the check-form caus its the check-btns parent
}

function createDeleteTodoUI() {
  const deleteTodoBtn = document.createElement("button");
  deleteTodoBtn.innerHTML = `<img src='./images/icon-cross.svg' alt = 'delete todo'>`;

  deleteTodoBtn.classList.add("delete-todo-btn");

  deleteTodoBtn.addEventListener("click", CRUD.handleDeleteTodoBtnClick);

  return deleteTodoBtn;
}

function renderTodo(todo) {
  const todoListItemNode = createListItemUI(todo.id);
  const todoDescription = createTodoDescriptionUI(todo.descp);
  const todoCheckForm = createCheckBtnUI(todo.completionStatus);
  const todoCheckBtn = todoCheckForm.children[0];
  const deleteTodoBtn = createDeleteTodoUI();

  todoListItemNode.appendChild(todoDescription);
  todoListItemNode.appendChild(todoCheckForm);
  todoListItemNode.appendChild(deleteTodoBtn);

  document.getElementById("todo-list").appendChild(todoListItemNode);

  if (todo.completionStatus === true) {
    CRUD.handleTodoCheckBtnChange.call(todoCheckBtn);
    // not added in the createCheckBtnUI cause the checkForm wont have any parents at the time of creation
  }
}

function createEditBtnUI(editNode) {
  const editBtn = document.createElement("input");
  setAttributes(editBtn, {
    type: "button",
    value: "edit",
    class: "todo-form__edit",
    id: "todo-edit",
  });

  document
    .getElementById("todo-form-container")
    .insertBefore(editBtn, document.getElementById("todo-submit"));

  editBtn.addEventListener("click", (ev) => {
    CRUD.handleEditBtnClick(ev.target, editNode);
  });

  // return editBtn;
}

function reRenderItemsOnload() {
  Store.getItemsFromStore();

  if (Store.todoItemsRef.length === 0) return;
  Store.todoItemsRef.forEach((item) => {
    renderTodo(item);
  });
}

export {
  renderTodo,
  reRenderItemsOnload,
  createTodoDescriptionUI,
  createEditBtnUI,
};
