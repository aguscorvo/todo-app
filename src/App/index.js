import React from "react"
import { APPUi } from "./AppUI"

// const defaultTodos = [
//   { text: "Limpiar el cuarto", completed: true },
//   { text: "Tomar el curso de intro a React", completed: false },
//   { text: "Hacer la entrega de testing", completed: false },
// ]

function useLocalStorage(itemName, initialValue) {
  const localStorageItem = localStorage.getItem(itemName)
  let parsedItem

  if (!localStorageItem) {
    localStorage.setItem(itemName, JSON.stringify(initialValue))
    parsedItem = initialValue
  } else {
    parsedItem = JSON.parse(localStorageItem)
  }

  const [item, setItem] = React.useState(parsedItem)

  const saveItem = newItem => {
    const stringifiedItem = JSON.stringify(newItem)
    localStorage.setItem(itemName, stringifiedItem)
    setItem(newItem)
  }

  return [item, saveItem]
}

function App() {
  const [patito, savePatito] = useLocalStorage("PATITO_V1", "Donald")
  const [todos, saveTodos] = useLocalStorage("TODOS_V1", [])

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

  return [
    <p>{patito}</p>,
    <APPUi
      totalTodos={totalTodos}
      completedTodos={completedTodos}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      filteredTodos={filteredTodos}
      completeTodo={completeTodo}
      deleteTodo={deleteTodo}
    />,
  ]
}

export default App
