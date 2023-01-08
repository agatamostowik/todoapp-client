import { useState } from "react";
import { useDispatch } from "react-redux";
import { getUrl } from "../../helpers";
import { addTodo } from "../../redux/slices/todosSlice";
import { AddNew } from "../AddNew/AddNew";

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

export const AddNewTodo = (props) => {
  const { ancestorsIds, parentId } = props;

  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    try {
      const todo = await createTodo({
        label: value,
        ancestorsIds: ancestorsIds,
        parentId: parentId,
      });

      dispatch(addTodo({ todo: todo }));
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
    setValue("");
  };

  return (
    <AddNew
      value={value}
      isLoading={isLoading}
      onChange={onChange}
      onSubmit={onSubmit}
      placeholder="Add new"
    />
  );
};
