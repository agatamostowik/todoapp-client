import { useEffect, useState } from "react";
import { TodoList } from "./components/TodoList";
import { useSelector, useDispatch } from "react-redux";
import { setTodos } from "./redux/slices/todosSlice";
import { getUrl } from "./helpers";

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
    async function getTodos() {
      setIsLoading(true);

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
    <div className="wrapper2">
      {isLoading ? (
        <div className="loader-contaiener">
          <div className="loader"></div>
        </div>
      ) : isError ? (
        <div>Error</div>
      ) : (
        <TodoList
          isRoot={true}
          todos={filteredTodos}
          ancestorsIds={[]}
          parentId={null}
        />
      )}
    </div>
  );
}

export default App;
