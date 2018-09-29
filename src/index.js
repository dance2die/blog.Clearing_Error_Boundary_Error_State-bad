import React, { Component } from "react";
import ReactDOM from "react-dom";

import "./styles.css";

// Based on Brian Vaughn's SandBox
// https://codesandbox.io/s/k9znx9kj9r

class ErrorBoundary extends React.Component {
  state = { error: null };

  componentDidCatch(error, info) {
    this.setState({ error });
  }

  render() {
    const { error } = this.state;
    if (error !== null) {
      return (
        <div>
          <h1>Error occured in the child component!</h1>
          <p>{error.message}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

const BadComponent = () =>
  Date.now() % 2 === 0 ? <div>Bad Component</div> : new Error("Random error!");

class App extends Component {
  errorBoundary = React.createRef();

  clearErrorBoundary = () =>
    this.errorBoundary.current.setState({ error: null });

  render() {
    return (
      <div className="App">
        <button onClick={() => this.forceUpdate()}>Re-render</button>
        <button onClick={this.clearErrorBoundary}>Clear ErrorBoundary</button>

        <ErrorBoundary ref={this.errorBoundary}>
          <BadComponent />
        </ErrorBoundary>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
