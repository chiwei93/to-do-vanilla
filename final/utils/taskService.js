class TaskService {
  static async getTasks() {
    try {
      const res = await fetch("http://localhost:3001/tasks");

      if (!res.ok) {
        throw new Error("Failed to fetch tasks");
      }
      
      const { tasks } = await res.json();
      return tasks;
    } catch (err) {
      throw err;
    }
  }

  static async addTask(title) {
    try {
      const res = await fetch("http://localhost:3001/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      if (!res.ok) {
        throw new Error("Failed to add task");
      }

      const { task } = await res.json();
      return task;
    } catch (err) {
      throw err;
    }
  }

  static async editTask(id, title) {
    try {
      const res = await fetch(`http://localhost:3001/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      if (!res.ok) {
        throw new Error("Failed to edit task");
      }

      const { task } = await res.json();
      return task;
    } catch (err) {
      throw err;
    }
  }

  static async toggleTaskStatus(id) {
    try {
      const res = await fetch(`http://localhost:3001/tasks/status/${id}`, {
        method: "PATCH",
      });

      if (!res.ok) {
        throw new Error("Failed to toggle task status");
      }

      const { task } = await res.json();
      return task;
    } catch (err) {
      throw err;
    }
  }

  static async deleteTask(id) {
    try {
      const res = await fetch(`http://localhost:3001/tasks/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete task");
      }

      const { message } = await res.json();
      return message;
    } catch (err) {
      throw err;
    }
  }
}

export default TaskService;
