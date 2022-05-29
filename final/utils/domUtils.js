class DomUtils {
  static createDOMElementWithClassAndId(elementType, className, id = null) {
    const element = document.createElement(elementType);
    element.classList.add(className);
    if (id !== null) {
      element.setAttribute("id", id);
    }
    return element;
  }

  static createNameOrStatusElement(className, textContent) {
    const element = this.createDOMElementWithClassAndId("span", className);
    element.textContent = textContent;
    return element;
  }

  static createTaskBtn(className, id, dataId, textContent) {
    const element = this.createDOMElementWithClassAndId(
      "button",
      className,
      id
    );
    element.setAttribute("data-id", dataId);
    element.textContent = textContent;
    return element;
  }

  static createNewTask(task, tasksList) {
    const listItem = DomUtils.createDOMElementWithClassAndId("li", "item");
    const article = DomUtils.createDOMElementWithClassAndId("article", "card");
    article.setAttribute("data-id", task._id);
    const contentParagraph = DomUtils.createDOMElementWithClassAndId(
      "p",
      "content"
    );

    const nameElement = DomUtils.createNameOrStatusElement(
      "name",
      `Title: ${task.title}`
    );
    const statusElement = DomUtils.createNameOrStatusElement(
      "status",
      `Status: ${task.completed ? "Completed" : "In Progress"}`
    );
    contentParagraph.append(nameElement, statusElement);

    const btnContainer = DomUtils.createDOMElementWithClassAndId(
      "div",
      "btn-container"
    );
    const completeBtn = DomUtils.createTaskBtn(
      "btn",
      "btn-complete",
      task._id,
      `${task.completed ? "In Progress" : "Complete"}`
    );
    const deleteBtn = DomUtils.createTaskBtn(
      "btn",
      "btn-delete",
      task._id,
      "Delete"
    );
    const editBtn = DomUtils.createTaskBtn("btn", "btn-edit", task._id, "Edit");
    btnContainer.append(completeBtn, deleteBtn, editBtn);

    article.append(contentParagraph, btnContainer);
    listItem.append(article);
    tasksList.append(listItem);
  }
}

export default DomUtils;
