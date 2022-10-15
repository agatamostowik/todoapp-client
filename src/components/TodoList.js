import { Todo } from "./Todo";
import { AddNew } from "./AddNew";
import classNames from "classnames";
import { useSelector } from "react-redux";

const Todo2 = (props) => {
  const todos = useSelector((state) => {
    return state.todos.data;
  });

  const filteredTodos = todos.filter((todo) => {
    return todo.parentId === props.todo.id;
  });

  return (
    <div>
      <div>{props.todo.label}</div>
      <TodoList isRoot={false} todos={filteredTodos} />
    </div>
  );
};

export const TodoList = (props) => {
  const { todos, isRoot } = props;
  console.log(todos);
  const todoListClass = classNames({
    "todoList-nested": !isRoot,
  });

  return (
    <div className={todoListClass}>
      {todos.map((todo, index) => {
        return <Todo2 key={index} todo={todo} />;
      })}
      <AddNew />
    </div>
  );
};
