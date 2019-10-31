function init() {
  controllerInstance.selectStorageType();
  viewInstance().emptyList();
};

var controllerInstance = new App(prompt("Please Enter Storage Key"))

App.prototype.addTaskOnClick = function() {
  controllerInstance.addTasks();
};

App.prototype.addTaskOnKeyPress = function(e) {
  var this_ = this;
  if (e.keyCode === 13) {
    controllerInstance.addTasks();
  }
};

App.prototype.tasksCount = function() {
  var list = document.querySelector("#todoList");
  var taskData = this.getData();
  var checkbox = list.querySelectorAll('input[type="checkbox"]:checked');
  var pending;
  var checkedCount = 0;
  for (var i = 0; i < checkbox.length; i++) {
    checkboxCount = checkbox[i].checked ? checkedCount++ : checkedCount--;
  }
  pending = taskData.length - checkedCount;
  viewInstance().totalMsg(checkedCount, pending);
};

App.prototype.clearAndFocusTextField = function() {
  var todo = document.getElementById("inputField");
  todo.value = "";
  todo.focus();
};

function App(storageKey) {
  var this_ = this;

  this.createStorageInstance = function () {
    var selectedOption = document.getElementById("storage").value;
    var storage = {
      key : storageKey,
      LocalStorage: "LocalStorage",
      SessionStorage: "SessionStorage"
    };
    return new StorageManager(storage[selectedOption], storage.key);
  };
  
  this.storeData = function (taskData) {
    this_.createStorageInstance().setData(taskData);
  };
  
  this.getData = function () {
      return this_.createStorageInstance().getData();
  };

  this.attachEvents = function() {
    var addButton = document.getElementById("addBtn");
    var todo = document.getElementById("inputField");
    addButton.addEventListener("click", this_.addTaskOnClick);
    todo.addEventListener("keypress", this_.addTaskOnKeyPress);
  };

  this.selectStorageType = function() {
    var selectedOption = document.getElementById("storage");
    selectedOption.addEventListener("change",this_.onChoosingDataStorage);
  };
  
  this.onChoosingDataStorage = function() {
    this_.displayTasks();
    this_.clearAndFocusTextField();
    this_.tasksCount();
  };

  this.displayTasks = function() {
    var list = document.getElementById("todoList");
    list.innerHTML = "";
    var taskData = this_.getData();
    for (i = 0; i < taskData.length; i++) {
      viewInstance().createElements(taskData[i].id,taskData[i].name,taskData[i].status);
    }
    this_.attachEvents();
  };
  
  this.addTasks = function() {
    var notifyMessage = {
      inputField: "Enter Valid Input"
    };
    var todo = document.getElementById("inputField");
    var inputField = todo.value;
    if (inputField === "") {
      alert(notifyMessage.inputField);
    } else {
      var taskData = this_.getData();
      todos = { id: Date.now(), name: inputField, status: false };
      taskData.push(todos);
      this_.storeData(taskData);
      viewInstance().createElements(todos.id,inputField,todos.status);
      this_.clearAndFocusTextField();
      this_.tasksCount();
    }
  };

  this.deleteTaskFromList = function() {
    var itemId = this.previousSibling.id;
    this.parentNode.remove();
    this_.updateStorage(itemId);
    this_.tasksCount();
  };

  this.updateStorage = function(itemId) {
    var taskData = this_.getData();
    var deleteObject = taskData.findIndex(function(element) {
        return element.id === Number(itemId);
    });
    taskData.splice(deleteObject, 1);
    this_.storeData(taskData);
  };

  this.toggleStatus = function(e) {
    var taskData = this_.getData();
    var checkboxStatus = e.target.checked;
    var uniqueId = this.nextSibling.id;
    var selectedItem = taskData.findIndex(function(element) {
      return element.id === Number(uniqueId);
    });
    taskData[selectedItem].status = checkboxStatus;
    this_.storeData(taskData);
    this_.tasksCount();
  };

  this.attachCheckBoxEvent = function(selectionBox) {
    selectionBox.addEventListener("click", this_.toggleStatus);
  };

  this.attachDeleteButtonEvent = function(deleteButton) {
    deleteButton.addEventListener("click", this_.deleteTaskFromList);
  };
}

init();