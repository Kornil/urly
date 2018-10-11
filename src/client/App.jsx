import React, { Component } from "react";

import {
  Form,
  ErrorDialog,
  StyledPageLayout,
  ShortLinkList
} from "./components";

class App extends Component {
  state = {
    cachedUrls: {},
    error: ""
  };

  componentDidMount() {
    this.fetchShortLinks();
  }

  fetchShortLinks = async () => {
    try {
      const response = await fetch("/v1/links");

      const data = await response.json();

      this.setState({
        cachedUrls: data
      });
    } catch (error) {
      this.setState({
        error
      });
    }
  };

  render() {
    const { cachedUrls, error } = this.state;

    const hasCache = cachedUrls && Object.keys(cachedUrls).length > 0;
    return (
      <StyledPageLayout>
        <div>
          <h1>Url Shortener</h1>
          <Form fetchShortLinks={this.fetchShortLinks} />
          {error && <ErrorDialog error={JSON.stringify(error)} />}
          {hasCache && <ShortLinkList cachedUrls={cachedUrls} />}
        </div>
      </StyledPageLayout>
    );
  }
}

export default App;
