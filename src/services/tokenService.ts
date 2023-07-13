export const TokenService = {
	getToken: function () {
		return localStorage.getItem('adminToken');
	},
	getRefreshToken: function () {
		return localStorage.getItem('adminRtoken');
	},
	setToken: function (token: string) {
		return localStorage.setItem('adminToken', token);
	},
	setRefreshToken: function (rtoken: string) {
		return localStorage.setItem('adminRtoken', rtoken);
	},
	clearTokens: function () {
		localStorage.removeItem('adminRtoken');
		localStorage.removeItem('adminRtoken');
		return;
	}
};
