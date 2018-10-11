import { shallow } from "enzyme";
import React from "react";

import ShortLinkList from "./ShortLinkList";

it("it renders", () => {
  const wrapper = shallow(
    <ShortLinkList
      cachedUrls={{
        MDL7g1YiM: {
          url: "http://google.com"
        }
      }}
    />
  );
  expect(wrapper).toMatchSnapshot();
});
