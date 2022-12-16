export const getUrl = () => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    return "http://localhost:3001";
  } else {
    return "https://todos-server-production.up.railway.app";
  }
};

export const updateTodo = async (todoId, body) => {
  const url = getUrl();
  const response = await fetch(`${url}/api/todos/${todoId}/edit`, {
    method: "PUT",
    body: JSON.stringify(body),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
};

export const statusOptions = [
  { label: "New", value: "new" },
  { label: "In progress", value: "in_progress" },
  { label: "Done", value: "done" },
];

export const status = {
  in_progress: "In progress",
  new: "New",
  done: "Done",
};
