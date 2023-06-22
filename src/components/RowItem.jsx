import React from "react";
import DeleteEmployee from "./DeleteEmployee";

const RowItem = ({ firstname, lastname, salary, id, handleDelete }) => {
	return (
		<>
			<div id="row-item">
				<text>{firstname}</text>
				<text>{lastname}</text>
				<text>{salary}</text>
				<DeleteEmployee empId={id} handleDelete={handleDelete} />
			</div>
		</>
	);
};

export default RowItem;
