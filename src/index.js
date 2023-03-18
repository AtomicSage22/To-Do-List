import { projectCreation } from "./projects";

const addProjectButton = document.querySelector(".add-project");
const projectForm = document.querySelector(".project-creation");
const confirmProjectButton = document.querySelector(".confirm-project")
const projectNav = document.querySelector(".projects");
const contents = document.querySelector(".contents");
const confirmTodoButton = document.querySelector(".confirm-todo");
const addTodoButton = document.querySelector("#add-todo");
const todoCreation = document.querySelector(".todo-creation");

const projectList = [];
let currentProject;

addProjectButton.addEventListener("click", ()=>{
    projectForm.classList.toggle("display-form");
})

const addProjects = (project) => {
    projectList.push(new projectCreation(project));
}

const updateContents = ()=>{
    contents.textContent = "";
    currentProject.todos.forEach((todo, index)=>{
        const todoDiv = document.createElement("div");
        todoDiv.className = "to-do";
        const checkbox = document.createElement("input");
        checkbox.setAttribute("type", "checkbox");
        const title = document.createElement("h2");
        title.className = "title";
        const description = document.createElement("p");
        description.className = "description";
        const deleteButton = document.createElement("img");
        deleteButton.setAttribute("src", "delete-todo.png")
        const dueDate = document.createElement("p");
        dueDate.className = "due-date";
        dueDate.textContent = todo.dueDate;
        title.textContent = todo.title;
        description.textContent = todo.description;
        todoDiv.append(checkbox, title, description, dueDate, deleteButton);
        contents.append(todoDiv);
        deleteButton.addEventListener("click", ()=>{
            currentProject.todos.splice(index, 1);
            updateContents();
        });
    })
}

confirmProjectButton.addEventListener("click", (e)=>{
    e.preventDefault();
    contents.textContent = "";
    projectForm.classList.toggle("display-form");
    addProjects(document.querySelector("#projectTitle").value)
    projectNav.textContent = "";
    projectList.forEach((project)=>{
        const projectTitle = document.createElement("p");
        projectTitle.className = "project-title-list"
        projectTitle.textContent = project.title;
        projectNav.append(projectTitle);
        projectTitle.addEventListener("click", ()=>{
        currentProject = project;
        updateContents();
        })
    })
    document.querySelector("#projectTitle").value = "";
})

addTodoButton.addEventListener("click", ()=>{
    if(currentProject != null){
        todoCreation.classList.toggle("display-form")
    }
})

confirmTodoButton.addEventListener("click", (e)=>{
    e.preventDefault();
    todoCreation.classList.toggle("display-form");
    const title = document.querySelector("#title");
    const description = document.querySelector("#description");
    const dueDate = document.querySelector("#duedate");
    const priority = document.querySelector("#priority");
    currentProject.createTodo(title.value, description.value, dueDate.value, priority.value);
    updateContents();
    title.value = "";
    description.value = "";
    dueDate.value = "";
    priority.value = 1;
}
)