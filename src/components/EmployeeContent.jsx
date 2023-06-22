import React from "react";
import DeleteEmployee from "./DeleteEmployee";
import RowItem from "./RowItem";

const EmployeeContent = ({ employees, handleDelete }) => {
	return (
		<>
			{employees.map((employee) => (
				<div>
					<RowItem
						firstname={employee?.firstname}
						lastname={employee?.lastname}
						salary={employee?.salary}
						id={employee?._id}
						handleDelete={handleDelete}
					/>
				</div>
			))}
		</>
	);
};

export default EmployeeContent;
