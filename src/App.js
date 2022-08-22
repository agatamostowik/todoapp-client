import { TodoList } from "./components/TodoList";
import { useSelector } from "react-redux";

function App() {
  const todos = useSelector((state) => {
    return state.todos.data;
  });

  return <TodoList isRoot={true} todos={todos} />;
}

export default App;
