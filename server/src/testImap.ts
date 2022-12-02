const hoodiecrow = require("hoodiecrow-imap");
import { serverInfo } from "./ServerInfo";

const imapServer = hoodiecrow({
	plugins: ["LOGINDISABLED", "STARTTLS"],
});
imapServer.listen(serverInfo.imap.port);
console.log("imap server is up on: " + serverInfo.imap.port);
export default imapServer;
