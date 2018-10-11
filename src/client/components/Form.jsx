import React, { Component } from "react";
import PropTypes from "prop-types";

class Form extends Component {
  state = {
    value: "",
    isFormSent: false,
    shortLink: ""
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
    const { hash } = await response.json();

    this.setState({
      isFormSent: true,
      shortLink: hash
    });

    this.props.fetchShortLinks();
  };

  resetForm = () => {
    this.setState({
      shortLink: "",
      isFormSent: false,
      value: "",
    });
  };

  render() {
    const { value, isFormSent, shortLink } = this.state;

    return !isFormSent ? (
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
          <a rel="noopener noreferrer" target="_blank" href={value}>
            {shortLink}
          </a>
        </h2>
        <button onClick={this.resetForm}>Go back</button>
      </>
    );
  }
}

Form.propTypes = {
  fetchShortLinks: PropTypes.func.isRequired,
};

export default Form;
