let todoUl = document.getElementsByClassName('todo-ul')[0];
let addButton = document.getElementsByClassName('add-button')[0];

// TODO class: represents a todo.
class Todo {
   constructor(description, priority) {
      this.description = description;
      this.priority = priority;
   }
}

// Data class:  handles data being retrieved and entered into localStorage:
class Data {
   static getTodos() {
      let todos;

      if (localStorage.getItem('todos') === null) {
         todos = [];
      }
      else {
         todos = JSON.parse(localStorage.getItem('todos'));
      }

      return todos;
   }

   static addTodo(todo) {
      const todos = Data.getTodos();

      todos.push(todo);
      localStorage.setItem('todos', JSON.stringify(todos));
   }

   static deleteTodo(todo) {

   }
}

// Handles functionality for the "Clear All Todos" button:
document.getElementsByClassName('clear-button')[0].onclick = function() {
   localStorage.clear();
   todoUl.innerHTML = '';
}

addButton.onclick = function(e) {
   addTodo(todoUl);
}
 
// function called to display all todos when webpage is opened, and updated.
function displayTodos() {
   const todos = Data.getTodos();

   const list = document.getElementsByClassName('todo-ul')[0];

   list.innerHTML = '';

   todos.forEach((todo) => createTodoHtml(todo, list));
}

/*
 * Helper function for displayTodos().
 * Creates a template literal for each todo li.
 */
function createTodoHtml(todo, list) {
   const li = document.createElement('li');

   li.className = 'todo-li';

   li.innerHTML = `
   <span class=${todo.priority}>${todo.priority}</span>
   <i class="fa fa-hand-peace-o fa-lg done-icon" onclick="deleteLi(this.parentElement)"></i>
   <span class="description-margin">${todo.description}</span>
   `;

   list.appendChild(li);
}

function addTodo(ul) {
   let todoText = document.getElementsByClassName('todo-input')[0].value;

   if (todoText.length < 1) {
      alert('Error: You can\'t have a ToDo without having text!');
      return false;
   }

   document.getElementsByClassName('todo-input')[0].value = '';

   let todoPriority = document.getElementsByClassName('todo-priority')[0].value;

   if (todoPriority.length < 1) {
      todoPriority = 'Minor';
   }

   let todoTextNode = document.createTextNode(todoText + ' ');
   let todoLi = document.createElement('li');
   todoLi.appendChild(todoTextNode);

   let doneButton = document.createElement('button');
   doneButton.innerHTML = 'Done!';
   doneButton.setAttribute('onclick', 'deleteLi(this.parentElement)');

   todoLi.appendChild(doneButton);

   // Before updating the UI, add the todo to localStorage:
   const todo = {description: todoText, priority: todoPriority};
   Data.addTodo(todo);

   displayTodos();
}

function deleteLi(li) {
   const todos = Data.getTodos();

   const description = li.getElementsByClassName('description-margin')[0].innerHTML;

   todos.forEach((todo, index) => {
      if (todo.description === description) {
         todos.splice(index, 1);
      }
   });

   localStorage.setItem('todos', JSON.stringify(todos));

   li.parentElement.removeChild(li);
}

// EVENT: call displayTodos() when DOM loads.
document.addEventListener('DOMContentLoaded', displayTodos);
