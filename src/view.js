function View() {
  this.createElement = function(tag, className) {
    var element = document.createElement(tag);
    if (className) {
      element.classList.add(className);
    }
    return element;
  };

  this.getElement = function(selector) {
    var element = document.querySelector(selector);
    return element;
  };

  this.app = this.getElement("#root");
  this.title = this.createElement("h1");
  this.title.textContent = "My Todo List";

  this.mainContainer = this.createElement("div", "main");
  this.actions = this.createElement("div", "actions");
  this.textField = this.createElement("input", "inputField");
  this.textField.maxlength = "40";
  this.textField.placeholder = "Enter your Todo....";

  this.dropdown = this.createElement("select", "storage");
  this.option1 = this.createElement("option");
  this.option1.textContent = "SessionStorage";
  this.option1.value = "SessionStroage";
  this.option2 = this.createElement("option");
  this.option2.textContent = "LocalStorage";
  this.option2.value = "LocalStroage";
  this.dropdown.appendChild(this.option1);
  this.dropdown.appendChild(this.option2);

  this.app.appendChild(this.title);
  this.mainContainer.appendChild(this.actions);
  this.actions.appendChild(this.dropdown);
  this.actions.appendChild(this.textField);
  this.app.appendChild(this.mainContainer);
}
