import React from "react";
import { FaPlus } from "react-icons/fa";
import { useRef } from "react";

const AddEmployee = ({
	newFirstname,
	setNewFirstname,
	newLastname,
	setNewLastname,
	newSalary,
	setNewSalary,
	handleSubmit,
}) => {
	const inputRef = useRef();

	return (
		<form className="addForm" onSubmit={handleSubmit}>
			<label htmlFor="addEmployee">Add Employee</label>
			<input
				ref={inputRef}
				id="addFirstname"
				type="text"
				placeholder="Add Firstname"
				required
				value={newFirstname}
				onChange={(e) => setNewFirstname(e.target.value)}
			/>
			<input
				id="addLastname"
				type="text"
				placeholder="Add Lastname"
				required
				value={newLastname}
				onChange={(e) => setNewLastname(e.target.value)}
			/>
			<input
				id="addSalary"
				type="text"
				placeholder="Add Salary"
				required
				value={newSalary}
				onChange={(e) => setNewSalary(e.target.value)}
			/>
			<button
				type="submit"
				aria-label="Add Employee"
				onClick={() => inputRef.current.focus()}
			>
				<FaPlus />
			</button>
		</form>
	);
};

export default AddEmployee;
