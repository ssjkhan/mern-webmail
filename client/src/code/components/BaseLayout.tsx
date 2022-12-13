import React from "react";
import { createState } from "../state";

class BaseLayout extends React.Component {
	state = createState(this);
	render() {
		return <div className="appContainer"></div>;
	}
}

export default BaseLayout;
