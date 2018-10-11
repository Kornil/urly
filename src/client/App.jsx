import React, { Component } from "react";

class App extends Component {
  state = {
    value: "",
  };

  handleChange = event => {
    this.setState({
      value: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { value } = this.state;

    const response = await fetch("/v1/links", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify({ url: value })
    });
    const data = await response.json();

    console.log(data);
  };

  render() {
    const { value } = this.state;
    return (
      <main className="container">
        <div>
          <form onSubmit={this.handleSubmit} method="post" action="/v1/links">
            <input onChange={this.handleChange} type="text" value={value} />
          </form>
        </div>
      </main>
    );
  }
}

export default App;
