export const getUrl = () => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    return "http://localhost:3001";
  } else {
    return "https://todos-server-production.up.railway.app/";
  }
};

export const updateTodo = async (todoId, data) => {
  const url = getUrl();
  const response = await fetch(`${url}/api/todos/${todoId}/edit`, {
    method: "PUT",
    body: JSON.stringify(data),
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.json();
};
