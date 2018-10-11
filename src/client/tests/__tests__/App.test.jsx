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

fetchMock.post(
  `*`,
  JSON.stringify({
    hash: "someHash"
  })
);

const defaultData = {
  value: "",
  isFormSent: false,
  shortLink: ""
};

const initialData = {
  error: "",
  status: null,
  cachedUrls: {},
  ...defaultData
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
  },
  ...defaultData
};

const errorData = {
  error: "there was an error",
  status: "error",
  cachedUrls: {},
  ...defaultData
};

const successSubmitData = {
  cachedUrls: { payload: { MDL7g1YiM: { url: "http://google.com" } } },
  error: "",
  isFormSent: true,
  shortLink: "someHash",
  status: "success",
  value: "http://google.com"
};

describe("<App />", () => {
  const event = { preventDefault: () => {} };

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

  it("should respond to change event and change state", () => {
    const wrapper = shallow(<App />);
    wrapper.find("#shortLinkInput").simulate("change", {
      target: { name: "shortLinkInput", value: "hello" }
    });

    expect(wrapper.state("value")).toEqual("hello");
  });

  it("should request a new shortlink", async () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();
    wrapper.setState({ value: "http://google.com" });

    await instance.handleSubmit(event);

    expect(wrapper.state()).toEqual(successSubmitData);
  });

  it("should reset all state", async () => {
    const wrapper = shallow(<App />);
    const instance = wrapper.instance();

    await instance.resetForm();

    expect(wrapper.state()).toEqual(initialData);
  });  
});
