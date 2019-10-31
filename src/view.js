function viewInstance() {
  return new View();
}

function View() {
  var _this = this;

  this.createElements = function (id, input, status) {
    var li = document.createElement("li");
    _this.tickbox(li, status);
    _this.task(li, input, id);
    _this.deleteButton(li);
    _this.appendToList(li);
  };

  this.appendToList = function (createdElements) {
    var list = document.getElementById("todoList");
    list.appendChild(createdElements);
  };

  View.prototype = new ListItems();

  function ListItems() {

    this.tickbox = function (li, status) {
      var selectionBox = document.createElement("input");
      selectionBox.type = "checkbox";
      selectionBox.setAttribute("id", "tick");
      selectionBox.checked = status;
      controllerInstance.attachCheckBoxEvent(selectionBox);
      li.appendChild(selectionBox);
    };

    this.task = function (li, inputField, id) {
      var spanElement = document.createElement("span");
      spanElement.id = id;
      var item = document.createTextNode(inputField);
      spanElement.appendChild(item);
      li.appendChild(spanElement);
    };

    this.deleteButton = function (li) {
      var deleteButton = document.createElement("button");
      deleteButton.innerHTML = "Del";
      deleteButton.setAttribute("id", "remove");
      controllerInstance.attachDeleteButtonEvent(deleteButton);
      li.appendChild(deleteButton);
    };
  }
  
  this.totalMsg = function (checkedCount, pending) {
    var totalTodos = document.getElementById("allTask");
    var countMessage = {
      all: "All Tasks: ",
      completed: " / Number of Completed Tasks: ",
      pending: " / Number of Pending Tasks: "
    };
    var taskData = controllerInstance.getData();
    return (totalTodos.innerHTML = countMessage.all + taskData.length + " " + countMessage.completed + checkedCount + " " + countMessage.pending + pending);
  };
}

View.prototype.emptyListMsg = function () {
  var totalTodos = document.getElementById("allTask");
  var countMessage = {
    all: "All Tasks: ",
    completed: " / Number of Completed Tasks: ",
    pending: " / Number of Pending Tasks: "
  };
  return (totalTodos.innerHTML = countMessage.all + "0" +" " + countMessage.completed + "0" + " " + countMessage.pending + "0");
};

View.prototype.emptyList = function () {
  var empty =
    "----------------------------List is Empty---------------------------";
  var list = document.getElementById("todoList");
  list.innerHTML = empty;
  this.emptyListMsg();
};