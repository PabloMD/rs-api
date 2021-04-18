import React from "react";

export default class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: parseInt(props.start),
      initial: parseInt(props.start),
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();

    this.setState({
      initial: parseInt(this.state.initialInput),
      counter: parseInt(this.state.initialInput),
      initialInput: ''
    });
  };

  render() {
    return (
      <div>
        <h1>
          counter: <span className="counts">{this.state.counter}</span>
        </h1>
        <div>
          <button
            className="increment"
            onClick={() => this.setState({ counter: this.state.counter + 1 })}
          >
            +
          </button>
          <button
            className="decrement"
            onClick={() => this.setState({ counter: this.state.counter - 1 })}
          >
            -
          </button>
          <button
            className="reset"
            onClick={() => {
              this.setState({
                counter: this.state.initial,
              });
            }}
          >
            Reset
          </button>
        </div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input
              type="number"
              className="initialInput"
              value={this.state.initialInput}
              onChange={(e) => this.setState({ initialInput: e.target.value })}
            ></input>
            <button type="submit">Zmień</button>
          </form>
        </div>
      </div>
    );
  }
}

Counter.defaultProps = {
  start: 0,
};
