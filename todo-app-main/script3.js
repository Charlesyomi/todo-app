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

class Todo {
  descp;
  completionStatus = false;

  constructor(descp, completionStatus) {
    this.descp = descp;
    this.completionStatus = completionStatus;
  }

  static todoList = document.getElementById("todo-list");

  createTodoListItemUI() {
    const todoItem = document.createElement("li");
    todoItem.setAttribute("draggable", "true");
  }

  createTodoDescriptionUI() {
    const todoDescription = document.createElement("p");
    todoDescription.innerText = todoDescriptionValue;
    todoDescription.setAttribute("class", "todo__descp");
  }

  createTodoCheckBtnUI() {
    const checkForm = document.createElement("form");
    checkForm.setAttribute("class", "check-form");

    const checkBtn = document.createElement("input");

    const checkBtnAttributes = {
      type: "checkbox",
      class: "check-btn",
    };

    setAttributes(checkBtn, checkBtnAttributes);
  }

  createTodoDeleteBtnUI() {
    const deleteTodoBtn = document.createElement("button");
    deleteTodoBtn.innerText = "delete task";
  }

  todoListItemUI = createTodoListItemUI();
  todoDescriptionUI = createTodoDescriptionUI();
  todoCheckBtnUI = createTodoCheckBtnUI();
}
