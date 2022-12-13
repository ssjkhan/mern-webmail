import { responsiveFontSizes } from "@material-ui/core";
import axios, { AxiosResponse } from "axios";
import config from "./config";

export class Worker {
	async listMailboxes(): Promise<IMailbox[]> {
		const resp: AxiosResponse = await axios.get(
			`${config.serverAddress}/mailboxes`
		);

		return resp.data;
	}

	async listMessages(mailbox: string): Promise<IMessage[]> {
		const resp: AxiosResponse = await axios.get(
			`${config.serverAddress}/mailboxes/${mailbox}`
		);
		return resp.data;
	}

	async getMessageBody(id: string, mailbox: string): Promise<string> {
		const resp: AxiosResponse = await axios.get(
			`${config.serverAddress}/messages/${mailbox}/${id}`
		);
		return resp.data;
	}

	async deleteMessage(id: string, mailbox: string): Promise<void> {
		await axios.delete(`${config.serverAddress}/messages/${mailbox}/${id}`);
	}
}

export interface IMailbox {
	name: string;
	path: string;
}

export interface IMessage {
	id: string;
	date: string;
	from: string;
	subject: string;
	body?: string;
}
