import React from "react";
import { useContext } from "react";
import "./TodoCounter.css";
import CircleProgressBar from "../CircleProgressBar/CircleProgressBar";
import { TodoContext } from "../../../context/TodoContext";

function TodoCounter(
  // props
  ) {
   const  {
    dataForCounter:data,
    totalTasks
   } = useContext(TodoContext);

  if (totalTasks > 0) {
    return (
      <section>
        <h5 className="text-uppercase mt-4 text-secondary">Progress</h5>
        <div className="row">
          <div className="col-lg-12 text-center">
            <CircleProgressBar
              percentage={data.percentage}
              circleWidth="200"
            />
          </div>
          <div className="col-lg-12 text-center">
            <div>
              <span className="text-dark">{data.total} Tasks</span> |
              <span className="text-completed">
                {" "}
                {data.completed} completed
              </span>{" "}
              |
              <span className="text-pending">
                {" "}
                {data.uncompleted} pending
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export { TodoCounter };
