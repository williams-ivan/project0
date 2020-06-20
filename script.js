const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

let todos = []
let unchecked = 0

function uncheckedCounter(n) {
    unchecked += n
    uncheckedCountSpan.innerHTML = unchecked
}

function onCheck() {
    if (this.checked) {
        uncheckedCounter(-1)
    }
    else {
        uncheckedCounter(1)
    }
}

function addTodo(name) {
    const li = document.createElement('li')
    li.className = classNames.TODO_ITEM
    
    const deleteButton = document.createElement('button')
    deleteButton.innerHTML = 'X'
    deleteButton.className = classNames.TODO_DELETE
    deleteButton.onclick = deleteTodo
    li.appendChild(deleteButton)

    const checkbox = document.createElement('input')
    checkbox.className = classNames.TODO_CHECKBOX
    checkbox.type = 'checkbox'
    checkbox.onchange = onCheck
    li.appendChild(checkbox)

    const span = document.createElement('span')
    span.className = classNames.TODO_TEXT
    span.textContent = name
    span.contentEditable = true
    li.appendChild(span)
    
    return li
}

function newTodo() {
    const name = prompt("Add a new todo", "")
    if (name) {
        const todo = addTodo(name)
        list.appendChild(todo)
        todos.push(todo)
        itemCountSpan.innerHTML = todos.length
        uncheckedCounter(1)
    }
}

function deleteTodo() {
    const todo = this.parentNode
    todos.splice(todos.indexOf(todo), 1)
    itemCountSpan.innerHTML = todos.length
    if (!todo.children[1].checked) {
        uncheckedCounter(-1)
    }
    list.removeChild(todo)
}
