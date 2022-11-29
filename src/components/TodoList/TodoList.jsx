import { AddNew } from "../AddNew/AddNew";
import { Todo } from "../Todo/Todo";
import "./TodoList.scss";

export const TodoList = (props) => {
  const { todos, isRoot, ancestorsIds, parentId } = props;

  if (todos[0]?.id === 5) {
    console.log(todos);
  }

  return (
    <div className="todolist__container">
      <div className={`todolist__wrapper ${isRoot ? `isRoot` : ""}`}>
        {todos.map((todo, index) => {
          return <Todo key={index} todo={todo} />;
        })}

        <AddNew ancestorsIds={ancestorsIds} parentId={parentId} />
      </div>
    </div>
  );
};
