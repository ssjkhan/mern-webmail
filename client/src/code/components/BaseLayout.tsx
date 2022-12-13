import React from "react";
import { createState } from "../state";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

class BaseLayout extends React.Component {
	state = createState(this);
	render() {
		return (
			<div className="appContainer">
				<Dialog
					open={this.state.pleaseWaitVisible}
					disableBackdropClick={true}
					disableEscapeKeyDown={true}
					transitionDuration={0}
				>
					<DialogTitle style={{ textAlign: "center" }}>Please Wait</DialogTitle>
					<DialogContent>
						<DialogContentText> ... Contacting Server ...</DialogContentText>
					</DialogContent>
				</Dialog>
			</div>
		);
	}
}

export default BaseLayout;
