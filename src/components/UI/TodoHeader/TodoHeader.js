import React from "react";
import "./TodoHeader.css";

function TodoHeader() {
  return (
    <div className="row">
      <div className="col-lg-10 col-10">
        <p className="text-whatsup">What's up, Dave!</p>
      </div>
      <div className="col-lg-2 col-2 text-right"></div>
    </div>
  );
}

export { TodoHeader };
