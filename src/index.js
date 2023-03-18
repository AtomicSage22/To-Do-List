import { projectCreation } from "./projects";
import { todoCreation } from "./todo";
const addProjectButton = document.querySelector(".add-project");
const projectForm = document.querySelector(".project-creation");
const confirmProjectButton = document.querySelector(".confirm-project")
const projectNav = document.querySelector(".projects");
const contents = document.querySelector(".contents");
const confirmTodoButton = document.querySelector(".confirm-todo");
const addTodoButton = document.querySelector("#add-todo");
const todoCreationButton = document.querySelector(".todo-creation");
let projectList = [];

const loadStorage = ()=>{
    projectList = JSON.parse(localStorage.getItem("projects"));
    projectList.forEach((project)=>{
        project.createTodo = function(title, description, dueDate, priority) {
            this.todos.push(new todoCreation(title, description, dueDate, priority));  
        }
        const projectTitle = document.createElement("p");
        projectTitle.className = "project-title-list";
        projectTitle.textContent = project.title;
        projectNav.append(projectTitle);
        projectTitle.addEventListener("click", ()=>{
            currentProject = project;
            updateContents();
        })
    });
}

if(localStorage.getItem("projects")){
    loadStorage();
}



let currentProject;

addProjectButton.addEventListener("click", ()=>{
    projectForm.classList.toggle("display-form");
})

const addProjects = (project) => {
    projectList.push(new projectCreation(project));
}

const updateContents = ()=>{
    currentProject.todos.sort(function(a, b){return a.priority - b.priority});
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
            localStorage.setItem("projects", JSON.stringify(projectList));
        });
        // if(localStorage.getItem("projects")){
        //     loadStorage();
        // }
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
    localStorage.setItem("projects", JSON.stringify(projectList));
})

addTodoButton.addEventListener("click", ()=>{
    if(currentProject != null){
        todoCreationButton.classList.toggle("display-form")
    }
})

confirmTodoButton.addEventListener("click", (e)=>{
    e.preventDefault();
    todoCreationButton.classList.toggle("display-form");
    const title = document.querySelector("#title");
    const description = document.querySelector("#description");
    const dueDate = document.querySelector("#duedate");
    const priority = document.querySelector("#priority");
    currentProject.createTodo(title.value, description.value, dueDate.value, priority.value);
    localStorage.setItem("projects", JSON.stringify(projectList));
    updateContents();
    title.value = "";
    description.value = "";
    dueDate.value = "";
    priority.value = 1;
}
)
