import React, { Component } from "react";

class App extends Component {
  state = {
    value: "",
    cachedUrls: {},
    status: null,
    error: null,
    isFormSent: false,
    shortLink: ""
  };

  componentDidMount() {
    this.fetchShortLinks();
  }

  fetchShortLinks = async () => {
    try {
      const response = await fetch("/v1/links");

      const { payload } = await response.json();
      this.setState({
        cachedUrls: payload,
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
    const { payload } = await response.json();

    this.setState({
      isFormSent: true,
      shortLink: payload.hash
    });

    this.fetchShortLinks();
  };

  resetForm = () => {
    this.setState({
      shortLink: "",
      isFormSent: false,
      value: "",
      status: null,
      error: ""
    });
  };

  render() {
    const {
      value,
      cachedUrls,
      status,
      error,
      isFormSent,
      shortLink
    } = this.state;
    return (
      <main className="container">
        <div>
          {!isFormSent ? (
            <form onSubmit={this.handleSubmit} method="post" action="/v1/links">
              <input
                onChange={this.handleChange}
                id="shortLinkInput"
                name="shortLinkInput"
                type="text"
                value={value}
              />
            </form>
          ) : (
            <>
              <h2>
                Your shortlink is{" "}
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  href={cachedUrls.shortLink}
                >
                  {shortLink}
                </a>
              </h2>
              <button onClick={this.resetForm}>Go back</button>
            </>
          )}

          {status === "error" && (
            <p>
              There was an error fetching your shortlinks, please refresh the
              page: {error.message}
            </p>
          )}

          {status === "success" &&
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
