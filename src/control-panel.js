import { Dispatcher, Store } from "./flux";

const controlPanelDispatcher = new Dispatcher();

const UPDATE_NAME_INPUT_ACTION = "UPDATE_NAME_INPUT_ACTION";

const UPDATE_FONTSIZE_ACTION = "UPDATE_FONTSIZE_ACTION";

const updateUserNameAction = userName => {
  return {
    type: UPDATE_NAME_INPUT_ACTION,
    userName: userName
  };
};

const updateFontSizeAction = fontSize => {
  return {
    type: UPDATE_FONTSIZE_ACTION,
    fontSize: fontSize
  };
};

document
  .getElementById("userNameInput")
  .addEventListener("input", ({ target }) => {
    const name = target.value;
    console.log("Dispatching ...", name);
    controlPanelDispatcher.dispatch(updateUserNameAction(name));
  });

document.forms.fontSizeForm.fontSize.forEach(element => {
  element.addEventListener("change", ({ target }) => {
    console.log("Dispatching ...", target.value);
    controlPanelDispatcher.dispatch(updateFontSizeAction(target.value));
  });
});

class UserPrefStore extends Store {
  getInitialState() {
    console.log("initial state;", localStorage["preferences"]);
    return localStorage["preferences"]
      ? JSON.parse(localStorage["preferences"])
      : {
          userName: "JIM",
          fontSize: "small"
        };
  }

  __onDispatch(action) {
    console.log("Store received dispartch", action);
    switch (action.type) {
      case UPDATE_NAME_INPUT_ACTION:
        this.__state.userName = action.userName;
        this.__emitChange();
        break;
      case UPDATE_FONTSIZE_ACTION:
        this.__state.fontSize = action.fontSize;
        this.__emitChange();

        break;
      default:
        break;
    }

    this.__emitChange();
  }

  getUserPreferences() {
    console.log("getUserPref", this.__state);
    return this.__state;
  }
}

const userPrefStore = new UserPrefStore(controlPanelDispatcher);

userPrefStore.addListener(state => {
  console.info("current state is ... ", state);
  render(state);
  localStorage["preferences"] = JSON.stringify(state);
});

const render = ({ userName, fontSize }) => {
  console.log("user name in render:", userName);
  document.getElementById("userName").innerText = userName;
  document.getElementsByClassName("container")[0].style.fontSize =
    fontSize === "small" ? "16px" : "24px";
  document.forms.fontSizeForm.fontSize.value = fontSize;
};

render(userPrefStore.getUserPreferences());
