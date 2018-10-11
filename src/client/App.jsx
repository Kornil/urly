import React, { Component } from "react";

import { Form } from "./components";

class App extends Component {
  state = {
    cachedUrls: {},
    status: null,
    error: "",
  };

  componentDidMount() {
    this.fetchShortLinks();
  }

  fetchShortLinks = async () => {
    try {
      const response = await fetch("/v1/links");

      const data = await response.json();

        this.setState({
          cachedUrls: data,
          status: "success"
        });
    } catch (error) {
      this.setState({
        status: "error",
        error
      });
    }
  };

  render() {
    const {
      cachedUrls,
      status,
      error,
    } = this.state;

    const hasCache = cachedUrls && Object.keys(cachedUrls).length > 0;
    return (
      <main className="container">
        <div>
          <Form fetchShortLinks={this.fetchShortLinks} />
          {error && (
            <ErrorDialog error={error} />
          )}
          {hasCache &&
            Object.keys(cachedUrls).map(key => (
              <a
                key={key}
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
