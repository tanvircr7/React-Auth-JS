import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";
import useAuth from "../hooks/useAuth";
import { v4 as uuidv4 } from "uuid";
// import { ID_ROLES } from "../config/roles";

const ID_ROLES = {
	2001: "User",
	1984: "Editor",
	5150: "Admin",
};

const NumberList = ({ numbers }) => (
	<ul style={{ listStyle: "none", padding: 0 }}>
		{numbers.map((number, index) => (
			<li key={index}>{ID_ROLES[number]}</li>
		))}
	</ul>
);

const Home = () => {
	const { auth, setAuth } = useAuth();
	const navigate = useNavigate();

	const logout = async () => {
		// if used in more components, this should be in context
		// axios to /logout endpoint
		setAuth({});
		navigate("/linkpage");
	};

	return (
		<>
			<div className="name">Username: {auth?.user ? auth.user : "---"}</div>
			<div className="list">
				<NumberList numbers={auth.roles} />
			</div>
			<section>
				<h1>Home</h1>
				<br />
				<p>You are logged in!</p>
				<br />
				<Link to="/editor">Go to the Editor page</Link>
				<br />
				<Link to="/admin">Go to the Admin page</Link>
				<br />
				<Link to="/lounge">Go to the Lounge</Link>
				<br />
				<Link to="/linkpage">Go to the link page</Link>
				<br />
				<Link to="/employees">Go to the Employee page</Link>
				<div className="flexGrow">
					<button onClick={logout}>Sign Out</button>
				</div>
			</section>
		</>
	);
};

export default Home;
