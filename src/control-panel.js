import { Dispatcher } from "./flux";

const controlPanelDispatcher = new Dispatcher();

document
  .getElementById("userNameInput")
  .addEventListener("input", ({ target }) => {
    const name = target.value;
    console.log("Dispatching ...", name);
    controlPanelDispatcher.dispatch("TODO_NAMEINPUT_ACTION");
  });

controlPanelDispatcher.register(action => {
  console.info("action", action);
});
