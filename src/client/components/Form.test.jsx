import React from "react";
import ReactDOM from "react-dom";
import fetchMock from "fetch-mock";
import { shallow } from "enzyme";

import Form from "./Form";

const initialData = {
  shortLink: "",
  isFormSent: false,
  value: ""
};

const successSubmitData = {
  isFormSent: true,
  shortLink: "someHash",
  value: "http://google.com"
};

fetchMock.post(
  `*`,
  JSON.stringify({
    hash: "someHash"
  })
);

describe("<Form />", () => {
  afterEach(() => {
    ReactDOM.unmountComponentAtNode(document);
  });

  const event = { preventDefault: () => {} };

  it("should respond to change event and change state", () => {
    const wrapper = shallow(<Form />);
    wrapper.find("#shortLinkInput").simulate("change", {
      target: { name: "shortLinkInput", value: "hello" }
    });

    expect(wrapper.state("value")).toEqual("hello");
  });

  it("should request a new shortlink", async () => {
    const wrapper = shallow(<Form fetchShortLinks={() => {}} />);
    const instance = wrapper.instance();
    wrapper.setState({ value: "http://google.com" });

    await instance.handleSubmit(event);

    expect(wrapper.state()).toEqual(successSubmitData);
  });

  it("should reset all state", async () => {
    const wrapper = shallow(<Form />);
    const instance = wrapper.instance();

    await instance.resetForm();

    expect(wrapper.state()).toEqual(initialData);
  });
});
