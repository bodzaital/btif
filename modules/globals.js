import { $, $$, LoadFile, ResolveSceneByName, ResolveThemeByName, NullConditional, CreateElementByDescriptor, NullishCoalescingOp, Log } from "./utils.js";

class Data {
	constructor()
	{
		this.store = {};
		this.subscribers = {};
		this.currentScene = null;
	}

	/**
	 * Creates a connection between an element's property and a key in the store.
	 * @param {Node} element The element to subscribe.
	 * @param {string} property The element's property to update.
	 * @param {string} key The key to subscribe to.
	 */
	Subscribe(element, property, key) {
		if (this.subscribers[key] == null) {
			Log(`[ DS ] ${key} was added to the subscribers of ${element.id}`);
			this.subscribers[key] = [];
		}
		
		Log(`[ DS ] ${element.id}'s ${property} was added to ${key}`);
		this.subscribers[key].push({
			element: element,
			property: property
		});
		
		this.Update(key);
	}

	/**
	 * Adds a new key to the store without updating subscribed elements.
	 * @param {string} key 
	 * @param {*} value 
	 */
	Add(key, value) {
		this.store[key] = value;
	}

	/**
	 * Updates all subscribed elements.
	 * @param {string} key The key.
	 */
	Update(key) {
		Log("[ DS ] Updating...");
		
		this.subscribers[key].forEach(e => {
			e.element[e.property] = this.store[key] ?? "";
		});
	}

	/**
	 * Adds a key to a new value and updates all subscribed elements.
	 * @param {string} key The key to update.
	 * @param {*} value The new value.
	 */
	Set(key, value) {
		this.Add(key, value);
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

let data = new Data();

export { data };