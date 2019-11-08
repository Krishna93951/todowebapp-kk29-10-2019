function View(rootElementRef, id) {
  var _this = this;

  this.rootElement = rootElementRef;

  this.init = function() {
    _this.emptyList();
  };

  this.getElement = function(selector) {
    var element = _this.rootElement.querySelector(selector);
    return element;
  };

  this.createContainer = function() {
    var mainContainer = this.createElements("div", { class: "main" });
    this.appendToMainContainer(mainContainer);
    return mainContainer;
  };

  this.appendToMainContainer = function(mainContainer) {
    mainContainer.append(this.createInputField());
    mainContainer.append(this.createList());
    mainContainer.append(this.createDeleteAllButton());
  };

  this.createTitle = function() {
    var app = this.rootElement;
    var title = this.createElements("h1");
    var titleText = this.customCreateTextNode("My Todo List");
    this.appendTitle(title, titleText);
    return app;
  };

  this.appendTitle = function(title, titleText) {
    title.append(titleText);
    this.rootElement.append(title);
    this.rootElement.append(this.createContainer());
  };

  this.createInputField = function() {
    var actions = this.createElements("div", { class: "actions" });
    var textField = this.createElements("input", {
      class: " inputField",
      maxlength: "40",
      placeholder: "Enter yout Todo ...."
    });
    this.appendInputField(actions, textField);
    return actions;
  };

  this.appendInputField = function(actions, textField) {
    actions.appendChild(textField);
    actions.append(this.createDropdown(), this.createAddButton());
  };

  this.createDropdown = function() {
    var dropdown = this.createElements("select", { class: "storage" });
    var option = {
      option1: this.createElements("option", { value: "SessionStorage" }),
      option2: this.createElements("option", { value: "LocalStorage" }),
      option1TextContent: this.customCreateTextNode("SessionStorage"),
      option2TextContent: this.customCreateTextNode("LocalStorage")
    };

    var event = new Event("onStorageChange");
    dropdown.addEventListener("change", _this.onDropDownChange);
    this.appendToDropdown(dropdown, option);
    return dropdown;
  };

  this.onDropDownChange = function(event) {
    dispatchEvent(event);
    console.log("AgilePoint");
    event.stoppropagation;
  };

  this.appendToDropdown = function(dropdown, option) {
    option.option1.append(option.option1TextContent);
    option.option2.append(option.option2TextContent);
    dropdown.appendChild(option.option1);
    dropdown.appendChild(option.option2);
  };

  this.createList = function() {
    var container = this.createElements("div");
    var list = this.createElements("ul", { class: "todoList" });
    this.appendListToContainer(container, list);
    return container;
  };

  this.appendListToContainer = function(container, list) {
    container.append(list);
  };

  this.createParagraphElement = function() {
    var taskCount = this.createElements("p", { class: "allTasks" });
    this.appendTaskCount(taskCount);
    return taskCount;
  };

  this.appendTaskCount = function(taskCount) {
    _this.createTitle().append(taskCount);
  };

  this.createListElements = function(id, input, status) {
    var li = this.createElements("li", { class: "listItem" });
    _this.createCheckbox(li, status);
    _this.createTask(li, input, id);
    _this.createDeleteButton(li);
    _this.appendToList(li);
  };

  this.appendToList = function(createdElements) {
    var list = this.getElement(".todoList");
    list.appendChild(createdElements);
  };

  this.appendAddButton = function(addButton, addButtonText) {
    addButton.append(addButtonText);
    var event = new Event("onAdd");
    addButton.addEventListener("click", _this.onAddButton);
    // controllerInstance.attachEventOnElementCreation(addButton, controllerInstance.addTaskOnClick);
  };

  this.onAddbutton = function(event) {
    dispatchEvent(event);
    event.stoppropagation();
  };

  this.totalMsg = function(checkedCount, pending) {
    var totalTodos = this.getElement(".allTasks");
    var countMessage = {
      all: "All Tasks: ",
      completed: " / Number of Completed Tasks: ",
      pending: " / Number of Pending Tasks: "
    };
    var taskData = controllerInstance.getData();
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
}

View.prototype = {
  createCheckbox: function(li, status) {
    var selectionBox = this.createElements("input", {
      id: "tick",
      type: "checkbox"
    });
    selectionBox.checked = status;
    // controllerInstance.attachCheckboxEvent(selectionBox);
    var event = new Event("check");
    selectionBox.dispatchEvent(event);
    li.appendChild(selectionBox);
  },

  createTask: function(li, inputField, id) {
    var spanElement = this.createElements("span", { id: id });
    var item = this.customCreateTextNode(inputField);
    spanElement.appendChild(item);
    li.appendChild(spanElement);
  },

  createDeleteButton: function(li) {
    var deleteButton = this.createElements("button", { id: "remove" });
    var deleteButtonText = this.customCreateTextNode("Del");
    deleteButton.appendChild(deleteButtonText);
    // controllerInstance.attachEventOnElementCreation(deleteButton, controllerInstance.deleteTaskFromList);
    li.appendChild(deleteButton);
  },

  createAddButton: function() {
    var addButton = this.createElements("button", { id: "addBtn" });
    var addButtonText = this.customCreateTextNode("Add");
    this.appendAddButton(addButton, addButtonText);
    return addButton;
  },

  emptyList: function() {
    var empty =
      "----------------------------List is Empty---------------------------";
    var list = this.createList();
    list.innerHTML = empty;
    this.emptyListMessage();
  },

  emptyListMessage: function() {
    var totalTodos = this.createParagraphElement();
    var countMessage = {
      all: "All Tasks: ",
      completed: " / Number of Completed Tasks: ",
      pending: " / Number of Pending Tasks: "
    };
    return (totalTodos.innerText =
      countMessage.all +
      "0" +
      " " +
      countMessage.completed +
      "0" +
      " " +
      countMessage.pending +
      "0");
  },

  createDeleteAllButton: function() {
    var deleteAll = this.createElements("button", { id: "delBtn" });
    var deleteText = this.customCreateTextNode("Delete Completed");
    deleteAll.appendChild(deleteText);
    // controllerInstance.attachEventOnElementCreation(deleteAll, controllerInstance.deleteCompleted);
    return deleteAll;
  },

  createElements: function(elemnt, attribute) {
    var element = document.createElement(elemnt, attribute);
    for (var i in attribute) {
      element.setAttribute(i, attribute[i]);
    }
    return element;
  },

  customCreateTextNode: function(ele) {
    return document.createTextNode(ele);
  }
};
