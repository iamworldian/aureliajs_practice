interface ITodo {
  description : string,
  done : boolean,
}

export class App {
  heading: string;
  todos: ITodo[];
  todoDescription: string;


  constructor() {
    this.heading = 'Todos';
    this.todos = [];
    this.todoDescription = '';
  }

  addTodo(): void {
    if(this.todoDescription){
      this.todos.push({
        description: this.todoDescription,
        done: false
      });
    }

    this.todoDescription = '';
  }


  removeTodo(todo: ITodo): void {
    const index = this.todos.indexOf(todo);
    if(index !== -1){
      this.todos.splice(index, 1);
    }
  }


}
