import * as Store from "./store.js";
import { createTodoDescriptionUI, createEditBtnUI } from "./render.js";

function createTodo(descp) {
  const todoItem = {
    descp,
    completionStatus: false,
    id: Store.generateStorageId(),
  };

  Store.todoItemsRef.push(todoItem);
  console.log(Store.todoItemsRef);

  localStorage.setItem("todoItemsRef", JSON.stringify(Store.todoItemsRef));

  return todoItem;
}

function handleTodoCheckBtnChange() {
  const todoText = this.parentElement.parentElement.children[0];

  const todoListItemNode = this.parentElement.parentElement;

  if (this.checked) {
    todoText.outerHTML = `<s class = "todo__descp todo__descp--completed">${todoText.innerHTML}</s>`;

    todoListItemNode.classList.add("todo__item--completed");
    todoListItemNode.classList.remove("todo__item--active");
  }
  if (!this.checked) {
    todoText.replaceWith(createTodoDescriptionUI(todoText.innerHTML));

    // todoText.outerHTML = `<p class = "todo__descp ">${todoText.innerHTML}</p>`;

    todoListItemNode.classList.remove("todo__item--completed");
    todoListItemNode.classList.add("todo__item--active");
  }
  Store.editItemsRef(this, "status");
}

function editTodo(descpNode) {
  console.log("edit todo function now running for:", descpNode);
  let descpValue = descpNode.textContent;

  document.getElementById("todo-input").value = descpValue;

  document.getElementById("todo-input").focus();

  if (document.getElementById("todo-edit")) {
    document.getElementById("todo-edit").remove();
  }

  createEditBtnUI(descpNode);
  //   const editBtn = createEditBtnUI();
  //   document.createElement("input");
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
}

function handleEditBtnClick(editBtn, editNode) {
  console.log("i will update:", editNode);

  const editedDescp = document.getElementById("todo-input").value;

  if (editedDescp.length === 0) return;

  //  update in the dom
  editNode.textContent = editedDescp;

  // UPDATE in the store

  Store.editItemsRef(editNode, "descp", editedDescp);
  console.log(Store.todoItemsRef);

  // clear the input field
  document.getElementById("todo-input").value = "";

  // delete the edit button so a new one can  be created to target a new task
  editBtn.remove();
}

function handleDeleteTodoBtnClick() {
  // just in case someone decides to delete after setting the task up for editing
  if (document.getElementById("todo-edit")) {
    document.getElementById("todo-edit").remove();
  }

  //   TODO: you should probably also probably clear the form input field in this scenario -- maybe

  const todoNode = this.parentElement;

  Store.editItemsRef(todoNode, "delete");

  todoNode.remove();
}

export {
  createTodo,
  handleDeleteTodoBtnClick,
  editTodo,
  handleEditBtnClick,
  handleTodoCheckBtnChange,
};

//   FIND A WAY TO SHIFT ALL UI/COMPONENT CODE TO RENDER TO MOVE EDIT BTN UI CODE TO RENDER FIGURE OUT WHAT DESCPNODE IS
