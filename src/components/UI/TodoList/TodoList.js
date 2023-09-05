import React from "react";
import "./TodoList.css";

function TodoList(props) {
  // if (props.totalTasks > 0) {
    return (
      <section>
        <h5 className="text-uppercase mt-4 text-secondary">Today's tasks</h5>
        <ul>{props.children}</ul>
      </section>
    );
  // }
  //  else {
  //   return (
  //     <section>
  //       <h5 className="text-uppercase mt-4 text-secondary">Today's tasks</h5>
  //       <h5>You haven't added tasks</h5>
  //     </section>
  //   );
  // }
}

export { TodoList };
