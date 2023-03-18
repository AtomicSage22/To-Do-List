import { todoCreation } from "./todo";

export class projectCreation{
    constructor(title){
        this.title = title;
        this.todo = [];
    }
    createTodo(title, description, dueDate, priority) {
        this.todo.push(new todoCreation(title, description, dueDate, priority));  
    }
}
