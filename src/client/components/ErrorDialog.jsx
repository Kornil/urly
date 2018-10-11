import React from "react";
import PropTypes from "prop-types";

const ErrorDialog = ({ error }) => (
  <p>
    There was an error fetching your shortlinks, please refresh the page:{" "}
    {error}
  </p>
);

ErrorDialog.propTypes = {
  error: PropTypes.string.isRequired
};

export default ErrorDialog;
