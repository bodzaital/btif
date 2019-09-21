class Globals {
	constructor()
	{
		this.store = {};
	}

	Set(key, value) {
		this.store[key] = value;
	}

	Get(key) {
		if (this.store.hasOwnProperty(key)) {
			return this.store[key];
		}
	}
}

var globals = new Globals();