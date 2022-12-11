let numTodoCreated = 0;
let todoItemsRef = [];
let completedTodoItems = [];
const activeTodoItems = [];

function getItemsFromStore() {
  numTodoCreated = JSON.parse(localStorage.getItem("numTodoCreated"));
  // turns out that " null + 1 = 1" in both strict and non-strict

  todoItemsRef = JSON.parse(localStorage.getItem("todoItemsRef"));

  if (todoItemsRef === null) {
    todoItemsRef = [];
    return;
  }
}

function generateStorageId() {
  const todoId = `#${++numTodoCreated}`;
  localStorage.setItem("numTodoCreated", JSON.stringify(numTodoCreated));
  return todoId;
}

function getNodeRefId(panda) {
  if (panda.nodeName === "LI") return panda.id;
  if (panda.parentElement.nodeName === "LI") return panda.parentElement.id;

  if (panda.parentElement.parentElement.nodeName === "LI")
    return panda.parentElement.parentElement.id;
}
function editItemsRef(node, propType) {
  const itemId = getNodeRefId(node);

  const refIndex = todoItemsRef.findIndex((item) => item.id === itemId);

  if (propType === "status") {
    // todoItemsRef[refIndex].completionStatus =
    //   !todoItemsRef[refIndex].completionStatus;

    todoItemsRef[refIndex].completionStatus = node.checked;
  }

  if (propType === "descp") {
    todoItemsRef[refIndex].descp = node.textContent;
  }

  if (propType === "delete") {
    if (refIndex > -1) todoItemsRef.splice(refIndex, 1);
  }

  console.log(todoItemsRef);

  localStorage.setItem("todoItemsRef", JSON.stringify(todoItemsRef));
}
function swapPositionInItemRef(node1, node2) {
  const node1RefId = getNodeRefId(node1);
  const node1Index = todoItemsRef.findIndex((item) => item.id === node1RefId);

  const node2RefId = getNodeRefId(node2);
  const node2Index = todoItemsRef.findIndex((item) => item.id === node2RefId);

  [todoItemsRef[node1Index], todoItemsRef[node2Index]] = [
    todoItemsRef[node2Index],
    todoItemsRef[node1Index],
  ];
  console.log(todoItemsRef);

  localStorage.setItem("todoItemsRef", JSON.stringify(todoItemsRef));
}

export {
  todoItemsRef,
  getItemsFromStore,
  generateStorageId,
  editItemsRef,
  swapPositionInItemRef,
};
