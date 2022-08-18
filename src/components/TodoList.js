import { Todo } from "./Todo";
import { AddNew } from "./AddNew";
import classNames from "classnames";

export const TodoList = (props) => {
  const { todos, isRoot } = props;



const todoListClass = classNames({
'todoList': isRoot,
'todoList-nested': !isRoot
})

  return (
    <div >
      <div className={todoListClass}>
        {todos.map((todo, index) => {
          return <Todo key={index} todo={todo} />;
        })}
      </div>
      <div>
        <AddNew />
      </div>
    </div>
  );
};
