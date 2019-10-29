function viewInstance() {
  return new View();
}

function View() {
  var _this = this;

  this.createElements = function(input) {
    var li = document.createElement("li");
    _this.tickbox(li);
    _this.task(li, input);
    _this.deleteButton(li);
    _this.appendToList(li);
  };

  this.appendToList = function(createdElements) {
    var list = document.getElementById("todoList");
    list.appendChild(createdElements);
  };

  this.tickbox = function(li) {
    var selectionBox = document.createElement("input");
    selectionBox.type = "checkbox";
    selectionBox.setAttribute("id", "check");
    controllerInstance().attachCheckBoxEvent(selectionBox);
    li.appendChild(selectionBox);
  };

  this.task = function(li, inputField) {
    var spanElement = document.createElement("span");
    var item = document.createTextNode(inputField);
    spanElement.appendChild(item);
    li.appendChild(spanElement);
  };

  this.deleteButton = function(li) {
    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Del";
    deleteButton.setAttribute("class", "remove");
    controllerInstance().attachDeleteButtonEvent(deleteButton);
    li.appendChild(deleteButton);
  };

  this.totalMsg = function(checkedCount, pending) {
    var totalTodos = document.getElementById("allTask");
    var countMessage = {
      all: "All Tasks: ",
      completed: " / Number of Completed Tasks: ",
      pending: " / Number of Pending Tasks: "
    };
    var taskData = getData();
    return (totalTodos.innerHTML =
      countMessage.all +
      taskData.length +
      " " +
      countMessage.completed +
      checkedCount +
      " " +
      countMessage.pending +
      pending);
  };

  this.emptyListMsg = function() {
    var totalTodos = document.getElementById("allTask");
    var countMessage = {
      all: "All Tasks: ",
      completed: " / Number of Completed Tasks: ",
      pending: " / Number of Pending Tasks: "
    };
    return (totalTodos.innerHTML =
      countMessage.all +
      "0" +
      " " +
      countMessage.completed +
      "0" +
      " " +
      countMessage.pending +
      "0");
  };

  this.emptyList = function() {
    var empty =
      "----------------------------List is Empty---------------------------";
    var list = document.getElementById("todoList");
    list.innerHTML = empty;
    _this.emptyListMsg();
  };
}
