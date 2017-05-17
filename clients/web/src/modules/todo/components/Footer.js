import React from "react";

import * as Constants from "../constants";
import FilterLink from "../containers/FilterLink";

const Footer = () => (
  <p>
    Show:
    {" "}
    <FilterLink filter={ Constants.SHOW_ALL }>
      All
    </FilterLink>
    {", "}
    <FilterLink filter={ Constants.SHOW_ACTIVE }>
      Active
    </FilterLink>
    {", "}
    <FilterLink filter={ Constants.SHOW_COMPLETED }>
      Completed
    </FilterLink>
  </p>
)

export default Footer;
