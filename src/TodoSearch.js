import React from "react"
import "./TodoSearch.css"

function TodoSearch() {
  const onSearchValueChange = event => console.log(event.target.value)

  return (
    <input
      className='TodoSearch'
      placeholder='Escribe una tarea'
      onChange={onSearchValueChange}
    />
  )
}

export { TodoSearch }
