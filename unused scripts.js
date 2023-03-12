// function toggleTaskCompletion() {
//   console.log("toggle button works");
//   const itemToggled = this.parentElement.parentElement.children[0];
// const itemToggledDescp = itemToggled.innerHTML;
// if (itemToggled.nodeName === "P") {
//   itemToggled.outerHTML = `<del class = "task__descp task__descp--complete">${itemToggled.innerHTML}</del>`;
// }
// if (itemToggled.nodeName === "DEL") {
//   itemToggled.outerHTML = `<p class = "task__descp task__descp--incomplete">${itemToggled.innerHTML}</p>`;
// }
// }

// function storeInLocalStore() {
//   const todoDescriptions = document.getElementsByClassName("todo__descp");
//   const todoStatus = null;

//   for (let i = 0; i < todoDescriptions.length; i++) {
//     localStorageStore.push({
//       descp: todoDescriptions[i].innerHTML,
//       status: todoStatus,
//     });
//   }

//   console.log(localStorageStore);
//   return localStorageStore;
// }

// Alternative approach : edit todo function

function editTodo(descpNode) {
  console.log("edit todo function now running for:", descpNode);
  let descpValue = descpNode.textContent;

  document.getElementById("todo-input").value = descpValue;

  document.getElementById("todo-input").focus();

  const editBtn = document.getElementById("todo-edit");
  editBtn.style.display = "inline-block";

  const doHandleEditBtnClick = (ev) => {
    handleEditBtnClick(ev, descpNode);
    ev.target.removeEventListener("click", doHandleEditBtnClick);
  };

  editBtn.addEventListener("click", doHandleEditBtnClick);
}

function handleEditBtnClick(event, editNode) {
  console.log("i will update:", editNode);

  const editedDescp = document.getElementById("todo-input").value;

  if (editedDescp.length === 0) return;

  //  update in the dom
  editNode.textContent = editedDescp;

  // update in the store
  const todoId = getItemId(editNode);
  const index = todoItems.findIndex((item) => item.id === todoId);

  todoItems[index].descp = editedDescp;
  console.log(todoItems);

  // clear the input field
  document.getElementById("todo-input").value = "";

  // hide the edit btn again
  event.target.style.display = "none";
}

// document.getElementById("todo-input").addEventListener("change", (e) => {
//   console.log(todoDescp);
//   todoDescp = e.target.value;
// });

// updateTaskCompletionStatus(getItemId(todoListItemNode));

function getItemId(panda) {
  if (panda.nodeName === "LI") return panda.id;
  if (panda.parentElement.nodeName === "LI") return panda.parentElement.id;

  if (panda.parentElement.parentElement.nodeName === "LI")
    return panda.parentElement.parentElement.id;
}

function updateTaskCompletionStatus(taskId) {
  const index = todoItems.findIndex((item) => item.id === taskId);

  todoItems[index].completionStatus = !todoItems[index].completionStatus;

  console.log(todoItems);
}
function getNumTodoCreatedOnload() {
  numTodoCreated = JSON.parse(localStorage.getItem("numTodoCreated"));
  // turns out that " null + 1 = 1" in both strict and non-strict
}

function reRenderItemsOnload() {
  numTodoCreated = JSON.parse(localStorage.getItem("numTodoCreated"));
  // turns out that " null + 1 = 1" in both strict and non-strict

  todoItemsRef = JSON.parse(localStorage.getItem("todoItemsRef"));

  if (todoItemsRef === null) {
    todoItemsRef = [];
    return;
  }

  if (todoItemsRef.length === 0) return;

  todoItemsRef.forEach((item) => {
    renderTodo(item);
  });
}

function getNodeRefNo(panda) {
  if (panda.nodeName === "LI") return panda.id;
  if (panda.parentElement.nodeName === "LI") return panda.parentElement.id;

  if (panda.parentElement.parentElement.nodeName === "LI")
    return panda.parentElement.parentElement.id;
}

function editItemsRef(node, propType) {
  const itemId = getNodeRefNo(node);

  const refIndex = Store.todoItemsRef.findIndex((item) => item.id === itemId);

  if (propType === "status") {
    // Store.todoItemsRef[refIndex].completionStatus =
    //   !Store.todoItemsRef[refIndex].completionStatus;

    Store.todoItemsRef[refIndex].completionStatus = node.checked;
  }

  if (propType === "descp") {
    Store.todoItemsRef[refIndex].descp = node.textContent;
  }

  if (propType === "delete") {
    if (refIndex > -1) Store.todoItemsRef.splice(refIndex, 1);
  }

  console.log(Store.todoItemsRef);

  localStorage.setItem(
    "Store.todoItemsRef",
    JSON.stringify(Store.todoItemsRef)
  );
}
// const itemId = todoNode.id;
// const itemIndex = Store.todoItemsRef.findIndex((item) => item.id === itemId);
// if (itemIndex > -1) Store.todoItemsRef.splice(itemIndex, 1);
// console.log(Store.todoItemsRef);
