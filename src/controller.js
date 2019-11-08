function App(storageKey) {
  var this_ = this;
  this.key = storageKey;

  this.init = function() {
    // viewInstance.emptyList();
    // viewInstance2.emptyList();
    this_.selectStorageType();
    this_.createStorageInstance();
    // this_.attachCheckboxEvent();
  };

  this.createStorageInstance = function() {
    var selectedOption = viewInstance.createDropdown().value;
    var storage = {
      key: this.key,
      LocalStorage: "LocalStorage",
      SessionStorage: "SessionStorage"
    };
    return new StorageManager(storage[selectedOption], storage.key);
  };

  this.storeData = function(taskData) {
    this_.createStorageInstance().setData(taskData);
  };

  this.getData = function() {
    return this_.createStorageInstance().getData();
  };

  this.attachEvents = function() {
    viewInstance
      .getElement(".inputField")
      .addEventListener("keypress", this_.addTaskOnKeyPress);
    document
      .getElementsByTagName("input")[1]
      .addEventListener("keypress", this_.addTaskOnKeyPress);
  };

  this.onSelectionOfStorageType = function() {
    this_.displayTasks();
    this_.clearAndFocusTextField();
    this_.tasksCount();
  };

  this.displayTasks = function() {
    var list = document.getElementsByTagName("ul")[0];
    list.innerHTML = "";
    var taskData = this_.getData();
    for (i = 0; i < taskData.length; i++) {
      viewInstance.createListElements(
        taskData[i].id,
        taskData[i].name,
        taskData[i].status
      );
    }
    this_.attachEvents();
  };

  this.addTasks = function() {
    var notifyMessage = {
      inputField: "Enter Valid Input"
    };
    var todo = viewInstance.getElement(".inputField");
    var inputField = todo.value;
    if (inputField === "") {
      alert(notifyMessage.inputField);
    } else {
      var taskData = this_.getData();
      todos = { id: Date.now(), name: inputField, status: false };
      taskData.push(todos);
      this_.storeData(taskData);
      viewInstance.createListElements(todos.id, inputField, todos.status);
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

  this.attachCheckboxEvent = function(selectionBox) {
    var event = new Event("check");
    event.addEventListener("check", this_.toggleStatus);
  };

  // this.attachEventOnElementCreation = function (element, callback) {
  //   element.addEventListener("click", callback);
  // }

  this.deleteCompleted = function() {
    var taskData = this_.getData();
    for (var i = taskData.length - 1; i >= 0; i--) {
      if (taskData[i].status === true) {
        taskData.splice(i, 1);
      }
    }
    this_.storeData(taskData);
    this_.displayTasks();
    this_.tasksCount();
  };

  this.selectStorageType = function(ele) {
    ele.addEventListener("onStorageChange", function() {
      console.log("KK");
    });
  };

  this.addBtnEvent = function(e) {
    e.addEventListener("onAdd", function() {
      console.log("IS");
    });
  };
}

App.prototype = {
  addTaskOnClick: function() {
    controllerInstance.addTasks();
  },

  addTaskOnKeyPress: function(e) {
    if (e.keyCode === 13) {
      controllerInstance.addTasks();
    }
  },

  tasksCount: function() {
    var list = viewInstance.getElement(".todoList");
    var taskData = this.getData();
    var checkbox = list.querySelectorAll('input[type="checkbox"]:checked');
    var pending;
    var checkedCount = 0;
    for (var i = 0; i < checkbox.length; i++) {
      checkboxCount = checkbox[i].checked ? checkedCount++ : checkedCount--;
    }
    pending = taskData.length - checkedCount;
    viewInstance.totalMsg(checkedCount, pending);
  },

  clearAndFocusTextField: function() {
    var todo = viewInstance.getElement(".inputField");
    // console.log(document.getElementsByClassName('.inputField')[1].focus());
    // document.getElementsByClassName('.inputField')[1].value = "";
    todo.value = "";
    todo.focus();
  }
};
