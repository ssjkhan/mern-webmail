const IMAPServer = require("hoodiecrow-imap");
const SMTPServer = require("smtp-server").SMTPServer;
import { serverInfo } from "./ServerInfo";

export const imapServer = IMAPServer({
	plugins: ["LOGINDISABLED", "STARTTLS"],
});

imapServer.listen(serverInfo.imap.port);

console.log("imap server is up on: " + serverInfo.imap.port);

export const smtpServer = new SMTPServer();
smtpServer.listen(serverInfo.smtp.port);

console.log("smtp server is up on: " + serverInfo.smtp.port);
