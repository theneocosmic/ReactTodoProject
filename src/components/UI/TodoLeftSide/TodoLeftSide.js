import React from "react";
import "./TodoLeftSide.css";
import { TodoCounter } from "../TodoCounter/TodoCounter";
import { Player } from "@lottiefiles/react-lottie-player";

class TodoLeftSide extends React.Component {
  constructor(props) {
    super(props);
    this.player = React.createRef();
  }
  render() {
    const doPlay = () => {
      this.player.current.play();
    };
    if (this.props.totalTasks > 0) {
      return (
          <div className="row">
            <div className="col-lg-12">
              <TodoCounter
              />
            </div>
            <div className="col-lg-12 container-img">
              <Player
                hover={() => {
                  doPlay();
                }}
                ref={this.player}
                autoplay={false}
                loop={true}
                controls={true}
                src="https://assets1.lottiefiles.com/packages/lf20_Au6z826BEy.json"
                style={{ height: "300px", width: "300px" }}
              ></Player>
            </div>
          </div>
      );
    } else {
      return (
        <div className="col-lg-4">
          <div className="row">
            <div className="col-lg-12">
              {console.log("valor a pasar" + this.props.data)}
              <TodoCounter data={this.props.data} />
            </div>
            <div className="col-lg-12 container-img">
              <Player
                hover={() => {
                  doPlay();
                }}
                ref={this.player}
                autoplay={false}
                loop={true}
                controls={true}
                src="https://assets1.lottiefiles.com/packages/lf20_Au6z826BEy.json"
                style={{ height: "300px", width: "300px" }}
              ></Player>
            </div>
          </div>
        </div>
      );
    }
  }
}

export { TodoLeftSide };

