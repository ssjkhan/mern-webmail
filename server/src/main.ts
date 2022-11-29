import path from "path";
import express, { Express, NextFunction, Request, Response } from "express";
import { serverInfo } from "./ServerInfo";
import * as IMAP from "./IMAP";
import * as SMTP from "./SMTP";
import * as Contacts from "./contacts";
import { IContact } from "./contacts";

// Initialize App
const app: Express = express();

// Middleware for parsing request bodies
app.use(express.json());

// static path way
app.use("/", express.static(path.join(__dirname, "../../client/dist")));

app.use(function (
	inRequest: Request,
	inResponse: Response,
	inNext: NextFunction
) {
	inResponse.header("Access-Control-Allow-Origin", "*");
	inResponse.header("Access-Control-Allow-Methods", "GET,POST,DELETE,OPTIONS");
	inResponse.header(
		"Access-Control-Allow-Headers",
		"Origin,X-Requested-With,Content-Type,Accept"
	);
	inNext();
});
