import { AddNew } from "./AddNew";
import { Todo } from "./Todo";

export const TodoList = (props) => {
  const { todos, isRoot, ancestorsIds, parentId } = props;

  if (todos[0]?.id === 5) {
    console.log(todos);
  }

  return (
    <div className="todoList-nested">
      {todos.map((todo, index) => {
        return <Todo key={index} todo={todo} />;
      })}

      <AddNew ancestorsIds={ancestorsIds} parentId={parentId} />
    </div>
  );
};
