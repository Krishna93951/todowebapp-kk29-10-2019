function init() {
  controllerInstance().selectStorageType();
  viewInstance().emptyList();
  viewInstance().emptyListMsg();
}

function createStorageInstance() {
  var selectedOption = document.getElementById("storage").value;
  var key = "taskListKK";
  var storage = {
    LocalStorage: "LocalStorage",
    SessionStorage: "SessionStorage"
  };
  return new StorageManager(storage[selectedOption], key);
}

function storeData(taskData) {
  createStorageInstance().setData(taskData);
}

function getData() {
    return createStorageInstance().getData();
}

function controllerInstance() {
  return new App();
}

function App() {
  var this_ = this;

  this.selectStorageType = function() {
    var selectedOption = document.getElementById("storage");
    selectedOption.addEventListener(
      "change",
      this_.actionsAfterChoosingDataStorage
    );
  };

  this.actionsAfterChoosingDataStorage = function() {
    this_.displayTasks();
    this_.clearAndFocusTextField();
    this_.tasksCount();
  };
  this.attachEvents = function() {
    var addButton = document.getElementById("addBtn");
    var todo = document.getElementById("inputField");
    addButton.addEventListener("click", this_.addTaskToList);
    todo.addEventListener("keypress", this_.addTaskToListByEnterKey);
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
      var taskData = getData();
      todos = { id: Date.now(), name: inputField, status: false };
      taskData.push(todos);
      storeData(taskData);
      viewInstance().createElements(inputField);
      this_.clearAndFocusTextField();
      this_.tasksCount();
    }
  };

  this.displayTasks = function() {
    var list = document.getElementById("todoList");
    list.innerHTML = "";
    var taskData = getData();
    for (i = 0; i < taskData.length; i++) {
      viewInstance().createElements(taskData[i].name);
    }
    this_.attachEvents();
  };

  this.addTaskToList = function() {
    this_.addTasks();
  };

  this.addTaskToListByEnterKey = function() {
    var enterKey = 13;
    if (event.keyCode === enterKey) {
      this_.addTasks();
    }
  };

  this.deleteTaskFromList = function() {
    var deletingItem = this.previousElementSibling.textContent;
    this.parentNode.remove();
    this_.removeTaskFromArray(deletingItem);
    this_.clearAndFocusTextField();
    this_.tasksCount();
  };

  this.removeTaskFromArray = function(deletingItem) {
    var taskData = getData();
    var deleteObject = taskData.find(function(element) {
      return element.name === deletingItem;
    });
    var itemIndex = taskData.indexOf(deleteObject);
    taskData.splice(itemIndex, 1);
    storeData(taskData);
  };

  this.toggleStatus = function(e, item) {
    var taskData = getData();
    var checkStatus = e.target.checked;
    item = this.nextSibling.textContent;
    var selectedItem = taskData.find(function(element) {
      return element.name === item;
    });
    var itemIndex = taskData.indexOf(selectedItem);
    taskData[itemIndex].status = checkStatus;
    storeData(taskData);
    this_.tasksCount();
  };

  this.tasksCount = function() {
    var taskData = getData();
    var checkbox = document.querySelectorAll('input[type="checkbox"]:checked');
    var pending;
    var checkedCount = 0;
    for (var i = 0; i < checkbox.length; i++) {
      checkboxCount = checkbox[i].checked ? checkedCount++ : checkedCount--;
    }
    pending = taskData.length - checkedCount;
    viewInstance().totalMsg(checkedCount, pending);
  };

  this.clearAndFocusTextField = function() {
    var todo = document.getElementById("inputField");
    todo.value = "";
    todo.focus();
  };

  this.attachCheckBoxEvent = function(selectionBox, span1) {
    selectionBox.addEventListener("click", this_.toggleStatus);
  };

  this.attachDeleteButtonEvent = function(deleteButton) {
    deleteButton.addEventListener("click", this_.deleteTaskFromList);
  };
}
init();
