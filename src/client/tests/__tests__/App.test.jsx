import React from "react";
import ReactDOM from "react-dom";
import fetchMock from "fetch-mock";
import { shallow } from "enzyme";

import App from "./../../App";

fetchMock.get(
  `*`,
  JSON.stringify({
    payload: {
      MDL7g1YiM: {
        url: "http://google.com"
      }
    }
  })
);

const initialData = {
  error: "",
  status: null,
  cachedUrls: {}
};

const successData = {
  error: "",
  status: "success",
  cachedUrls: {
    payload: {
      MDL7g1YiM: {
        url: "http://google.com"
      }
    }
  }
};

const errorData = {
  error: "there was an error",
  status: "error",
  cachedUrls: {}
};


describe("<App />", () => {
  afterEach(() => {
    ReactDOM.unmountComponentAtNode(document);
  });

  it("mount with default state", () => {
    const wrapper = shallow(<App />);

    expect(wrapper.state()).toEqual(initialData);
  });

  it("fetches shortLinks", async () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();

    await instance.fetchShortLinks();

    expect(wrapper.state()).toEqual(successData);
  });

  it("fails to fetch shortLinks", async () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();

    try {
      await instance.fetchShortLinks();
    } catch (e) {
      expect(wrapper.state()).toEqual(errorData);
    }
  });
});
