import React from "react";
import "./AppUI.css";
import { TodoSearch } from "../TodoSearch/TodoSearch";
import { CreateTodoButton } from "../TodoButton/CreateTodoButton";
import { TodoList } from "../TodoList/TodoList";
import { TodoItem } from "../TodoItem/TodoItem";
import { TodoHeader } from "../TodoHeader/TodoHeader";
import { TodoLeftSide } from "../TodoLeftSide/TodoLeftSide";

function AppUI(props) {
  return (
    <React.Fragment>
      <TodoHeader />
      <div className="row">
        <div className="col-lg-4 col-md-4">
        <TodoLeftSide
          totalTasks={props.totalTasks}
          dataCounter={props.dataForCounter}
        />
        </div>
        <div className="col-lg-8 col-md-8">
          <TodoSearch
            searchValue={props.searchValue}
            setSearchValue={props.setSearchValue}
            isSearchDisabled={props.IsSearchDisabled}
          />
          <TodoList
            totalTasks={props.totalTasks}
          >
            {props.searchedTodos
              ? props.searchedTodos.map((todo) => (
                  <TodoItem
                    key={todo.text}
                    text={todo.text}
                    completed={todo.completed}
                    onComplete={() =>
                      props.completeTodos ? props.completeTodos(todo.text) : ""
                    }
                    unComplete={() =>
                      props.unCompleteTodos
                        ? props.unCompleteTodos(todo.text)
                        : ""
                    }
                    onDelete={() =>
                      props.deleteTodo ? props.deleteTodo(todo.text) : ""
                    }
                  />
                ))
              : ""}
          </TodoList>
          <CreateTodoButton />
        </div>
      </div>
    </React.Fragment>
  );
}

export { AppUI };
