const input = document.querySelector("#input");
const todoContainer = document.querySelector(".todo-container")
const date = document.querySelector("#date");

let todoList = []
function addTodo(){
  let todoInput = input.value;
  let todoDate = date.value;
  if(todoInput !== "" && todoDate !== ""){
  todoList.push({item: todoInput, date: todoDate});
  }else{
    alert("Please fill the input")
  }
  input.value = '';
  date.value = "",
  displayTodo();
  console.log(todoList)
}

function displayTodo(){
  let newHtml = '';
  todoList.forEach((todo, i) =>{
    newHtml+= `
      <span>${todo.item}</span>
      <span>${todo.date}</span>
      <button onclick="deleteTodo(${i})">Delete</button>
    `
  })
  todoContainer.innerHTML = newHtml;
}

function deleteTodo(i){
  todoList.splice(i, 1);
  displayTodo();
}
