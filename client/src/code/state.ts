import * as IMAP from "./IMAP";
import * as SMTP from "./SMTP";
import * as Contacts from "./Contacts";
import config from "./config";

export function createState(parentComponent) {
	return {
		pleaseWaitVisible: false,
		contacts: [],
		mailboxes: [],
		messages: [],
		currentView: "welcome",
		currentMailbox: null,
		messageID: null,
		mesasgeDate: null,
		messageFrom: null,
		messageTo: null,
		messageSubject: null,
		messageBody: null,
		contactID: null,
		contactName: null,
		contactEmail: null,

		showHidePleaseWait: function (inVisible: boolean): void {
			this.setState({ pleaseWaitVisible: inVisible });
		}.bind(parentComponent),

		addMailboxToList: function (inMailbox: IMAP.IMailbox): void {
			const cl: IMAP.IMailbox[] = this.state.mailboxes.slice(0);
			cl.push(inMailbox);
			this.setState({ mailboxes: cl });
		}.bind(parentComponent),

		addContactToList: function (inContact: Contacts.IContact): void {
			const cl = this.state.contacts.slice(0);
			cl.push({
				_id: inContact._id,
				name: inContact.name,
				email: inContact.email,
			});
			this.setState({ contacts: cl });
		}.bind(parentComponent),

		showComposeMessage: function (type: string): void {
			switch (type) {
				case "new":
					this.setState({
						currentView: "compose",
						messageTo: "",
						messageSubject: "",
						messageBosdy: "",
						messageFrom: config.userEmail,
					});
					break;

				case "reply":
					this.setState({
						messageTo: this.state.messageFrom,
						messageSubject: `Re: ${this.state.messageSubject}`,
						messageBody: `\n\n---- Original Message ----\n\n${this.state.messageBody}`,
						messageFrom: config.userEmail,
					});

					break;

				case "contact":
					this.setState({
						currentView: "compose",
						messageTo: this.state.contactEmail,
						messageSubject: "",
						messageBody: "",
						messageFrom: config.userEmail,
					});
					break;
			}
		}.bind(parentComponent),

		showAddContact: function (): void {
			this.setState({
				currentView: "contactAdd",
				contactID: null,
				contactname: "",
				contactName: "",
			});
		}.bind(parentComponent),
	};
}
