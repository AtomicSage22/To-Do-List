/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/projects.js":
/*!*************************!*\
  !*** ./src/projects.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "projectCreation": () => (/* binding */ projectCreation)
/* harmony export */ });
/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./todo */ "./src/todo.js");


class projectCreation{
    constructor(title){
        this.title = title;
        this.todos = [];
    }
    createTodo(title, description, dueDate, priority) {
        this.todos.push(new _todo__WEBPACK_IMPORTED_MODULE_0__.todoCreation(title, description, dueDate, priority));  
    }
}


/***/ }),

/***/ "./src/todo.js":
/*!*********************!*\
  !*** ./src/todo.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "todoCreation": () => (/* binding */ todoCreation)
/* harmony export */ });
class todoCreation{
    constructor(title, description, dueDate, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects */ "./src/projects.js");


const addProjectButton = document.querySelector(".add-project");
const projectForm = document.querySelector(".project-creation");
const confirmProjectButton = document.querySelector(".confirm-project")
const projectNav = document.querySelector(".projects");
const contents = document.querySelector(".contents");
const confirmTodoButton = document.querySelector(".confirm-todo");
const addTodoButton = document.querySelector("#add-todo");
const todoCreation = document.querySelector(".todo-creation");
let projectList = [];

const loadStorage = ()=>{
    projectList = JSON.parse(localStorage.getItem("projects"));
    projectList.forEach((project)=>{
        const projectTitle = document.createElement("p");
        projectTitle.className = "project-title-list"
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
    projectList.push(new _projects__WEBPACK_IMPORTED_MODULE_0__.projectCreation(project));
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
        });
        if(localStorage.getItem("projects")){
            loadStorage();
        }
    })
}

console.log(projectList);

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

if(projectList.length != 0){
    localStorage.setItem("projects", JSON.stringify(projectList));
}  
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0M7QUFDdEM7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsK0NBQVk7QUFDeEM7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDVk87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDUkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7OztBQ042QztBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EseUJBQXlCLHNEQUFlO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QywrQkFBK0I7QUFDNUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL3Byb2plY3RzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvdG9kby5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0b2RvQ3JlYXRpb24gfSBmcm9tIFwiLi90b2RvXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgcHJvamVjdENyZWF0aW9ue1xyXG4gICAgY29uc3RydWN0b3IodGl0bGUpe1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcclxuICAgICAgICB0aGlzLnRvZG9zID0gW107XHJcbiAgICB9XHJcbiAgICBjcmVhdGVUb2RvKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHkpIHtcclxuICAgICAgICB0aGlzLnRvZG9zLnB1c2gobmV3IHRvZG9DcmVhdGlvbih0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5KSk7ICBcclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgY2xhc3MgdG9kb0NyZWF0aW9ue1xyXG4gICAgY29uc3RydWN0b3IodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSl7XHJcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xyXG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcclxuICAgICAgICB0aGlzLmR1ZURhdGUgPSBkdWVEYXRlO1xyXG4gICAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcclxuICAgIH1cclxufVxyXG5cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBwcm9qZWN0Q3JlYXRpb24gfSBmcm9tIFwiLi9wcm9qZWN0c1wiO1xyXG5cclxuY29uc3QgYWRkUHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYWRkLXByb2plY3RcIik7XHJcbmNvbnN0IHByb2plY3RGb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0LWNyZWF0aW9uXCIpO1xyXG5jb25zdCBjb25maXJtUHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29uZmlybS1wcm9qZWN0XCIpXHJcbmNvbnN0IHByb2plY3ROYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnByb2plY3RzXCIpO1xyXG5jb25zdCBjb250ZW50cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29udGVudHNcIik7XHJcbmNvbnN0IGNvbmZpcm1Ub2RvQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb25maXJtLXRvZG9cIik7XHJcbmNvbnN0IGFkZFRvZG9CdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FkZC10b2RvXCIpO1xyXG5jb25zdCB0b2RvQ3JlYXRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRvZG8tY3JlYXRpb25cIik7XHJcbmxldCBwcm9qZWN0TGlzdCA9IFtdO1xyXG5cclxuY29uc3QgbG9hZFN0b3JhZ2UgPSAoKT0+e1xyXG4gICAgcHJvamVjdExpc3QgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicHJvamVjdHNcIikpO1xyXG4gICAgcHJvamVjdExpc3QuZm9yRWFjaCgocHJvamVjdCk9PntcclxuICAgICAgICBjb25zdCBwcm9qZWN0VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICAgICAgICBwcm9qZWN0VGl0bGUuY2xhc3NOYW1lID0gXCJwcm9qZWN0LXRpdGxlLWxpc3RcIlxyXG4gICAgICAgIHByb2plY3RUaXRsZS50ZXh0Q29udGVudCA9IHByb2plY3QudGl0bGU7XHJcbiAgICAgICAgcHJvamVjdE5hdi5hcHBlbmQocHJvamVjdFRpdGxlKTtcclxuICAgICAgICBwcm9qZWN0VGl0bGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpPT57XHJcbiAgICAgICAgICAgIGN1cnJlbnRQcm9qZWN0ID0gcHJvamVjdDtcclxuICAgICAgICAgICAgdXBkYXRlQ29udGVudHMoKTtcclxuICAgICAgICB9KVxyXG4gICAgfSk7XHJcbn1cclxuXHJcbmlmKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicHJvamVjdHNcIikpe1xyXG4gICAgbG9hZFN0b3JhZ2UoKTtcclxufVxyXG5cclxuXHJcblxyXG5sZXQgY3VycmVudFByb2plY3Q7XHJcblxyXG5hZGRQcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKT0+e1xyXG4gICAgcHJvamVjdEZvcm0uY2xhc3NMaXN0LnRvZ2dsZShcImRpc3BsYXktZm9ybVwiKTtcclxufSlcclxuXHJcbmNvbnN0IGFkZFByb2plY3RzID0gKHByb2plY3QpID0+IHtcclxuICAgIHByb2plY3RMaXN0LnB1c2gobmV3IHByb2plY3RDcmVhdGlvbihwcm9qZWN0KSk7XHJcbn1cclxuXHJcbmNvbnN0IHVwZGF0ZUNvbnRlbnRzID0gKCk9PntcclxuICAgIGN1cnJlbnRQcm9qZWN0LnRvZG9zLnNvcnQoZnVuY3Rpb24oYSwgYil7cmV0dXJuIGEucHJpb3JpdHkgLSBiLnByaW9yaXR5fSk7XHJcbiAgICBjb250ZW50cy50ZXh0Q29udGVudCA9IFwiXCI7XHJcbiAgICBjdXJyZW50UHJvamVjdC50b2Rvcy5mb3JFYWNoKCh0b2RvLCBpbmRleCk9PntcclxuICAgICAgICBjb25zdCB0b2RvRGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICB0b2RvRGl2LmNsYXNzTmFtZSA9IFwidG8tZG9cIjtcclxuICAgICAgICBjb25zdCBjaGVja2JveCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbnB1dFwiKTtcclxuICAgICAgICBjaGVja2JveC5zZXRBdHRyaWJ1dGUoXCJ0eXBlXCIsIFwiY2hlY2tib3hcIik7XHJcbiAgICAgICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaDJcIik7XHJcbiAgICAgICAgdGl0bGUuY2xhc3NOYW1lID0gXCJ0aXRsZVwiO1xyXG4gICAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgICAgICAgZGVzY3JpcHRpb24uY2xhc3NOYW1lID0gXCJkZXNjcmlwdGlvblwiO1xyXG4gICAgICAgIGNvbnN0IGRlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJpbWdcIik7XHJcbiAgICAgICAgZGVsZXRlQnV0dG9uLnNldEF0dHJpYnV0ZShcInNyY1wiLCBcImRlbGV0ZS10b2RvLnBuZ1wiKVxyXG4gICAgICAgIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICAgICAgICBkdWVEYXRlLmNsYXNzTmFtZSA9IFwiZHVlLWRhdGVcIjtcclxuICAgICAgICBkdWVEYXRlLnRleHRDb250ZW50ID0gdG9kby5kdWVEYXRlO1xyXG4gICAgICAgIHRpdGxlLnRleHRDb250ZW50ID0gdG9kby50aXRsZTtcclxuICAgICAgICBkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHRvZG8uZGVzY3JpcHRpb247XHJcbiAgICAgICAgdG9kb0Rpdi5hcHBlbmQoY2hlY2tib3gsIHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgZGVsZXRlQnV0dG9uKTtcclxuICAgICAgICBjb250ZW50cy5hcHBlbmQodG9kb0Rpdik7XHJcbiAgICAgICAgZGVsZXRlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKT0+e1xyXG4gICAgICAgICAgICBjdXJyZW50UHJvamVjdC50b2Rvcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgICAgICB1cGRhdGVDb250ZW50cygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGlmKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicHJvamVjdHNcIikpe1xyXG4gICAgICAgICAgICBsb2FkU3RvcmFnZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn1cclxuXHJcbmNvbnNvbGUubG9nKHByb2plY3RMaXN0KTtcclxuXHJcbmNvbmZpcm1Qcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSk9PntcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIGNvbnRlbnRzLnRleHRDb250ZW50ID0gXCJcIjtcclxuICAgIHByb2plY3RGb3JtLmNsYXNzTGlzdC50b2dnbGUoXCJkaXNwbGF5LWZvcm1cIik7XHJcbiAgICBhZGRQcm9qZWN0cyhkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3RUaXRsZVwiKS52YWx1ZSlcclxuICAgIHByb2plY3ROYXYudGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgcHJvamVjdExpc3QuZm9yRWFjaCgocHJvamVjdCk9PntcclxuICAgICAgICBjb25zdCBwcm9qZWN0VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICAgICAgICBwcm9qZWN0VGl0bGUuY2xhc3NOYW1lID0gXCJwcm9qZWN0LXRpdGxlLWxpc3RcIlxyXG4gICAgICAgIHByb2plY3RUaXRsZS50ZXh0Q29udGVudCA9IHByb2plY3QudGl0bGU7XHJcbiAgICAgICAgcHJvamVjdE5hdi5hcHBlbmQocHJvamVjdFRpdGxlKTtcclxuICAgICAgICBwcm9qZWN0VGl0bGUuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpPT57XHJcbiAgICAgICAgY3VycmVudFByb2plY3QgPSBwcm9qZWN0O1xyXG4gICAgICAgIHVwZGF0ZUNvbnRlbnRzKCk7XHJcbiAgICAgICAgfSlcclxuICAgIH0pXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3Byb2plY3RUaXRsZVwiKS52YWx1ZSA9IFwiXCI7XHJcbn0pXHJcblxyXG5hZGRUb2RvQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKT0+e1xyXG4gICAgaWYoY3VycmVudFByb2plY3QgIT0gbnVsbCl7XHJcbiAgICAgICAgdG9kb0NyZWF0aW9uLmNsYXNzTGlzdC50b2dnbGUoXCJkaXNwbGF5LWZvcm1cIilcclxuICAgIH1cclxufSlcclxuXHJcbmNvbmZpcm1Ub2RvQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSk9PntcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHRvZG9DcmVhdGlvbi5jbGFzc0xpc3QudG9nZ2xlKFwiZGlzcGxheS1mb3JtXCIpO1xyXG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3RpdGxlXCIpO1xyXG4gICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Rlc2NyaXB0aW9uXCIpO1xyXG4gICAgY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZHVlZGF0ZVwiKTtcclxuICAgIGNvbnN0IHByaW9yaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcmlvcml0eVwiKTtcclxuICAgIGN1cnJlbnRQcm9qZWN0LmNyZWF0ZVRvZG8odGl0bGUudmFsdWUsIGRlc2NyaXB0aW9uLnZhbHVlLCBkdWVEYXRlLnZhbHVlLCBwcmlvcml0eS52YWx1ZSk7XHJcbiAgICB1cGRhdGVDb250ZW50cygpO1xyXG4gICAgdGl0bGUudmFsdWUgPSBcIlwiO1xyXG4gICAgZGVzY3JpcHRpb24udmFsdWUgPSBcIlwiO1xyXG4gICAgZHVlRGF0ZS52YWx1ZSA9IFwiXCI7XHJcbiAgICBwcmlvcml0eS52YWx1ZSA9IDE7XHJcbn1cclxuKVxyXG5cclxuaWYocHJvamVjdExpc3QubGVuZ3RoICE9IDApe1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcm9qZWN0c1wiLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0TGlzdCkpO1xyXG59ICAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=