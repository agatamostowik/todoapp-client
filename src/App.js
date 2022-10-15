import { useEffect, useState } from "react";
import { TodoList } from "./components/TodoList";
import { useSelector, useDispatch } from "react-redux";
import { setTodos } from "./redux/slices/todosSlice";

const getUrl = () => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    return "http://localhost:3001";
  } else {
    return "https://todos-node-client.herokuapp.com";
  }
};

const fetchTodos = async () => {
  const url = getUrl();
  const response = await fetch(`${url}/api/todos`);
  return response.json();
};

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const dispatch = useDispatch();
  const todos = useSelector((state) => {
    return state.todos.data;
  });

  const filteredTodos = todos.filter((todo) => {
    return todo.parentId === null;
  });

  useEffect(() => {
    setIsLoading(true);

    async function getTodos() {
      try {
        const serverTodos = await fetchTodos();

        dispatch(setTodos({ todos: serverTodos }));
      } catch (error) {
        console.log(error);
        setIsError(true);
      }
      setIsLoading(false);
    }

    getTodos();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="loader"></div>
      ) : isError ? (
        <div>Error</div>
      ) : (
        <TodoList isRoot={true} todos={filteredTodos} />
      )}
    </>
  );
}

export default App;
