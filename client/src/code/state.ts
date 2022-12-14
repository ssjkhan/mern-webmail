import * as IMAP from "./IMAP";
import * as SMTP from "./SMTP";
import * as Contacts from "./Contacts";
import config from "./config";
import { ThreeDRotationSharp } from "@material-ui/icons";

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

		setCurrentMailbox: function (path: string): void {
			this.setState({
				currentView: "welcome",
				currentMailbox: path,
			});
			this.state.getMessages(path);
		}.bind(parentComponent),

		getMessages: async function (path: string): Promise<void> {
			this.state.showHidePleaseWait(true);
			const imapWorker: IMAP.Worker = new IMAP.Worker();
			const messages: IMAP.IMessage[] = await imapWorker.listMessages(path);
			this.state.showHidePleaseWait(false);
			this.state.clearMessages();
			messages.forEach((message) => {
				this.state.addMessageToList(message);
			});
		}.bind(parentComponent),

		clearMessages: function (): void {
			this.setState({
				messages: [],
			});
		}.bind(parentComponent),

		addMessageToList: function (message: IMAP.IMessage): void {
			const cl = this.state.messages.slice(0);
			cl.push({
				id: message.id,
				date: message.date,
				from: message.from,
				subject: message.subject,
			});
			this.setState({
				messages: cl,
			});
		},

		showContact: function (id: string, name: string, email: string): void {
			this.setState({
				currentView: "contact",
				contactID: id,
				contactName: name,
				contactEmail: email,
			});
		}.bind(parentComponent),

		fieldChangeHandler: function (event: any): void {
			if (event.target.id === "contactName" && event.target.value.length > 16) {
				return;
			}
			this.setState({
				[event.target.id]: event.target.value,
			});
		}.bind(parentComponent),

		saveContact: async function (): Promise<void> {
			const cl = this.state.contacts.slice(0);
			this.state.showHidePleaseWait(true);
			const contactsWorker: Contacts.Worker = new Contacts.Worker();
			const contact: Contacts.IContact = await contactsWorker.addContact({
				name: this.state.contactName,
				email: this.state.contactEmail,
			});
			this.state.showHidePleaseWait(false);
			cl.push(contact);
			this.setState({
				contacts: cl,
				contactID: null,
				contactName: "",
				contactEmail: "",
			});
		}.bind(parentComponent),

		deleteContact: async function (): Promise<void> {
			this.state.showHidePleaseWait(true);
			const contactsWorker: Contacts.Worker = new Contacts.Worker();
			await contactsWorker.deleteContact(this.state.contactID);
			this.state.showHidePleaseWait(false);
			const cl = this.state.contacts.filter(
				(inElement) => inElement._id != this.state.contactID
			);
			this.setState({
				contacts: cl,
				contactID: null,
				contactName: "",
				contactEmail: "",
			});
		}.bind(parentComponent),

		showMessage: async function (message: IMAP.IMessage): Promise<void> {
			this.state.showHidePleaseWait(true);
			const imapWorker: IMAP.Worker = new IMAP.Worker();
			const messageBody: String = await imapWorker.getMessageBody(
				message.id,
				this.state.currentMailbox
			);
			this.state.showHidePleaseWait(false);
			this.setState({
				currentView: "message",
				messageFrom: message.from,
				messageTo: "",
				messageSubject: message.subject,
				messageBody: messageBody,
			});
		}.bind(parentComponent),

		sendMessage: async function (): Promise<void> {
			this.state.showHidePleaseWait(true);
			const smtpWorker: SMTP.Worker = new SMTP.Worker();
			await smtpWorker.sendMessage(
				this.state.messageTo,
				this.state.messageFrom,
				this.state.messageSubject,
				this.state.messageBody
			);
			this.state.showHidePleaseWait(false);
			this.setState({ currentView: "welcome" });
		}.bind(parentComponent),

		deleteMessage: async function (): Promise<void> {
			this.state.showHidePleaseWait(true);
			const imapWorker: IMAP.Worker = new IMAP.Worker();
			await imapWorker.deleteMessage(
				this.state.messageID,
				this.state.currentMailbox
			);
			this.state.showHidePleaseWait(false);
			const cl = this.state.messages.filter((el) => {
				el.id! + this.state.messageID;
			});
			this.setState({
				messages: cl,
				currentView: "welcome",
			});
		}.bind(parentComponent),
	};
}
