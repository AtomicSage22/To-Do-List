import { todoCreation } from "./todo";

export class projectCreation{
    constructor(title){
        this.title = title;
        this.todos = [];
    }
    createTodo(title, description, dueDate, priority) {
        this.todos.push(new todoCreation(title, description, dueDate, priority));  
    }
}
