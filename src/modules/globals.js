class Data {
	constructor()
	{
		this.store = {};
		this.subscribers = {};
		this.currentScene = null;
	}

	/**
	 * Subscribes to a key in the store. When the key's value updates, also updates the subscribed element's property.
	 * @param {Node} element The element to subscribe.
	 * @param {string} property The element's property to update.
	 * @param {string} key The key to subscribe to.
	 */
	Subscribe(element, property, key) {
		if (this.subscribers[key] == null) {
			this.subscribers[key] = [];
		}

		console.clear();

		console.log(" - Key to update", key);
		console.log(" - Element to add", element);
		console.log(" - Property to add", property);

		this.subscribers[key].forEach((e) => {
			console.log(" ? Checking element", e.element);
			console.log(e.element == element);
			console.log(" ? Checking property", e.property);
			console.log(e.property == property);
		});
		
		this.subscribers[key].push({
			element: element,
			property: property
		});

		console.log(" + Added element", element);
		console.log(" + Added property", property);
		
		this.Update(key);
	}

	/**
	 * Updates all subscribed elements.
	 * @param {string} key The key.
	 */
	Update(key) {
		this.subscribers[key].forEach(e => {
			e.element[e.property] = this.store[key] ?? "";
		});
	}

	/**
	 * Sets the key to a new value and updates all subscribed elements.
	 * @param {string} key The key to update.
	 * @param {*} value The new value.
	 */
	Set(key, value) {
		this.store[key] = value;
		this.Update(key);
	}

	/**
	 * Retrieves the value of the key if it exists, or null if it doesn't.
	 * @param {string} key The key.
	 */
	Get(key) {
		if (this.store.hasOwnProperty(key)) {
			return this.store[key];
		} else {
			return null;
		}
	}
}

var data = new Data();