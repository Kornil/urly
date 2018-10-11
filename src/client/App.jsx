import React, { Component } from "react";

class App extends Component {
  state = {
    value: "",
    cachedUrls: {}
  };

  componentDidMount() {
    this.fetchShortLinks();
  }

  fetchShortLinks = async () => {
    const response = await fetch("/v1/links");

    const data = await response.json();
    this.setState({
      cachedUrls: JSON.parse(data)
    });
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

    this.fetchShortLinks();
  };

  render() {
    const { value, cachedUrls } = this.state;
    return (
      <main className="container">
        <div>
          <form onSubmit={this.handleSubmit} method="post" action="/v1/links">
            <input onChange={this.handleChange} type="text" value={value} />
          </form>
          {Object.keys(cachedUrls).map(key => (
            <a
              href={cachedUrls[key].url}
              rel="noopener noreferrer"
              target="_blank"
            >
              {key} - {cachedUrls[key].url}
            </a>
          ))}
        </div>
      </main>
    );
  }
}

export default App;
