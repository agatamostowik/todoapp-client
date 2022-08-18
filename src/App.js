import { TodoList } from "./components/TodoList";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => {
    return state.todos.data;
  });

  return <TodoList isRoot={true} todos={todos} />;
}

export default App;
