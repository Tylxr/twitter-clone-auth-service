import axios from "axios";

export default axios.create({
	baseURL: process.env.CORE_BASE_URL,

	headers: {
		Authorization: `Bearer ${process.env.CORE_SERVER_TOKEN}`,
	},
});
