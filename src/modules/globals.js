class Data {
	constructor()
	{
		this.store = {};
		this.currentScene = null;
	}

	Set(key, value) {
		this.store[key] = value;
	}

	Get(key) {
		if (this.store.hasOwnProperty(key)) {
			return this.store[key];
		} else {
			return null;
		}
	}
}

var data = new Data();