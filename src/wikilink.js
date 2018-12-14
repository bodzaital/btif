console.log("Wikilink testing...");

class Link {
	constructor(raw, ref, txt)	{
		this.raw = raw;
		this.ref = ref;
		this.txt = txt;
	}

	 Render() {
		return `<a href="${this.ref}.html">${this.txt}</a>`;
	}
}

links = [];

function CatchLinks(text) {
	let r = /\[\[([\w\s\/]+)(\|([\w\s\/]+))?\]\]/g
	let m = r.exec(text);
	let i = 0;
	while (m != null) {
		// console.log(m);
		let raw = m[0];
		let ref = m[1];
		let txt;
		if (typeof(m[3]) !== undefined) {
			txt = m[1];
		} else {
			txt = m[3];
		}
		links[i] = new Link(raw, ref, txt);
		document.body.innerHtml = document.body.innerText.replace(links[i].raw, links[i].Render());
		m = r.exec(text);
		i++;
	}
}

CatchLinks(document.body.innerText);