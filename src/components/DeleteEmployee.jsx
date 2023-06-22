import React from "react";
import { FaTrash, FaTrashAlt } from "react-icons/fa";

const DeleteEmployee = ({ empId, handleDelete }) => {
	return (
		<>
			<button aria-label="Delete Employee" onClick={() => handleDelete(empId)}>
				<FaTrashAlt />
			</button>
		</>
	);
};

export default DeleteEmployee;
