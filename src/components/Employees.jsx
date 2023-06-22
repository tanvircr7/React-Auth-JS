import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import AddEmployee from "./AddEmployee";
import DeleteEmployee from "./DeleteEmployee";

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
				// isMounted && setEmployees(response.data);
			} catch (err) {
				console.error(err);
				console.log("ERROR CAUGHT");
				// navigate("/login");
				// // navigate("/login", { state: { from: location }, replace: true });
			}
		};

		addEmployee();

		return () => {
			controller.abort();
		};
	};

	const handleDelete = () => {
		const controller = new AbortController();

		const deleteEmployee = async (empId) => {
			try {
				const response = await axiosPrivate.delete("/employees", empId, {
					signal: controller.signal,
				});
				console.log(
					`${response.data} <- reponse data for ADD EMPLOYEE TRY block`
				);
				// isMounted && setEmployees(response.data);
			} catch (err) {
				console.error(err);
				console.log("ERROR CAUGHT");
				// navigate("/login");
				// // navigate("/login", { state: { from: location }, replace: true });
			}
		};

		deleteEmployee(empId);

		return () => {
			controller.abort();
		};
	};

	return (
		<>
			<button id="sort-desc" onClick={() => sortEmployees(0)}>
				Sort Descending
			</button>
			<button id="sort-asc" onClick={() => sortEmployees(1)}>
				Sort Ascending
			</button>
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
					<ul>
						{employees.map((employee, i) => (
							<li key={i}>
								{employee?.firstname}
								{employee?.lastname}--------
								{employee?.salary}
								<DeleteEmployee
									empId={employee?.id}
									handleDelete={handleDelete}
								/>
							</li>
						))}
					</ul>
				) : (
					<p>No employees to display</p>
				)}
			</article>
		</>
	);
};

export default Employees;
