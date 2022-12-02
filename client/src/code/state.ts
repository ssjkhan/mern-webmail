import { FlashAuto } from "@material-ui/icons";

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
	};
}
