import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import AddEmployee from "./AddEmployee";
import DeleteEmployee from "./DeleteEmployee";
import EmployeeContent from "./EmployeeContent";
import { DataGrid } from "@mui/x-data-grid";
import { FaTrashAlt } from "react-icons/fa";

const renderDetailsButton = (params) => {
	return (
		<strong>
			<button
				variant="contained"
				color="red"
				size="small"
				style={{ marginLeft: 16 }}
				onClick={() => {
					handleDelete(params.row.id);
				}}
			>
				<FaTrashAlt />
			</button>
		</strong>
	);
};

const columns = [
	{ field: "id", headerName: "ID", width: 70 },
	{ field: "firstName", headerName: "Firstname", type: "string", width: 130 },
	{ field: "lastName", headerName: "Lastname", type: "string", width: 130 },
	{
		field: "salary",
		headerName: "Salary",
		type: "string",
		width: 90,
	},
	{
		field: "fullName",
		headerName: "Full name",
		description: "This column has a value getter and is not sortable.",
		sortable: false,
		width: 160,
		valueGetter: (params) =>
			`${params.row.firstName || ""} ${params.row.lastName || ""}`,
	},
	{
		field: "delete",
		headerName: "Options",
		width: 150,
		renderCell: renderDetailsButton,
		disableClickEventBubbling: true,
	},
];

var rows = [];

const Employees = () => {
	const [employees, setEmployees] = useState();
	const [newFirstname, setNewFirstname] = useState("");
	const [newLastname, setNewLastname] = useState("");
	const [newSalary, setNewSalary] = useState("");
	const axiosPrivate = useAxiosPrivate();
	const navigate = useNavigate();
	const location = useLocation();

	useEffect(() => {
		let isMounted = true;
		const controller = new AbortController();

		const getEmployees = async () => {
			try {
				const response = await axiosPrivate.get("/employees", {
					signal: controller.signal,
				});
				console.log(`${response.data} <- reponse data for try block`);
				isMounted && setEmployees(response.data);
			} catch (err) {
				console.error(err);
				console.log("ERROR CAUGHT");
				// navigate("/login");
				// // navigate("/login", { state: { from: location }, replace: true });
			}
		};

		getEmployees();

		return () => {
			isMounted = false;
			controller.abort();
		};
	}, []);

	const refreshEmployeeList = () => {
		const controller = new AbortController();

		const getEmployees = async () => {
			try {
				const response = await axiosPrivate.get("/employees", {
					signal: controller.signal,
				});
				console.log(`${response.data} <- reponse data for try block`);
				setEmployees(response.data);
				makeRow();
			} catch (err) {
				console.error(err);
				console.log("ERROR CAUGHT");
				// navigate("/login");
				// // navigate("/login", { state: { from: location }, replace: true });
			}
		};

		getEmployees();

		return () => {
			controller.abort();
		};
	};

	const sortEmployees = () => {
		console.log("WOHO");
	};

	// adding new employee

	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("SUBMIT");

		const formData = {
			firstname: newFirstname,
			lastname: newLastname,
			salary: newSalary,
		};

		const controller = new AbortController();

		const addEmployee = async () => {
			try {
				const response = await axiosPrivate.post("/employees", formData, {
					signal: controller.signal,
				});
				console.log(
					`${response.data} <- reponse data for ADD EMPLOYEE TRY block`
				);
				// setEmployees(response.data);
				makeRow();
			} catch (err) {
				console.error(err);
				console.log("ERROR CAUGHT");
			}
		};

		addEmployee();
		refreshEmployeeList();
		setNewFirstname("");
		setNewLastname("");
		setNewSalary("");

		return () => {
			controller.abort();
		};
	};

	const handleDelete = (empId) => {
		const controller = new AbortController();
		console.log(empId);
		const id = empId;
		// const deleteId = { id: empId };

		const deleteEmployee = async () => {
			console.log(id);
			try {
				console.log(id);
				const response = await axiosPrivate.delete("/employees", {
					data: { id }, // why not deleteId?
					signal: controller.signal,
				});
				console.log(
					`${response.data} <- reponse data for DELETE EMPLOYEE TRY block`
				);
				// setEmployees(response.data);
				makeRow();
			} catch (err) {
				console.error(err);
				console.log("ERROR CAUGHT");
			}
		};

		deleteEmployee();
		refreshEmployeeList();

		return () => {
			controller.abort();
		};
	};

	const makeRow = () => {
		console.log(`how employees look like ->${JSON.stringify(employees)}`);
		var updatedRows = employees.map((employee) => {
			console.log(employee._id);
			return {
				id: employee._id,
				firstName: employee.firstname,
				lastName: employee.lastname,
				salary: employee.salary,
			};
		});
		console.log(rows);
		rows = updatedRows;
		console.log(rows);
	};

	return (
		<>
			<AddEmployee
				newFirstname={newFirstname}
				setNewFirstname={setNewFirstname}
				newLastname={newLastname}
				setNewLastname={setNewLastname}
				newSalary={newSalary}
				setNewSalary={setNewSalary}
				handleSubmit={handleSubmit}
			/>
			<article>
				<h2>Employees List</h2>
				{employees?.length ? (
					<div style={{ height: 400, width: "100vw" }}>
						<DataGrid
							rows={employees.map((employee) => {
								return {
									id: employee._id,
									firstName: employee.firstname,
									lastName: employee.lastname,
									salary: employee.salary,
								};
							})}
							columns={columns}
							initialState={{
								pagination: {
									paginationModel: { page: 0, pageSize: 5 },
								},
							}}
							pageSizeOptions={[5, 10]}
						/>
					</div>
				) : (
					<p>No employees to display</p>
				)}
			</article>
		</>
	);
};

export default Employees;
