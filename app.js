//selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//event listners

//if content is loaded then call the function getTodos
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
//this event listner checks if we are clicking on trash or complete button
filterOption.addEventListener("click", filterTodo);
//functions

//basic idea is to crate a new div containing a list item and two button list item is the thing we type in input and
//one button is for tick and other is to delete li

//steps
// 1)create a new div
// 2)add a class to the div
// 3)create li
// 4)add a class to li
// 4)add inner html to li
// 5)append the Child to li to div we created
// 5)make two buttons add class to them and add innner html of font awesome
// 6)make the div we created append to the ul that we created in the html file
function addTodo(event) {
  event.preventDefault(); //prevents defalut reload of the browser
  //crating new div
  const todoDiv = document.createElement("div"); //creating a new div
  todoDiv.classList.add("todo"); //adding a class
  //crating li for inserting inside a div
  const todoLi = document.createElement("li");
  todoLi.innerText = todoInput.value; //gets the value of input of the input we type
  todoLi.classList.add("todo-item");
  todoDiv.appendChild(todoLi);
  ///adding todos to local storage
  saveLocalStorage(todoInput.value);

  //completed button
  const completedButton = document.createElement("button");
  completedButton.classList.add("complete-button");
  completedButton.innerHTML = '<i class="fas fa-check fa-xl"></i>';
  todoDiv.appendChild(completedButton);
  //trash button
  const trashButton = document.createElement("button");
  trashButton.classList.add("trash-button");
  trashButton.innerHTML = '<i class="fas fa-trash fa-xl"></i>';
  todoDiv.appendChild(trashButton);

  todoList.appendChild(todoDiv);

  // clear todo input value
  todoInput.value = "";
}

//fuction to delete
function deleteCheck(e) {
  // console.log(e.target);//ouputs what we are clicking on
  const item = e.target;
  //delete to-do
  if (item.classList[0] === "trash-button") {
    const todo = item.parentElement;
    todo.classList.add("fall"); //adding deleting animation
    // todo.remove();if we do this it will delete instantly without animation
    // so we need to add new event listner

    //remove todos from local storage
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  //check mark
  if (item.classList[0] === "complete-button") {
    const todo = item.parentElement;
    todo.classList.toggle("completed"); //add this class completed if clicked button is check
  }
}

//function to filter todo

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

//store todos to local storage

function saveLocalStorage(todo) {
  let todos;
  //check if todos are already present;
  if (localStorage.getItem("todos") === null) {
    todos = []; //if not preset we get null array
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  } //else we get todos back from local storage

  //else add todo to the array todos
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div"); //creating a new div
    todoDiv.classList.add("todo"); //adding a class
    //crating li for inserting inside a div
    const todoLi = document.createElement("li");
    todoLi.innerText = todo; //gets the value from local storage
    todoLi.classList.add("todo-item");
    todoDiv.appendChild(todoLi);

    //completed button
    const completedButton = document.createElement("button");
    completedButton.classList.add("complete-button");
    completedButton.innerHTML = '<i class="fas fa-check fa-xl"></i>';
    todoDiv.appendChild(completedButton);
    //trash button
    const trashButton = document.createElement("button");
    trashButton.classList.add("trash-button");
    trashButton.innerHTML = '<i class="fas fa-trash fa-xl"></i>';
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
  });
}

//functon to delete todos

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
