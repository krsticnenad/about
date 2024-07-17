import anime from "animejs";
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';


export default class Navigation {
    constructor() {
        this.trigger = document.getElementById('navigationTrigger');
        if (!this.trigger) return;

        this.ANIMATION_DURATION = 800;

        this.isOpen = false;
        this.navigation = document.querySelector('.c-navigation');
        this.triggerOpenText = this.trigger.querySelector('.c-navigation-trigger__label--open');
        this.triggerCloseText = this.trigger.querySelector('.c-navigation-trigger__label--close');
        this.triggerTopPath = this.trigger.querySelector('.top');
        this.triggerBottomPath = this.trigger.querySelector('.bottom');

        this.bindListeners();
        this.addEventListeners();
    }

    static init() {
        new Navigation();
    }

    bindListeners() {
        ['toggleNav'].forEach(f => {
            this[f] = this[f].bind(this);
        })
    }
n
    addEventListeners() {
        this.trigger.addEventListener('click', this.toggleNav);
        window.addEventListener('scroll', () => {
            // Todo add a function
            if (window.scrollY === 0) {
                document.querySelector('.c-global-header').classList.remove('c-global-header--scrolled');
            } else {
                document.querySelector('.c-global-header').classList.add('c-global-header--scrolled');
            }
        })
    }

    toggleNav() {
        document.body.classList.toggle('navigation-open');
        this.toggleTriggerIcon();
        this.toggleNavigation();
        this.isOpen = !this.isOpen;
    }

    async toggleTriggerIcon() {
        if (this.isOpen) {
            await anime({
                targets: this.triggerCloseText,
                top: ["50%", "70%"],
                opacity: 0,
                easing: "linear",
                duration: 400,
            }).finished;
            await anime({
                targets: this.triggerOpenText,
                top: ["20%", "50%"],
                opacity: 1,
                easing: "linear",
                duration: 400,
            }).finished;
        } else {
            await anime({
                targets: this.triggerOpenText,
                top: ["50%", "20%"],
                opacity: 0,
                easing: "linear",
                duration: 400,
            }).finished;
            await anime({
                targets: this.triggerCloseText,
                top: ["70%", "50%"],
                opacity: 1,
                easing: "linear",
                duration: 400,
            }).finished;
        }
    }

    async toggleNavigation() {
        if (this.isOpen) {
            await anime({
                targets: this.navigation,
                opacity: 0,
                duration: 400,
                easing: 'linear'
            }).finished;
            this.navigation.classList.remove('c-navigation--shown');
            enableBodyScroll(this.navigation);
        } else {
            await anime({
                targets: this.navigation,
                opacity: 1,
                duration: 400,
                easing: 'linear'
            }).finished;
            this.navigation.classList.add('c-navigation--shown');
            disableBodyScroll(this.navigation);
        }
    }

}