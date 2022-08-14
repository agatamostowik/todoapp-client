
import { TodoList } from "./components/TodoList";

// const todosFlat = [
//   {
//     _id: "1",
//     label: "A",
//     todoIds: ["2", "3"],
//   },
//   {
//     _id: "4",
//     label: "B",
//     todoIds: [],
//   },
//   {
//     _id: "2",
//     label: "C",
//     todoIds: [],
//   },
//   {
//     _id: "3",
//     label: "D",
//     todoIds: ["5", "6"],
//   },
//   {
//     _id: "5",
//     label: "H",
//     todoIds: [],
//   },
//   {
//     _id: "6",
//     label: "L",
//     todoIds: [],
//   },
//   {
//     _id: "7",
//     label: "P",
//     todoIds: [],
//   },
// ];

const todosNested = [
  {
    _id: "1",
    label: "A",
    todoIds: [
      {
        _id: "2",
        label: "C",
        todoIds: [],
      },
      {
        _id: "3",
        label: "D",
        todoIds: [
          {
            _id: "5",
            label: "H",
            todoIds: [],
          },
          {
            _id: "6",
            label: "L",
            todoIds: [],
          },
        ],
      },
    ],
  },
  {
    _id: "4",
    label: "B",
    todoIds: [],
  },
  {
    _id: "7",
    label: "P",
    todoIds: [],
  },
];



function App() {
  

  return <TodoList isRoot={true} todos={todosNested} />;

}

export default App;
