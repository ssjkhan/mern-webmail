const hoodiecrow = require("hoodiecrow-imap");
import { serverInfo } from "./ServerInfo";

const imapServer = hoodiecrow();
imapServer.listen(serverInfo.imap.port);

console.log("Top level statements executed");
