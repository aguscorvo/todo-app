import React from "react"
import { TodoContext } from "../TodoContext"
import { TodoCounter } from "../components/TodoCounter"
import { TodoSearch } from "../components/TodoSearch"
import { TodoList } from "../components/TodoList"
import { TodoItem } from "../components/TodoItem"
import { CreateTodoButton } from "../components/CreateTodoButton"

function APPUi() {
  return (
    <React.Fragment>
      <TodoCounter />
      <TodoSearch />
      <TodoContext.Consumer>
        {({ error, loading, filteredTodos, completeTodo, deleteTodo }) => (
          <TodoList>
            {error && <p>Desesperate, hubo un error...</p>}
            {loading && <p>Estamos cargando, no desesperes...</p>}
            {!loading && !filteredTodos.length && <p>¡Crea tu primer TODO!</p>}

            {filteredTodos.map(todo => (
              <TodoItem
                key={todo.text}
                text={todo.text}
                completed={todo.completed}
                onComplete={() => completeTodo(todo.text)}
                onDelete={() => deleteTodo(todo.text)}
              />
            ))}
          </TodoList>
        )}
      </TodoContext.Consumer>
      <CreateTodoButton />
    </React.Fragment>
  )
}

export { APPUi }
