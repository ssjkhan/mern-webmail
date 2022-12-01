const ImapClient = require("emailjs-imap-client");
import { ParsedMail } from "mailparser";
import { simpleParser } from "mailparser";
import { IServerInfo } from "./ServerInfo";

export interface ICallOptions {
	mailbox: string;
	id?: number;
}

export interface IMessage {
	id: string;
	date: string;
	from: string;
	subject: string;
	body?: string;
}

export interface IMailbox {
	name: string;
	path: string;
}

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
export class Worker {
	serverInfo: IServerInfo;

	constructor(serverInfo_: any) {
		this.serverInfo = serverInfo_;
	}

	async connectToServer(): Promise<any> {
		console.log("Trying to connect to Server");
		const client: any = new ImapClient.default(
			this.serverInfo.imap.host,
			this.serverInfo.imap.port,
			{ auth: this.serverInfo.imap.auth }
		);
		// const client: any = new ImapClient.default("localhost", 8080);

		client.logLevel = client.LOG_LEVEL_NONE;
		client.onerror = (err: Error) => {
			console.log("IMAP.Worker.listmailboxes(): Connection Error", err);
		};
		client
			.connect()
			.then((res: any) => {
				console.log("Connected to server");
			})
			.catch(console.log("Couldn't connect"));
		return client;
	}

	async listMailboxes(): Promise<IMailbox[]> {
		const client: any = await this.connectToServer();
		const mailboxes: any = await client.listMailboxes();

		await client.close();

		const populatedMailboxes: IMailbox[] = [];
		const mailboxPopulator: Function = (malboxArr: any[]): void => {
			malboxArr.forEach((mailbox: any) => {
				populatedMailboxes.push({
					name: mailbox.name,
					path: mailbox.path,
				});
				mailboxPopulator(mailbox.children);
			});
		};
		mailboxPopulator(mailboxes.children);
		return populatedMailboxes;
	}

	async listMessages(callOptions: ICallOptions): Promise<IMessage[]> {
		const client: any = await this.connectToServer();
		const mailbox: any = await client.selectMailbox(callOptions.mailbox);

		if (mailbox.exists == 0) {
			await client.close();
			return [];
		}

		const messages: any[] = await client.listMessages(
			callOptions.mailbox,
			"1:*",
			["uid", "envelopte"]
		);

		await client.close();
		const populatedMessages: IMessage[] = [];
		messages.forEach((msg: any) => {
			populatedMessages.push({
				id: msg.uid,
				date: msg.envelope.date,
				from: msg.envelope.from[0].adderss,
				subject: msg.envelope.subject,
			});
		});

		return populatedMessages;
	}

	async getMessageBody(
		inCallOptions: ICallOptions
	): Promise<string | undefined> {
		const client: any = await this.connectToServer();
		const messages: any[] = await client.listMessages(
			inCallOptions.mailbox,
			inCallOptions.id,
			["body[]"],
			{ byUid: true }
		);
		const parsed: ParsedMail = await simpleParser(messages[0]["body[]"]);
		await client.close();
		return parsed.text;
	}

	async deleteMessage(callOptions: ICallOptions): Promise<any> {
		const client: any = await this.connectToServer();
		await client.deleteMessages(callOptions.mailbox, callOptions.id, {
			byUid: true,
		});

		await client.close();
	}
}
