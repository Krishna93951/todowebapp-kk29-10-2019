function viewInstance() {
  return new View();
}

function View() {
  var _this = this;

  this.createElements = function (id, input, status) {
    var li = document.createElement("li");
    _this.createCheckbox(li, status);
    _this.createTask(li, input, id);
    _this.createDeleteButton(li);
    _this.appendToList(li);
  };

  this.appendToList = function (createdElements) {
    var list = document.getElementById("todoList");
    list.appendChild(createdElements);
  };

  this.appendAddButton = function (addButton, addButtonText) {
    addButton.appendChild(addButtonText);
    document.getElementById("container").appendChild(addButton);
    controllerInstance.attachEventOnElementCreation(addButton, controllerInstance.addTaskOnClick);
  };

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

View.prototype = {
  createCheckbox : function (li, status) {
    var selectionBox = document.createElement("input");
    selectionBox.type = "checkbox";
    selectionBox.setAttribute("id", "tick");
    selectionBox.checked = status;
    controllerInstance.attachCheckboxEvent(selectionBox);
    li.appendChild(selectionBox);
  },

  createTask : function(li, inputField, id) {
    var spanElement = document.createElement("span");
    spanElement.id = id;
    var item = document.createTextNode(inputField);
    spanElement.appendChild(item);
    li.appendChild(spanElement);
  },

  createDeleteButton : function  (li) {
    var deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Del";
    deleteButton.setAttribute("id", "remove");
    controllerInstance.attachEventOnElementCreation(deleteButton, controllerInstance.deleteTaskFromList);
    li.appendChild(deleteButton);
  },

  createAddButton : function () {
    var addButton = document.createElement("button");
    var addButtonText = document.createTextNode("Add");
    addButton.id = "addBtn";
    this.appendAddButton(addButton, addButtonText);
  },

  emptyList : function () {
    var empty =
      "----------------------------List is Empty---------------------------";
    var list = document.getElementById("todoList");
    list.innerHTML = empty;
    this.emptyListMessage();
  },

  emptyListMessage : function () {
    var totalTodos = document.getElementById("allTask");
    var countMessage = {
      all: "All Tasks: ",
      completed: " / Number of Completed Tasks: ",
      pending: " / Number of Pending Tasks: "
    };
    return (totalTodos.innerHTML = countMessage.all + "0" + " " + countMessage.completed + "0" + " " + countMessage.pending + "0");
  }
}





