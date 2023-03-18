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
/* harmony import */ var _todo__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./todo */ "./src/todo.js");


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
            this.todos.push(new _todo__WEBPACK_IMPORTED_MODULE_1__.todoCreation(title, description, dueDate, priority));  
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

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0M7QUFDdEM7QUFDTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsK0NBQVk7QUFDeEM7QUFDQTs7Ozs7Ozs7Ozs7Ozs7O0FDVk87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDUkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNONkM7QUFDUDtBQUN0QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLCtDQUFZO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0EseUJBQXlCLHNEQUFlO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBLDZDQUE2QywrQkFBK0I7QUFDNUU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL3Byb2plY3RzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvdG9kby5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0b2RvQ3JlYXRpb24gfSBmcm9tIFwiLi90b2RvXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgcHJvamVjdENyZWF0aW9ue1xyXG4gICAgY29uc3RydWN0b3IodGl0bGUpe1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcclxuICAgICAgICB0aGlzLnRvZG9zID0gW107XHJcbiAgICB9XHJcbiAgICBjcmVhdGVUb2RvKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHkpIHtcclxuICAgICAgICB0aGlzLnRvZG9zLnB1c2gobmV3IHRvZG9DcmVhdGlvbih0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5KSk7ICBcclxuICAgIH1cclxufVxyXG4iLCJleHBvcnQgY2xhc3MgdG9kb0NyZWF0aW9ue1xyXG4gICAgY29uc3RydWN0b3IodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSl7XHJcbiAgICAgICAgdGhpcy50aXRsZSA9IHRpdGxlO1xyXG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBkZXNjcmlwdGlvbjtcclxuICAgICAgICB0aGlzLmR1ZURhdGUgPSBkdWVEYXRlO1xyXG4gICAgICAgIHRoaXMucHJpb3JpdHkgPSBwcmlvcml0eTtcclxuICAgIH1cclxufVxyXG5cclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgeyBwcm9qZWN0Q3JlYXRpb24gfSBmcm9tIFwiLi9wcm9qZWN0c1wiO1xyXG5pbXBvcnQgeyB0b2RvQ3JlYXRpb24gfSBmcm9tIFwiLi90b2RvXCI7XHJcbmNvbnN0IGFkZFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmFkZC1wcm9qZWN0XCIpO1xyXG5jb25zdCBwcm9qZWN0Rm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucHJvamVjdC1jcmVhdGlvblwiKTtcclxuY29uc3QgY29uZmlybVByb2plY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbmZpcm0tcHJvamVjdFwiKVxyXG5jb25zdCBwcm9qZWN0TmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcm9qZWN0c1wiKTtcclxuY29uc3QgY29udGVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnRlbnRzXCIpO1xyXG5jb25zdCBjb25maXJtVG9kb0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY29uZmlybS10b2RvXCIpO1xyXG5jb25zdCBhZGRUb2RvQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhZGQtdG9kb1wiKTtcclxuY29uc3QgdG9kb0NyZWF0aW9uQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi50b2RvLWNyZWF0aW9uXCIpO1xyXG5sZXQgcHJvamVjdExpc3QgPSBbXTtcclxuXHJcbmNvbnN0IGxvYWRTdG9yYWdlID0gKCk9PntcclxuICAgIHByb2plY3RMaXN0ID0gSlNPTi5wYXJzZShsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInByb2plY3RzXCIpKTtcclxuICAgIHByb2plY3RMaXN0LmZvckVhY2goKHByb2plY3QpPT57XHJcbiAgICAgICAgcHJvamVjdC5jcmVhdGVUb2RvID0gZnVuY3Rpb24odGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSkge1xyXG4gICAgICAgICAgICB0aGlzLnRvZG9zLnB1c2gobmV3IHRvZG9DcmVhdGlvbih0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5KSk7ICBcclxuICAgICAgICB9XHJcbiAgICAgICAgY29uc3QgcHJvamVjdFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgICAgICAgcHJvamVjdFRpdGxlLmNsYXNzTmFtZSA9IFwicHJvamVjdC10aXRsZS1saXN0XCI7XHJcbiAgICAgICAgcHJvamVjdFRpdGxlLnRleHRDb250ZW50ID0gcHJvamVjdC50aXRsZTtcclxuICAgICAgICBwcm9qZWN0TmF2LmFwcGVuZChwcm9qZWN0VGl0bGUpO1xyXG4gICAgICAgIHByb2plY3RUaXRsZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PntcclxuICAgICAgICAgICAgY3VycmVudFByb2plY3QgPSBwcm9qZWN0O1xyXG4gICAgICAgICAgICB1cGRhdGVDb250ZW50cygpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9KTtcclxufVxyXG5cclxuaWYobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJwcm9qZWN0c1wiKSl7XHJcbiAgICBsb2FkU3RvcmFnZSgpO1xyXG59XHJcblxyXG5cclxuXHJcbmxldCBjdXJyZW50UHJvamVjdDtcclxuXHJcbmFkZFByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpPT57XHJcbiAgICBwcm9qZWN0Rm9ybS5jbGFzc0xpc3QudG9nZ2xlKFwiZGlzcGxheS1mb3JtXCIpO1xyXG59KVxyXG5cclxuY29uc3QgYWRkUHJvamVjdHMgPSAocHJvamVjdCkgPT4ge1xyXG4gICAgcHJvamVjdExpc3QucHVzaChuZXcgcHJvamVjdENyZWF0aW9uKHByb2plY3QpKTtcclxufVxyXG5cclxuY29uc3QgdXBkYXRlQ29udGVudHMgPSAoKT0+e1xyXG4gICAgY3VycmVudFByb2plY3QudG9kb3Muc29ydChmdW5jdGlvbihhLCBiKXtyZXR1cm4gYS5wcmlvcml0eSAtIGIucHJpb3JpdHl9KTtcclxuICAgIGNvbnRlbnRzLnRleHRDb250ZW50ID0gXCJcIjtcclxuICAgIGN1cnJlbnRQcm9qZWN0LnRvZG9zLmZvckVhY2goKHRvZG8sIGluZGV4KT0+e1xyXG4gICAgICAgIGNvbnN0IHRvZG9EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIHRvZG9EaXYuY2xhc3NOYW1lID0gXCJ0by1kb1wiO1xyXG4gICAgICAgIGNvbnN0IGNoZWNrYm94ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImlucHV0XCIpO1xyXG4gICAgICAgIGNoZWNrYm94LnNldEF0dHJpYnV0ZShcInR5cGVcIiwgXCJjaGVja2JveFwiKTtcclxuICAgICAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoMlwiKTtcclxuICAgICAgICB0aXRsZS5jbGFzc05hbWUgPSBcInRpdGxlXCI7XHJcbiAgICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICAgICAgICBkZXNjcmlwdGlvbi5jbGFzc05hbWUgPSBcImRlc2NyaXB0aW9uXCI7XHJcbiAgICAgICAgY29uc3QgZGVsZXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtcclxuICAgICAgICBkZWxldGVCdXR0b24uc2V0QXR0cmlidXRlKFwic3JjXCIsIFwiZGVsZXRlLXRvZG8ucG5nXCIpXHJcbiAgICAgICAgY29uc3QgZHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gICAgICAgIGR1ZURhdGUuY2xhc3NOYW1lID0gXCJkdWUtZGF0ZVwiO1xyXG4gICAgICAgIGR1ZURhdGUudGV4dENvbnRlbnQgPSB0b2RvLmR1ZURhdGU7XHJcbiAgICAgICAgdGl0bGUudGV4dENvbnRlbnQgPSB0b2RvLnRpdGxlO1xyXG4gICAgICAgIGRlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gdG9kby5kZXNjcmlwdGlvbjtcclxuICAgICAgICB0b2RvRGl2LmFwcGVuZChjaGVja2JveCwgdGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBkZWxldGVCdXR0b24pO1xyXG4gICAgICAgIGNvbnRlbnRzLmFwcGVuZCh0b2RvRGl2KTtcclxuICAgICAgICBkZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpPT57XHJcbiAgICAgICAgICAgIGN1cnJlbnRQcm9qZWN0LnRvZG9zLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIHVwZGF0ZUNvbnRlbnRzKCk7XHJcbiAgICAgICAgICAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKFwicHJvamVjdHNcIiwgSlNPTi5zdHJpbmdpZnkocHJvamVjdExpc3QpKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBpZihsb2NhbFN0b3JhZ2UuZ2V0SXRlbShcInByb2plY3RzXCIpKXtcclxuICAgICAgICAvLyAgICAgbG9hZFN0b3JhZ2UoKTtcclxuICAgICAgICAvLyB9XHJcbiAgICB9KVxyXG59XHJcblxyXG5cclxuY29uZmlybVByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKT0+e1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgY29udGVudHMudGV4dENvbnRlbnQgPSBcIlwiO1xyXG4gICAgcHJvamVjdEZvcm0uY2xhc3NMaXN0LnRvZ2dsZShcImRpc3BsYXktZm9ybVwiKTtcclxuICAgIGFkZFByb2plY3RzKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJvamVjdFRpdGxlXCIpLnZhbHVlKVxyXG4gICAgcHJvamVjdE5hdi50ZXh0Q29udGVudCA9IFwiXCI7XHJcbiAgICBwcm9qZWN0TGlzdC5mb3JFYWNoKChwcm9qZWN0KT0+e1xyXG4gICAgICAgIGNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJwXCIpO1xyXG4gICAgICAgIHByb2plY3RUaXRsZS5jbGFzc05hbWUgPSBcInByb2plY3QtdGl0bGUtbGlzdFwiXHJcbiAgICAgICAgcHJvamVjdFRpdGxlLnRleHRDb250ZW50ID0gcHJvamVjdC50aXRsZTtcclxuICAgICAgICBwcm9qZWN0TmF2LmFwcGVuZChwcm9qZWN0VGl0bGUpO1xyXG4gICAgICAgIHByb2plY3RUaXRsZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PntcclxuICAgICAgICAgICAgY3VycmVudFByb2plY3QgPSBwcm9qZWN0O1xyXG4gICAgICAgICAgICB1cGRhdGVDb250ZW50cygpO1xyXG4gICAgICAgIH0pXHJcbiAgICB9KVxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNwcm9qZWN0VGl0bGVcIikudmFsdWUgPSBcIlwiO1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcm9qZWN0c1wiLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0TGlzdCkpO1xyXG59KVxyXG5cclxuYWRkVG9kb0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCk9PntcclxuICAgIGlmKGN1cnJlbnRQcm9qZWN0ICE9IG51bGwpe1xyXG4gICAgICAgIHRvZG9DcmVhdGlvbkJ1dHRvbi5jbGFzc0xpc3QudG9nZ2xlKFwiZGlzcGxheS1mb3JtXCIpXHJcbiAgICB9XHJcbn0pXHJcblxyXG5jb25maXJtVG9kb0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpPT57XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB0b2RvQ3JlYXRpb25CdXR0b24uY2xhc3NMaXN0LnRvZ2dsZShcImRpc3BsYXktZm9ybVwiKTtcclxuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiN0aXRsZVwiKTtcclxuICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkZXNjcmlwdGlvblwiKTtcclxuICAgIGNvbnN0IGR1ZURhdGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2R1ZWRhdGVcIik7XHJcbiAgICBjb25zdCBwcmlvcml0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjcHJpb3JpdHlcIik7XHJcbiAgICBjdXJyZW50UHJvamVjdC5jcmVhdGVUb2RvKHRpdGxlLnZhbHVlLCBkZXNjcmlwdGlvbi52YWx1ZSwgZHVlRGF0ZS52YWx1ZSwgcHJpb3JpdHkudmFsdWUpO1xyXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcm9qZWN0c1wiLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0TGlzdCkpO1xyXG4gICAgdXBkYXRlQ29udGVudHMoKTtcclxuICAgIHRpdGxlLnZhbHVlID0gXCJcIjtcclxuICAgIGRlc2NyaXB0aW9uLnZhbHVlID0gXCJcIjtcclxuICAgIGR1ZURhdGUudmFsdWUgPSBcIlwiO1xyXG4gICAgcHJpb3JpdHkudmFsdWUgPSAxO1xyXG59XHJcbilcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9