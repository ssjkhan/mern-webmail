export class Worker {
	constructor(serverInfo: any) {}
	listMailboxes(...args: any) {
		return [];
	}
	listMessages(...args: any) {
		return [];
	}
	getMessageBody(...args: any) {
		return "";
	}
	deleteMessage(...args: any) {}
}
export class IMailbox {}
export class IMessage {}
