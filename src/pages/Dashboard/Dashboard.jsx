import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Todos } from "../../components/Todos/Todos";
import { setTodos } from "../../redux/slices/todosSlice";
import { UserPanel } from "../../components/UserPanel/UserPanel";
import { getUrl } from "../../helpers";
import { Loader } from "../../components/Loader";
import "./dashboard.scss";

const fetchTodos = async () => {
  const url = getUrl();
  const response = await fetch(`${url}/api/todos`, {
    credentials: "include",
  });
  return response.json();
};

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const dispatch = useDispatch();

  const todos = useSelector((state) => {
    return state.todos.data;
  });

  const isAuthenticated = useSelector((state) => {
    return state.user.isAuthenticated;
  });

  const rootTodos = todos.filter((todo) => {
    return todo.parentId === null;
  });

  useEffect(() => {
    const getTodos = async () => {
      setIsLoading(true);

      try {
        const serverTodos = await fetchTodos();

        dispatch(setTodos({ todos: serverTodos }));
      } catch (error) {
        console.log(error);
        setIsError(true);
      }
      setIsLoading(false);
    };

    getTodos();
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace={true} />;
  }

  if (isLoading) {
    return <Loader size="50" />;
  }

  if (isError) {
    return (
      <div>
        <div>404</div>
        <div>Page not found</div>
      </div>
    );
  }

  return (
    <div id="dashboard">
      <UserPanel />
      <div className="container__border">
        <div className="container">
          <Todos
            isRoot={true}
            todos={rootTodos}
            ancestorsIds={[]}
            parentId={null}
          />
        </div>
      </div>
    </div>
  );
}
