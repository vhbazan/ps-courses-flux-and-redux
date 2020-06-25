import { generate as id } from "shortid";
import { Dispatcher, ReduceStore } from "./flux";

const taskDispatcher = new Dispatcher();

const CREATE_TASK = "CREATE_TASK";
const COMPLETE_TASK = "COMPLETE_TASK";
const SHOW_TASKS = "SHOW_TASKS";

const createNewTaskAction = content => {
  return {
    type: CREATE_TASK,
    value: content
  };
};

const completeTaskAction = (id, isComplete) => {
  return {
    type: COMPLETE_TASK,
    id,
    value: isComplete
  };
};

const showTasksAction = showTasks => {
  return {
    type: SHOW_TASKS,
    value: showTasks
  };
};

class TaskStore extends ReduceStore {
  getInitialState() {
    return {
      tasks: [
        {
          id: id(),
          content: "Update CSS Styles",
          complete: false
        },
        {
          id: id(),
          content: "Add unit tests",
          complete: false
        },
        {
          id: id(),
          content: "Post to social Media",
          complete: false
        },
        {
          id: id(),
          content: "Install hard drive",
          complete: true
        }
      ],
      showComplete: true
    };
  }

  reduce(state, action) {
    console.log("reducing ...", state, action);
    return state;
  }

  getState() {
    return this.__state;
  }
}

const TaskComponent = ({ content, complete, id }) =>
  `<section>
    ${content} <input type="checkbox" name="taskCompletedCheck" data-taskid=${id}
     ${complete ? "checked" : ""}/>
   </section>
  `;

const render = () => {
  const taskSection = document.getElementById("tasks");
  const state = taskStore.getState();
  const rendered = state.tasks
    .filter(task => (state.showComplete ? true : !task.complete))
    .map(TaskComponent)
    .join("");

  taskSection.innerHTML = rendered;
};

const taskStore = new TaskStore(taskDispatcher);

taskDispatcher.dispatch("TEST_DISPATCH");

render();
