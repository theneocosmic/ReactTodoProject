import React from "react";
import "./TodoCounter.css";
import CircleProgressBar from "../CircleProgressBar/CircleProgressBar";

function TodoCounter(props) {
  if (props.totalTasks > 0) {
    return (
      <section>
        <h5 className="text-uppercase mt-4 text-secondary">Progress</h5>
        <div className="row">
          <div className="col-lg-12 text-center">
            <CircleProgressBar
              percentage={props.data.percentage}
              circleWidth="200"
            />
          </div>
          <div className="col-lg-12 text-center">
            <div>
              <span className="text-dark">{props.data.total} Tasks</span> |
              <span className="text-completed">
                {" "}
                {props.data.completed} completed
              </span>{" "}
              |
              <span className="text-pending">
                {" "}
                {props.data.uncompleted} pending
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export { TodoCounter };
