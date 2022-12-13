import React from "react";
import { createState } from "../state";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

import Toolbar from "./Toolbar";
import Mailbox from "./Mailbox";
import WelcomeView from "./WelcomeView";
import MessageList from "./MessageList";
import MessageView from "./MessageView";
import ContactList from "./ContactList";
import ContactView from "./ContactView";

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
				<div className="toolbar">{/* <Toolbar state={this.state} /> */}</div>
				<div className="mailboxList">{/* <MailboxList state={this.state}/> */}</div>
				<div className="centerArea">
					<div className="messageList">
						{/* <MessageList state={this.state}></MessageList> */}
					</div>
					<div className="centerViews">
						{this.state.currentView === "welcome" && <WelcomeView />}
						{
							(this.state.currentView === "message" ||
								this.state.currentView === "compose") &&
								true // <MessageView state={this.state} />
						}
						{
							(this.state.currentView === "contact" ||
								this.state.currentView === "contatAdd") &&
								true // <ContactView state={this.state} />
						}
					</div>
					<div className="contactList">
						{/* <ContactList state={this.state}/> */}
					</div>
				</div>
			</div>
		);
	}
}

export default BaseLayout;
