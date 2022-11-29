import Mail from "nodemailer/lib/mailer";
import * as nodemailer from "nodemailer";
import { SendMailOptions, SentMessageInfo } from "nodemailer";
import { IServerInfo } from "./ServerInfo";

export class Worker {
	serverInfo: IServerInfo;

	constructor(serverInfo_: IServerInfo) {
		this.serverInfo = serverInfo_;
	}
	sendMessage(options: SendMailOptions): Promise<string> {
		return new Promise((resolve, reject) => {
			const transport: Mail = nodemailer.createTransport(this.serverInfo.smtp);
			transport.sendMail(options, (err: Error | null, info: SentMessageInfo) => {
				if (err) {
					reject(err);
				} else {
					resolve(err);
				}
			});
		});
	}
}
