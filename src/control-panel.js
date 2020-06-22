import { Dispatcher } from "./flux";

const controlPanelDispatcher = new Dispatcher();

document
  .getElementById("userNameInput")
  .addEventListener("input", ({ target }) => {
    const name = target.value;
    console.log("Dispatching ...", name);
    controlPanelDispatcher.dispatch("TODO_NAMEINPUT_ACTION");
  });

document.forms.fontSizeForm.fontSize.forEach(element => {
  element.addEventListener("change", ({ target }) => {
    console.log("Dispatching ...", target.value);
    controlPanelDispatcher.dispatch("CHANGE_FONT_SIZE_ACTION");
  });
});

controlPanelDispatcher.register(action => {
  console.info("action", action);
});
