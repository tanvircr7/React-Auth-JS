import React from "react";
import { FaTrash } from "react-icons/fa";

const DeleteEmployee = ({ empId, handleDelete }) => {
	return (
		<>
			<button aria-label="Delete Employee" onClick={() => handleDelete(empId)}>
				<FaTrash />
			</button>
		</>
	);
};

export default DeleteEmployee;
