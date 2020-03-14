const todoList = document.querySelector('[data-todo-list]');
const inputTodo = document.querySelector('[data-input-todo]');
const btnAddTodo = document.querySelector('[data-add-todo]');

const todosItems = JSON.parse(localStorage.getItem('todoList')) || [];

function renderTodoList() {
  todoList.innerHTML = '';
  todosItems.forEach((todoItem, index) => {
    const todoElement = document.createElement('li');
    todoElement.classList.add('list-group-item');
    todoElement.setAttribute('id', `todo${index}`);
    const textTodo = document.createTextNode(todoItem);
    const deleteElement = document.createElement('a');
    deleteElement.setAttribute('href', '#');
    const textDelete = document.createTextNode('X');
    deleteElement.appendChild(textDelete);
    deleteElement.setAttribute('onclick', `deleteTodoItem(${index})`);


    
    todoElement.appendChild(textTodo);
    todoElement.appendChild(deleteElement);
    todoList.appendChild(todoElement);
  });
}

renderTodoList();

if(todoList && inputTodo && btnAddTodo) {
  btnAddTodo.addEventListener('click', (e) => {
    e.preventDefault();
    if(inputTodo.value != '') {
      todosItems.push(inputTodo.value);
      inputTodo.value = '';
      renderTodoList();
      saveOnStorage()
    }
  })
}

function deleteTodoItem(index) {
  todosItems.splice(index, 1);
  document.querySelector(`#todo${index}`).remove();
  renderTodoList();
  saveOnStorage()
}

function saveOnStorage() {
  localStorage.setItem('todoList', JSON.stringify(todosItems));
}