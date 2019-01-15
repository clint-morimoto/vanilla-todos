let todoUl = document.getElementsByClassName('todo-ul')[0];
let addButton = document.getElementsByClassName('add-button')[0];

document.getElementsByClassName('clear-button')[0].onclick = function() {
   todoUl.innerHTML = '';
}

addButton.onclick = function() {
   addTodo(todoUl);
}

function addTodo(ul) {
   let todoText = document.getElementsByClassName('todo-input')[0].value;

   if (todoText.length < 1) {
      alert('Error: You can\'t have a ToDo without having text!');
      return false;
   }

   document.getElementsByClassName('todo-input')[0].value = '';

   let todoTextNode = document.createTextNode(todoText + ' ');
   let todoLi = document.createElement('li');
   todoLi.appendChild(todoTextNode);

   let doneButton = document.createElement('button');
   doneButton.innerHTML = 'Done!';
   doneButton.setAttribute('onclick', 'deleteLi(this.parentElement)');

   todoLi.appendChild(doneButton);
   ul.appendChild(todoLi);
}

function deleteLi(li) {
   li.parentElement.removeChild(li);
}