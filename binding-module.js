/*
*   BindingJS by Bandroid
*       is a tools for easier element selector
*       without any get element or query selector.
*       this is for native browser page and work
*       only in static way, it means any dynamic
*       element added to the page will not be updated
*       in the generated binding elements (currently).
*       in the future i will add a way to dynamicly
*       add or update binding elements that is just rendered
*       programmatically.
*
*   BindingJS v1.0.0
*   parameters:
*       - Binding(parent: string) example is new Binding("#myElement")
*       - WindowBinding() example is new WindowBinding()
*/

`
example:
- index.html
    <script type="module">
      import { Binding } from 'https://cdn.jsdelivr.net/gh/BanDroid/BindingJS@1.0.0/binding-module.js';
      new Binding();
      binding.title.innerText = "Hello World";
    </script>
    <h1 id="title"></h1>
`;

/*  Binding
*	this binding is using binding object to retrieve the elements.
*	example:
*		binding.title.innerText = "this is a title"
*/
class Binding {
	#parent = ""
	#data = {}
	constructor(parent = "body") {
		this.#parent = parent.toString()
		this.update()
		this.bind()
	}
	update() {
		Array.from(document.querySelectorAll(`${this.#parent} [id]`))
		.forEach(item => {
			let words = item.id.split(/[-_:.]/g)
			let validate = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join("")
			this.#data[validate.charAt(0).toLowerCase() + validate.slice(1)] = item
		})
	}
	bind() {
		Object.seal(this)
		window.binding = this.#data
	}
}

/*  WindowBinding
*	this binding is using window object to store the elements.
*	example:
*		title.innerText = "this is title"
*	CAUTION:
*		using window for binding elements could override some window properties.
*		make sure you dont naming your element id's with some available window properties,
*		like document, location, navigator, etc.
*
*/ 
class WindowBinding {
	constructor() {
		Array.from(document.querySelectorAll("[id]"))
		.forEach(item => {
			let words = item.id.split(/[-_:.]/g)
			let validate = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join("")
			window[validate.charAt(0).toLowerCase() + validate.slice(1)] = item
		})
	}
}

// this is only work if your script type is module
export {
	Binding,
	WindowBinding
}