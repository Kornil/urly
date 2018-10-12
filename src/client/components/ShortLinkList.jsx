import React from "react";
import PropTypes from "prop-types";
import styled from "react-emotion";

const StyledShortLinkList = styled.div`
  margin: 40px 0;
`;

const ShortLinkList = ({ cachedUrls }) => (
  <StyledShortLinkList>
    {Object.keys(cachedUrls).map(key => (
      <p key={key}>
        <a href={cachedUrls[key].url} rel="noopener noreferrer" target="_blank">
          {key} - {cachedUrls[key].url}
        </a>
      </p>
    ))}
  </StyledShortLinkList>
);

ShortLinkList.propTypes = {
  cachedUrls: PropTypes.objectOf(PropTypes.shape({ url: PropTypes.string }))
    .isRequired
};

export default ShortLinkList;
