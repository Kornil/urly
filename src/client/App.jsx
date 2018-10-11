import React, { Component } from "react";

class App extends Component {
  state = {
    value: "",
    cachedUrls: {},
    status: null,
    error: null
  };

  componentDidMount() {
    this.fetchShortLinks();
  }

  fetchShortLinks = async () => {
    try {
      const response = await fetch("/v1/links");

      const data = await response.json();
      this.setState({
        cachedUrls: JSON.parse(data),
        status: "success"
      });
    } catch (error) {
      this.setState({
        status: "error",
        error
      });
    }
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
    const { value, cachedUrls, status, error } = this.state;
    return (
      <main className="container">
        <div>
          <form onSubmit={this.handleSubmit} method="post" action="/v1/links">
            <input onChange={this.handleChange} type="text" value={value} />
          </form>
          {status === "error" && (
            <p>
              There was an error fetching your shortlinks, please refresh the
              page: {error}
            </p>
          )}
          {status === "success" && Object.keys(cachedUrls).map(key => (
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
