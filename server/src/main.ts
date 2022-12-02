import path from "path";
import express, { Express, NextFunction, Request, Response } from "express";
import { PORT, serverInfo } from "./ServerInfo";
import * as IMAP from "./IMAP";
import * as SMTP from "./SMTP";
import * as Contacts from "./contacts";
import { IContact } from "./contacts";
import * as testServers from "./testServers";

// Initialize Test Imap server

const testImapServer = testServers.imapServer;
const testSmtpServer = testServers.smtpServer;

// Initialize App
const app: Express = express();

// Middleware for parsing request bodies
app.use(express.json());

// static path way
app.use("/", express.static(path.join(__dirname, "../../client/dist")));

app.use(function (req: Request, resp: Response, inNext: NextFunction) {
	resp.header("Access-Control-Allow-Origin", "*");
	resp.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
	resp.header(
		"Access-Control-Allow-Headers",
		"Origin,X-Requested-With,Content-Type,Accept"
	);
	inNext();
});

app.get("/", (req, resp) => {
	resp.send("Server is up\n");
});

app.get("/mailboxes", async (req: Request, resp: Response) => {
	try {
		const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
		const mailboxes: IMAP.IMailbox[] = await imapWorker.listMailboxes();
		resp.json(mailboxes);
	} catch (error) {
		console.log(error);
		resp.send("error");
	}
});

app.get("/mailboxes/:mailbox", async (req: Request, resp: Response) => {
	try {
		const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
		const messages: IMAP.IMessage[] = await imapWorker.listMessages({
			mailbox: req.params.mailbox,
		});
	} catch (error) {
		resp.send("error");
	}
});

app.get("/messages/:mailbox/:id", async (req: Request, resp: Response) => {
	try {
		const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
		const messageBody: string | undefined = await imapWorker.getMessageBody({
			mailbox: req.params.mailbox,
			id: parseInt(req.params.id, 10),
		});
	} catch (error) {
		resp.send("error");
	}
});

app.delete("/messages/:mailbox/:id", async (req: Request, resp: Response) => {
	try {
		const imapWorker: IMAP.Worker = new IMAP.Worker(serverInfo);
		await imapWorker.deleteMessage({
			mailbox: req.params.mailbox,
			id: parseInt(req.params.id, 10),
		});
	} catch (error) {
		resp.send("error");
	}
});

app.post("/messages", async (req: Request, resp: Response) => {
	try {
		const smtpWorker: SMTP.Worker = new SMTP.Worker(serverInfo);
		await smtpWorker.sendMessage(req.body);
		resp.send("ok");
	} catch (error) {
		resp.send("error");
	}
});

app.get("/contacts", async (req: Request, resp: Response) => {
	try {
		const contactsWorker: Contacts.Worker = new Contacts.Worker();
		const contacts: IContact[] = await contactsWorker.listContacts();
		resp.json(contacts);
	} catch (error) {
		resp.send("error");
	}
});

app.post("/contacts", async (req: Request, resp: Response) => {
	try {
		const contactsWorker: Contacts.Worker = new Contacts.Worker();
		const contact: IContact = await contactsWorker.addContact(req.body);
		resp.json(contact);
	} catch (inError) {
		resp.send("error");
	}
});

app.delete("/contacts/:id", async (req: Request, resp: Response) => {
	try {
		const contactsWorker: Contacts.Worker = new Contacts.Worker();
		await contactsWorker.deleteContact(req.params.id);
		resp.send("ok");
	} catch (inError) {
		resp.send("error");
	}
});

app.listen(PORT);
