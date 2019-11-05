function View(eleId) {
    var _this = this;

    this.createElement = function (tag, className) {
        var element = document.createElement(tag);
        if (className) {
            element.classList.add(className);
        }
        return element;
    };

    this.getElement = function (selector) {
        var element = document.querySelector(selector);
        return element;
    };

    this.createTitle = function () {
        var app = this.getElement(eleId);
        var title = this.createElement('h1');
        title.textContent = "My Todo List";
        this.appendTitle(app, title);
        return app;
    }

    this.appendTitle = function (app, title) {
        app.append(title);
        app.append(this.createContainer());
    }

    this.createContainer = function () {
        var mainContainer = this.createElement('div', 'main');
        this.appendToMainContainer(mainContainer);
        return mainContainer;
    }

    this.appendToMainContainer = function (mainContainer) {
        mainContainer.append(this.createInputField());
        mainContainer.append(this.createList());
        mainContainer.append(this.createDeleteAllButton())
    }

    this.createInputField = function () {
        var actions = this.createElement('div', 'actions');
        var textField = this.createElement('input', 'inputField');
        textField.maxlength = "40";
        textField.placeholder = "Enter your Todo....";
        this.appendInputField(actions, textField);
        return actions;
    }

    this.appendInputField = function (actions, textField) {
        actions.appendChild(textField);
        actions.append(this.createDropdown(), this.createAddButton());
    }

    this.createDropdown = function () {
        var dropdown = this.createElement('select', 'storage');
        var option1 = this.createElement('option');
        option1.textContent = "SessionStorage";
        option1.value = "SessionStorage";
        var option2 = this.createElement('option');
        option2.textContent = "LocalStorage";
        option2.value = "LocalStorage";
        this.appendToDropdown(dropdown, option1, option2)
        return dropdown;
    }

    this.appendToDropdown = function (dropdown, option1, option2) {
        dropdown.appendChild(option1);
        dropdown.appendChild(option2);
    }

    this.createList = function () {
        var container = this.createElement('div');
        var list = this.createElement('ul', 'todoList');
        this.appendListToContainer(container, list)
        return container;
    }

    this.appendListToContainer = function (container, list) {
        container.append(list);
    }

    this.createParagraphElement = function () {
        var taskCount = this.createElement('p', 'allTasks');
        this.appendTaskCount(taskCount);
        return taskCount;
    }

    this.appendTaskCount = function (taskCount) {
        this.createTitle().append(taskCount)
    }

    this.createElements = function (id, input, status) {
        var li = this.createElement('li', 'listItem');
        _this.createCheckbox(status);
        _this.createTask(li, input, id);
        _this.createDeleteButton(li);
        _this.appendToList(li);
    };

    this.appendToList = function (createdElements) {
        var list = this.getElement('.todoList')
        list.appendChild(createdElements);
    };

    this.appendAddButton = function (addButton, addButtonText) {
        addButton.append(addButtonText);
        controllerInstance.attachEventOnElementCreation(addButton, controllerInstance.addTaskOnClick);
    };

    this.totalMsg = function (checkedCount, pending) {
        var totalTodos = this.getElement('.allTasks');
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
    createCheckbox: function (li, status) {
        var selectionBox = this.createElement("input");
        selectionBox.type = "checkbox";
        selectionBox.setAttribute("id", "tick");
        selectionBox.checked = status;
        controllerInstance.attachCheckboxEvent(selectionBox);
        this.appendCheckbox(li, selectionBox);
    },

    appendCheckbox: function (li, selectionBox) {
        li.appendChild(selectionBox);
    },

    createTask: function (li, inputField, id) {
        var spanElement = this.createElement("span");
        spanElement.id = id;
        var item = document.createTextNode(inputField);
        spanElement.appendChild(item);
        li.appendChild(spanElement);
    },

    createDeleteButton: function (li) {
        var deleteButton = this.createElement("button");
        deleteButton.innerHTML = "Del";
        deleteButton.setAttribute("id", "remove");
        controllerInstance.attachEventOnElementCreation(deleteButton, controllerInstance.deleteTaskFromList);
        li.appendChild(deleteButton);
    },

    createAddButton: function () {
        var addButton = this.createElement("button");
        var addButtonText = document.createTextNode("Add");
        addButton.id = "addBtn";
        this.appendAddButton(addButton, addButtonText);
        return addButton;
    },

    emptyList: function () {
        var empty =
            "----------------------------List is Empty---------------------------";
        var list = this.createList();
        list.innerHTML = empty;
        this.emptyListMessage();
    },

    emptyListMessage: function () {
        var totalTodos = this.createParagraphElement();
        var countMessage = {
            all: "All Tasks: ",
            completed: " / Number of Completed Tasks: ",
            pending: " / Number of Pending Tasks: "
        };
        return (totalTodos.innerText = countMessage.all + "0" + " " + countMessage.completed + "0" + " " + countMessage.pending + "0");
    },

    createDeleteAllButton: function () {
        var deleteAll = this.createElement("button");
        var deleteText = document.createTextNode("Delete Completed");
        deleteAll.id = "delBtn";
        deleteAll.appendChild(deleteText);
        controllerInstance.attachEventOnElementCreation(deleteAll, controllerInstance.deleteCompleted);
        return deleteAll;
    }
}

var viewInstance = new View('#root');
// var viewInstance = new View('#root1');