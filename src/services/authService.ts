export const getToken = (key = "accessToken") => localStorage.getItem(key);

export const setToken = (
	accessToken: string,
	refreshToken: string,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	user?: any
) => {
	localStorage.setItem("accessToken", accessToken);
	localStorage.setItem("refreshToken", refreshToken);
	localStorage.setItem("user", JSON.stringify(user));
};

export const clearToken = () => {
	localStorage.removeItem("accessToken");
	localStorage.removeItem("refreshToken");
	localStorage.removeItem("user");
};
