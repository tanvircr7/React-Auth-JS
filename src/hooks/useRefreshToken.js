import React from "react";
import useAuth from "./useAuth";
import axios from "../api/axios";

const useRefreshToken = () => {
	const { setAuth } = useAuth();

	const refresh = async () => {
		console.log("inside refresh");
		const response = await axios.get("/refresh", {
			withCredentials: true,
		});
		console.log("using setAuth");
		setAuth((prev) => {
			console.log(JSON.stringify(prev));
			console.log(response.data.accessToken);
			return { ...prev, accessToken: response.data.accessToken };
		});
		return response.data.accessToken;
	};

	return refresh;
};

export default useRefreshToken;
