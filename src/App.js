import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { AppUI } from "./components/UI/AppUI/AppUI";
import useLocalStorage from "./hooks/useLocalStorage";
const MySwal = withReactContent(Swal);

// function useLocalStorage (itemName, initialValue) {
//   console.log("initialvalue: "+initialValue);
//   const localStorageItem = localStorage.getItem(itemName);
//   let parsedItem;

//   if (!localStorageItem){
//     localStorage.setItem(itemName, JSON.stringify(initialValue));
//     parsedItem = initialValue;
//   } else {
//     console.log("contenido");
//     parsedItem = JSON.parse(localStorageItem);
//   }

//   const [item, setItem] = React.useState(parsedItem);
  
//   const saveItem = (newItem) => {
//       localStorage.setItem(itemName, JSON.stringify(newItem));
//       setItem(newItem);
//   };
//   return [item,saveItem];
// }



function App() {

  const defaultTodos = [
    { text: 'Cortar cebolla', completed: true },
    { text: 'Tomar el Curso de Intro a React.js', completed: false },
    { text: 'Llorar con la Llorona', completed: false },
    { text: 'LALALALALA', completed: false },
    { text: 'Usar estados derivados', completed: true },
  ];
  
const [todos,saveTodos] = useLocalStorage('TODOS_V1',defaultTodos);
console.log("Print TODOS: " + todos);
  
  const [searchValue, setSearchValue] = React.useState("");
  const [IsSearchDisabled, setIsSearchDisabled] = React.useState(true);
  const data = new Object();
  let completed = "";
  let uncompleted = "";
  let percentage = "";
  let totalTasks = 0;
  if (todos) {
    completed = todos.filter((todo) => !!todo.completed).length;
    uncompleted = todos.filter((todo) => !todo.completed).length;
    percentage = Math.trunc((completed * 100) / todos.length);

    data.completed = completed;
    data.uncompleted = uncompleted;
    data.percentage = percentage;
    data.total = todos.length;
    totalTasks = todos.length;
  }

  console.log("Print Data: " + data);
  let searchedTodos = [];

  if (!searchValue.length >= 1) {
    searchedTodos = todos;
  } else {
    searchedTodos = todos.filter((todo) => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText);
    });
  }



  const completeTodos = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text);
    const newTodos = [...todos];
    newTodos[todoIndex].completed = true;
    saveTodos(newTodos);
  };

  const unCompleteTodos = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text);
    const newTodos = [...todos];
    newTodos[todoIndex].completed = false;
    saveTodos(newTodos);
  };

  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text);
    const newTodos = [...todos];

    MySwal.fire({
      title: (
        <p>
          Are you sure to delete: <br />{" "}
          <span className="text-danger">{text}</span>
        </p>
      ),
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        // setTodos(newTodos);
        newTodos.splice(todoIndex, 1);
        saveTodos(newTodos);
        MySwal.fire("Deleted!", "", "success");
      }
    });
  };

  return (
    <AppUI
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      dataForCounter={data}
      searchedTodos={searchedTodos}
      completeTodos={completeTodos}
      unCompleteTodos={unCompleteTodos}
      deleteTodo={deleteTodo}
      totalTasks={totalTasks}
    />
  );
}

export default App;
