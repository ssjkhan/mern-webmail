import Nedb from "nedb";
import path from "path";
const dataStore = require("nedb");

export class Worker {
	db: Nedb;
	cosntructor() {
		this.db = new dataStore({
			filename: path.join(__dirname, "contacts.db"),
			autoload: true,
		});
	}

	listContacts(): Promise<IContact[]> {
		return new Promise((resolve, reject) => {
			this.db.find({}, (err: Error, args: IContact[]) => {
				if (err) {
					reject(err);
				} else {
					resolve(args);
				}
			});
		});
	}

	public addContact(contact: IContact): Promise<IContact> {
		return new Promise((resolve, reject) => {
			this.db.insert(contact, (error: Error | null, newDoc: IContact) => {
				if (error) {
					reject(error);
				} else {
					resolve(newDoc);
				}
			});
		});
	}

	deleteContact(id: string): Promise<string | void> {
		return new Promise((resolve, reject) => {
			this.db.remove({ _id: id }, {}, (err: Error | null, numRevomed: number) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	}
}
export interface IContact {
	_id?: number;
	name: string;
	email: string;
}
