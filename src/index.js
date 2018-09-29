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
    if (error) {
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
  state = { errorBoundaryKey: 0 };

  clearErrorBoundary = () =>
    this.setState(prevState => ({
      errorBoundaryKey: prevState.errorBoundaryKey + 1
    }));

  render() {
    const { errorBoundaryKey } = this.state;

    return (
      <div className="App">
        <button onClick={() => this.forceUpdate()}>Re-render</button>
        <button onClick={this.clearErrorBoundary}>Clear ErrorBoundary</button>

        <ErrorBoundary key={errorBoundaryKey}>
          <BadComponent />
        </ErrorBoundary>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
