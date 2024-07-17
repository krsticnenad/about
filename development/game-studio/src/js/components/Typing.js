import Typed from "typed.js/lib/typed";

export default class Typing {
    constructor() {
        this.typingText = document.querySelector('[data-typing]');

        if (!this.typingText) return;

        this.typingSpan = this.typingText.querySelector('span');
        this.items = JSON.parse(this.typingText.dataset.typing);

        new Typed(this.typingSpan, {
            strings: this.items,
            typeSpeed: 40,
            backSpeed: 40,
            cursorChar: '',
            loop: true,
            backDelay: 2000,
        });


    }


    static init() {
        new Typing();
    }
}