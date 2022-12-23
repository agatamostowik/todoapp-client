import { useState } from "react";
import { useDispatch } from "react-redux";
import { getUrl } from "../../helpers";
import { addTodo } from "../../redux/slices/todosSlice";
import { AddNew } from "../AddNew/AddNew";
import { Todo } from "../Todo/Todo";
import "./TodoList.scss";

const createTodo = async (data) => {
  const url = getUrl();
  const response = await fetch(`${url}/api/todos`, {
    method: "POST",
    body: JSON.stringify(data),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.json();
};

export const TodoList = (props) => {
  const { todos, isRoot, ancestorsIds, parentId } = props;

  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  if (todos[0]?.id === 5) {
    console.log(todos);
  }

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const data = {
      label: value,
      ancestorsIds: ancestorsIds,
      parentId: parentId,
    };

    setIsLoading(true);
    try {
      const serverTodo = await createTodo(data);
      dispatch(addTodo({ todo: serverTodo }));
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
    setValue("");
    
  };

  return (
    <div className="todolist__container">
      <div className={`todolist__wrapper ${isRoot ? `isRoot` : ""}`}>
        {todos.map((todo, index) => {
          return <Todo key={index} todo={todo} />;
        })}
        <div className="add_new_wrapper">
          <AddNew
            value={value}
            isLoading={isLoading}
            onChange={onChange}
            onSubmit={onSubmit}
            placeholder="Add new"
          />
        </div>
      </div>
    </div>
  );
};
