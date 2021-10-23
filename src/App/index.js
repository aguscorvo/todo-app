import React from "react"
import { APPUi } from "./AppUI"

// const defaultTodos = [
//   { text: "Limpiar el cuarto", completed: true },
//   { text: "Tomar el curso de intro a React", completed: false },
//   { text: "Hacer la entrega de testing", completed: false },
// ]

function App() {
  const localStorageTodos = localStorage.getItem("TODOS_V1")
  let parsedTodos

  if (!localStorageTodos) {
    localStorage.setItem("TODOS_V1", JSON.stringify([]))
    parsedTodos = []
  } else {
    parsedTodos = JSON.parse(localStorageTodos)
  }

  const [todos, setTodos] = React.useState(parsedTodos)
  const [searchValue, setSearchValue] = React.useState("")

  const completedTodos = todos.filter(todo => todo.completed).length
  const totalTodos = todos.length

  let filteredTodos = []

  if (!searchValue) {
    filteredTodos = todos
  } else {
    filteredTodos = todos.filter(todo => {
      const todoText = todo.text.toLowerCase()
      const searchText = searchValue.toLowerCase()
      return todoText.includes(searchText)
    })
  }

  const saveTodos = newTodos => {
    const stringifiedTodos = JSON.stringify(newTodos)
    localStorage.setItem("TODOS_V1", stringifiedTodos)
    setTodos(newTodos)
  }

  const completeTodo = text => {
    const todoIndex = todos.findIndex(todo => todo.text === text)
    const newTodos = [...todos]
    newTodos[todoIndex].completed = true
    saveTodos(newTodos)
  }

  const deleteTodo = text => {
    const todoIndex = todos.findIndex(todo => todo.text === text)
    const newTodos = [...todos]
    newTodos.splice(todoIndex, 1)
    saveTodos(newTodos)
  }

  return (
    <APPUi
      totalTodos={totalTodos}
      completedTodos={completedTodos}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      filteredTodos={filteredTodos}
      completeTodo={completeTodo}
      deleteTodo={deleteTodo}
    />
  )
}

export default App
