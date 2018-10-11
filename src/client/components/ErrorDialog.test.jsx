import { shallow } from "enzyme";
import React from "react";

import ErrorDialog from "./ErrorDialog";

it("it renders", () => {
  const wrapper = shallow(<ErrorDialog error="oh no!" />);
  expect(wrapper).toMatchSnapshot();
});
