import React from "react";
import List from "@material-ui/core/List";
import { ListItem } from "material-ui";
import { ListItemAvatar } from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import { Person } from "@material-ui/icons";

const ContactList = ({ state }) => {
	<List>
		{state.contacts.map((val) => {
			return (
				<ListItem
					key={val}
					button
					onClick={() => {
						state.showContact(val._id, val.name, val.email);
					}}
				>
					<ListItemAvatar>
						<Avatar>
							<Person />
						</Avatar>
					</ListItemAvatar>
				</ListItem>
			);
		})}
	</List>;
};
export default ContactList;
