import React from "react"
import { TodoContext } from "../TodoContext"
import { TodoCounter } from "../components/TodoCounter"
import { TodoSearch } from "../components/TodoSearch"
import { TodoList } from "../components/TodoList"
import { TodoItem } from "../components/TodoItem"
import { CreateTodoButton } from "../components/CreateTodoButton"
import { Modal } from "../components/Modal"
import { TodoForm } from "../components/TodoForm"
import { EmptyTodos } from "../components/EmptyTodos"
import { TodosError } from "../components/TodosError"
import { TodosLoading } from "../components/TodosLoading"

function APPUi() {
  const {
    error,
    loading,
    filteredTodos,
    completeTodo,
    deleteTodo,
    openModal,
    setOpenModal,
  } = React.useContext(TodoContext)

  return (
    <React.Fragment>
      <TodoCounter />
      <TodoSearch />

      <TodoList>
        {error && <TodosError error={error} />}
        {loading && <TodosLoading />}
        {!loading && !filteredTodos.length && <EmptyTodos />}

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
      {openModal && (
        <Modal>
          <TodoForm />
        </Modal>
      )}
      <CreateTodoButton setOpenModal={setOpenModal} />
    </React.Fragment>
  )
}

export { APPUi }
