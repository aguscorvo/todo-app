import React from "react"
import { TodoProvider } from "../TodoContext"
import { APPUi } from "./AppUI"

function App() {
  return (
    <TodoProvider>
      <APPUi />
    </TodoProvider>
  )
}

export default App
