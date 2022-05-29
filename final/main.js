import {
  onCompleteBtnClick,
  onFormSubmit,
  getTasks,
  onDeleteBtnClick,
  onEditBtnClick,
} from "./utils/eventHandlers";

const tasksList = document.getElementById("tasks");
const form = document.getElementById("form");

function init() {
  // set up event listeners
  form.addEventListener("submit", onFormSubmit);
  tasksList.addEventListener("click", onCompleteBtnClick);
  tasksList.addEventListener("click", onDeleteBtnClick);
  tasksList.addEventListener("click", onEditBtnClick);

  getTasks();
}

init();
