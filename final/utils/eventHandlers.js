import DomUtils from "./domUtils";
import TaskService from "./taskService";

let tasksArray = [];
let editMode = false;
let editedTask = null;

function removeErrorClass(element) {
  element.classList.remove("has-error");
}

function formHasError(inputContainer, errorElement) {
  removeErrorClass(inputContainer);
  inputContainer.classList.add("has-error");
  errorElement.textContent = "Title is required";
}

export async function getTasks() {
  try {
    const tasks = await TaskService.getTasks();
    tasksArray = [...tasks];
    const tasksList = document.getElementById('tasks');
    tasksArray.forEach((task) => {
      DomUtils.createNewTask(task, tasksList);
    });
  } catch (err) {
    console.log("get tasks");
    console.log(err);
  }
}

export async function onFormSubmit(event) {
  try {
    event.preventDefault();
    const formElement = event.target;
    const tasksList = document.getElementById('tasks');
    const titleInputElement = formElement.querySelector("#title");
    const inputContainerElement = formElement.querySelector("#input-container");
    const errorElement = formElement.querySelector("#error");

    const taskTitle = titleInputElement.value;

    if (taskTitle.trim().length <= 0) {
      formHasError(inputContainerElement, errorElement);
      return;
    }

    removeErrorClass(inputContainerElement);

    if (editMode) {
      const taskData = await TaskService.editTask(editedTask._id, taskTitle);

      const chosenTaskIndex = tasksArray.findIndex(
        (task) => task._id === taskData._id
      );
      const chosenEditedTask = tasksArray[chosenTaskIndex];
      chosenEditedTask.title = taskData.title;

      tasksList
        .querySelector(`article[data-id="${taskData._id}"]`)
        .querySelector(".name").textContent = `Title: ${taskData.title}`;
      editMode = false;
      editedTask = null;
      document.getElementById("btn-submit").textContent = "Create Task";
    } else {
      const task = await TaskService.addTask(taskTitle);
      tasksArray.push({ ...task });
      DomUtils.createNewTask(task, tasksList);
    }

    formElement.reset();
  } catch (err) {
    console.log(err);
  }
}

export async function onCompleteBtnClick(event) {
  try {
    const completeBtn = event.target.closest("#btn-complete");
    if (!completeBtn) return;

    const taskId = completeBtn.dataset.id;
    const taskData = await TaskService.toggleTaskStatus(taskId);

    const chosenTaskIndex = tasksArray.findIndex((task) => task._id === taskId);
    const chosenTask = tasksArray[chosenTaskIndex];
    chosenTask.completed = taskData.completed;

    completeBtn
      .closest(".card")
      .querySelector(".status").textContent = `Status: ${
      chosenTask.completed ? "Completed" : "In Progress"
    }`;

    if (taskData.completed) {
      completeBtn.textContent = "In Progress";
    } else {
      completeBtn.textContent = "Complete";
    }
  } catch (err) {
    console.log(err);
  }
}

export async function onDeleteBtnClick(event) {
  try {
    const deleteBtn = event.target.closest("#btn-delete");
    if (!deleteBtn) return;

    const taskId = deleteBtn.dataset.id;
    const message = await TaskService.deleteTask(taskId);

    if (message === "Task deleted successfully") {
      tasksArray = tasksArray.filter((task) => task._id !== taskId);
      const listItem = deleteBtn.closest(".item");
      listItem.parentElement.removeChild(listItem);
    }
  } catch (err) {
    console.log(err);
  }
}

export async function onEditBtnClick(event) {
  const editBtn = event.target.closest("#btn-edit");
  if (!editBtn) return;

  const taskId = editBtn.dataset.id;
  const chosenEditedTask = tasksArray.find((task) => task._id === taskId);
  editMode = true;
  editedTask = chosenEditedTask;

  if (chosenEditedTask) {
    document.getElementById("title").value = chosenEditedTask.title;
    document.getElementById("btn-submit").textContent = "Edit Task";
  } else {
    console.log("task not found");
  }
}
