import React from "react";
import useLocalStorage from '../../hooks/useLocalStorage';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const MySwal = withReactContent(Swal);

const TodoContext = React.createContext();



const TodoProvider = ({children}) => {
  //   const defaultTodos = [
  //   { text: 'Cortar cebolla', completed: true },
  //   { text: 'Tomar el Curso de Intro a React.js', completed: false },
  //   { text: 'Llorar con la Llorona', completed: false },
  //   { text: 'LALALALALA', completed: false },
  //   { text: 'Usar estados derivados', completed: true },
  // ];
  const defaultTodos=[];
  const {
    item: todos,
    saveItem: saveTodos,
    loading,
    error
  } = useLocalStorage('TODOS_V1',defaultTodos);
  console.log("Print TODOS: " + todos);
    
    const [searchValue, setSearchValue] = React.useState("");
    const [IsSearchDisabled, setIsSearchDisabled] = React.useState(true);
    const [openModal,setOpenModal] = React.useState(false);

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

    const addTodo = (text) =>{
      const updatedTodos = [...todos];
      updatedTodos.push({"text":text,"completed":false});
      saveTodos(updatedTodos);
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
          newTodos.splice(todoIndex, 1);
          saveTodos(newTodos);
          MySwal.fire("Deleted!", "", "success");
        }
      });
    };
  


        return(
            <TodoContext.Provider value={{
                  loading,
      error,
      searchValue,
      setSearchValue,
      dataForCounter:data,
      searchedTodos,
      completeTodos,
      unCompleteTodos,
      deleteTodo,
      totalTasks,
      openModal,
      setOpenModal,
      addTodo
            }}>
                {children}
            </TodoContext.Provider>
            );
};

export {TodoContext, TodoProvider};