

export const LocalStorageService = {

	setLocalStorage: function (key: string, data: any) {
		localStorage.setItem(key, JSON.stringify(data));
	},
	getLocalStorage: function (key: string) {
		let value = localStorage.getItem(key);
		return value ? JSON.parse(value) : null;
	},
	clearLocalStorage: function (key: string) {
		localStorage.removeItem(key);
	},
};
