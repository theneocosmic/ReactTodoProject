import React from "react";
import "./AppUI.css";
import { TodoSearch } from "../TodoSearch/TodoSearch";
import { CreateTodoButton } from "../TodoButton/CreateTodoButton";
import { TodoList } from "../TodoList/TodoList";
import { TodoItem } from "../TodoItem/TodoItem";
import { TodoHeader } from "../TodoHeader/TodoHeader";
import { TodoLeftSide } from "../TodoLeftSide/TodoLeftSide";
import {TodosLoading} from "../TodosLoading";
import {TodosError} from "../TodosError";
import EmptyTodos from "../EmptyTodos";
import { TodoContext } from "../../../context/TodoContext";
import { useContext } from "react";
import { Modal } from "../Modal";
import { TodoForm } from "../TodoForm";

function AppUI() {

    const {loading,
      error,
      totalTasks,
      searchedTodos,
      completeTodos,
      unCompleteTodos,
      deleteTodo,
      dataForCounter,
      openModal
} = useContext(TodoContext);

  return (
    <React.Fragment>
      <TodoHeader />
      <div className="row">
        <div className="col-lg-4 col-md-4">
        <TodoLeftSide
          totalTasks={totalTasks}
          dataCounter={dataForCounter}
        />
        </div>
        <div className="col-lg-8 col-md-8">
          <TodoSearch
            // searchValue={props.searchValue}
            // setSearchValue={props.setSearchValue}
            // isSearchDisabled={props.IsSearchDisabled}
          />
            <TodoList
            totalTasks={totalTasks}
          >
            {loading &&
            <>
            <TodosLoading/>
            <TodosLoading/>
            <TodosLoading/>
            </>
            }
            {error && <TodosError/>}
            {(!loading && searchedTodos.length == 0) && <EmptyTodos/>}

            {searchedTodos
              ? searchedTodos.map((todo) => (
                  <TodoItem
                    key={todo.text}
                    text={todo.text}
                    completed={todo.completed}
                    onComplete={() =>
                      completeTodos ? completeTodos(todo.text) : ""
                    }
                    unComplete={() =>
                      unCompleteTodos
                        ? unCompleteTodos(todo.text)
                        : ""
                    }
                    onDelete={() =>
                      deleteTodo ? deleteTodo(todo.text) : ""
                    }
                  />
                ))
              : ""}
          </TodoList>
          <CreateTodoButton />
          {openModal && (
           <Modal>
               <TodoForm />
            </Modal>
          )}
        </div>
      </div>
    </React.Fragment>
  );
}

export { AppUI };
