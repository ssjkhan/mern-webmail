import axios, { AxiosResponse } from "axios";
import config from "./config";

export class Worker {
	async listContacts(): Promise<IContact[]> {
		const resp: AxiosResponse = await axios.get(
			`${config.serverAddress}/contacts`
		);

		return resp.data;
	}

	async addContact(contact: IContact): Promise<IContact> {
		const resp: AxiosResponse = await axios.post(
			`${config.serverAddress}/contacts`,
			contact
		);
		return resp.data;
	}

	async deleteContact(id: any): Promise<void> {
		await axios.delete(`${config.serverAddress}/contacts/${id}`);
	}
}

export interface IContact {
	_id?;
	name: string;
	email: string;
}
export default Worker;
