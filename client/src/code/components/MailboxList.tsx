import React from "react";

import List from "@material-ui/core/List";
import Chip from "@material-ui/core/Chip";

const MailboxList = ({ state }) => {
	return (
		<List>
			{state.mailboxes.map((val) => {
				return (
					<Chip
						label={`${val.name}`}
						onClick={() => state.setCurrentMailbox(val.path)}
						style={{ width: 128, marginBottom: 10 }}
						color={state.currentMailbox === val.path ? "secondary" : "primary"}
					></Chip>
				);
			})}
		</List>
	);
};
