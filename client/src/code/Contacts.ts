import axios, { AxiosResponse } from "axios";
import config from "./config";

export class Worker {
	async listContacts(): Promise<IContact[]> {
		const resp: AxiosResponse = await axios.get(
			`${config.serverAddress}/contacts`
		);

		return resp.data;
	}
}

export interface IContact {
	_id?;
	name: string;
	email: string;
}
export default Worker;
