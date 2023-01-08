import { AddNewTodo } from "../AddNewTodo/AddNewTodo";
import { Todo } from "../Todo/Todo";
import "./Todos.scss";

export const Todos = (props) => {
  const { todos, isRoot, ancestorsIds, parentId } = props;

  return (
    <div id="todos">
      <div className={`todos__wrapper ${isRoot ? `todos__isRoot` : ""}`}>
        {todos.map((todo, index) => {
          return <Todo key={index} todo={todo} />;
        })}
        <div className="todos__add_new">
          <AddNewTodo ancestorsIds={ancestorsIds} parentId={parentId} />
        </div>
      </div>
    </div>
  );
};
