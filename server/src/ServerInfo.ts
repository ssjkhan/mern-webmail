import path from "path";
import fs from "fs";

export interface IServerInfo {
	smtp: {
		host: string;
		port: number;
		auth: { user: string; pass: string };
	};
	imap: {
		host: string;
		port: number;
		auth: { user: string; pass: string };
	};
}

const rawInfo: string = fs.readFileSync(
	path.join(__dirname, "../serverInfo.json"),
	"utf-8"
);
export let serverInfo: IServerInfo;
serverInfo = JSON.parse(rawInfo);

export const PORT = 8080;
