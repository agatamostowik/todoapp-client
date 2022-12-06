import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { TodoList } from "../../components/TodoList/TodoList";
import { useSelector, useDispatch } from "react-redux";
import { setTodos } from "../../redux/slices/todosSlice";

import { getUrl } from "../../helpers";
import { UserPanel } from "../../components/UserPanel/UserPanel";

const fetchTodos = async () => {
  const url = getUrl();
  const response = await fetch(`${url}/api/todos`, {
    credentials: "include",
  });
  return response.json();
};

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const dispatch = useDispatch();
  const todos = useSelector((state) => {
    return state.todos.data;
  });

  const isAuthenticated = useSelector((state) => {
    return state.user.isAuthenticated;
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
    <>
      {!isAuthenticated ? (
        <Navigate to="/signin" replace={true} />
      ) : (
        <>
          {isLoading ? (
            <div className="loader-container">
              <div className="loader"></div>
            </div>
          ) : isError ? (
            <div>
              <div>404</div>
              <div>Page not found</div>
            </div>
          ) : (
            <>
              <UserPanel />
              <div id="todolist" className="container__border">
                <div className="container">
                  <TodoList
                    isRoot={true}
                    todos={filteredTodos}
                    ancestorsIds={[]}
                    parentId={null}
                  />
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}
