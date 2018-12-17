$(document).ready(function() {
  renderApp()
});

async function addTodo() {
  todoItem = document.getElementById('todoInput').value
  todos.push(todoItem)
  await dash.writeFile('/data/data.json', JSON.stringify(todos))
  $('.todosCard').append('<p class="todoItem">' + todoItem + '</p>') 
}

async function renderApp(){
  //settup dat
  try {
    dash = new DatArchive(window.location)
    dashInfo = await dash.getInfo()
  } catch {
    console.log('Error finding archive')
  }
  //read JSON
  try{
    savedTodos = await dash.readFile('/data/data.json', 'utf-8')
    todos = JSON.parse(savedTodos)
    for(i = 0; i < todos.length; i++){
      $('.todosCard').append('<p class="todoItem">' + todos[i] + '</p>')
      console.log(todos[i])
    }
  } catch {
    todos = []
    console.log('No todos found')
  }
  //mount front end
  try {
    $('.title').text(dashInfo.title)
    $('.description').text(dashInfo.description)
    $('.goHome').on('click', () => {
      window.location = 'dat://56ebc94f700dadc1581c524b23118925fd7371db1ca1ea5c783067dbde5d1bec/'
    })
    $('.addTodo').on('click', addTodo)
  } catch {
    console.log('Error mounting front end components')
  }
}