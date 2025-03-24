document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("taskForm");
    const taskName = document.getElementById("taskName");
    const taskDescription = document.getElementById("taskDescription");
    const taskList = document.getElementById("taskList");
    const showAll = document.getElementById("showAll");
    const showPending = document.getElementById("showPending");
    const showCompleted = document.getElementById("showCompleted");
  
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
    // Render tasks
    const renderTasks = (filter = "all") => {
      taskList.innerHTML = "";
      tasks.forEach((task, index) => {
        if (filter === "completed" && !task.completed) return;
        if (filter === "pending" && task.completed) return;
  
        const li = document.createElement("li");
        li.className = task.completed ? "completed" : "";
        li.innerHTML = `
          <div>
            <strong>${task.name}</strong>
            <p>${task.description}</p>
          </div>
          <div>
            <button onclick="toggleCompletion(${index})">${task.completed ? "Undo" : "Complete"}</button>
            <button onclick="editTask(${index})">Edit</button>
            <button onclick="deleteTask(${index})">Delete</button>
          </div>
        `;
        taskList.appendChild(li);
      });
    };
  
    // Add task
    taskForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!taskName.value.trim()) {
        alert("Task name cannot be empty!");
        return;
      }
  
      tasks.push({
        name: taskName.value,
        description: taskDescription.value,
        completed: false,
      });
  
      localStorage.setItem("tasks", JSON.stringify(tasks));
      taskForm.reset();
      renderTasks();
    });
  
    // Toggle task completion
    window.toggleCompletion = (index) => {
      tasks[index].completed = !tasks[index].completed;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    };
  
    // Edit task
    window.editTask = (index) => {
      const task = tasks[index];
      taskName.value = task.name;
      taskDescription.value = task.description;
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    };
  
    // Delete task
    window.deleteTask = (index) => {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      renderTasks();
    };
  
    // Filter tasks
    showAll.addEventListener("click", () => renderTasks("all"));
    showPending.addEventListener("click", () => renderTasks("pending"));
    showCompleted.addEventListener("click", () => renderTasks("completed"));
  
    // Initial render
    renderTasks();
  });