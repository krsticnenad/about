import anime from 'animejs/lib/anime.es.js';

export default class Skill {
    constructor(selector, config) {
        this.triggers = typeof selector === 'string'
            ? document.querySelectorAll(selector)
            : selector;

        this.config = {
            navActiveClass: 'c-tabs__item--active',
            tabActiveClass: 'c-tabs__cards--active',
        };

        if (this.triggers && this.triggers.length) {
            this.triggers = Array.from(this.triggers);
            this.setup();
        }
    }

    static init(selector, config) {
        new Skill(selector, config);
    }

    setup() {
        this.isAnimating = false;

        this.getTabs();
        this.setActiveElements();
        this.bindListeners();
        this.addEventListeners();
    }

    getTabs() {
        this.tabs = {};
        this.triggers.forEach(t => {
            this.tabs[t.dataset.skill] = document.getElementById(t.dataset.skill);
        });
    }
    // Todo if you click fast enough you will select multiple
    async setActiveElement(elem) {
        if (this.isAnimating) return;
        if (this.activeTrigger) this.activeTrigger.classList.remove(this.config.navActiveClass);
        if (this.activeTab) {
            this.isAnimating = true;
            await anime({
                targets: this.tabs[this.activeTab],
                translateY: 30,
                opacity: 0,
                duration: 400,
                easing: 'easeInOutQuad',
            }).finished;
            this.tabs[this.activeTab].classList.remove(this.config.tabActiveClass);
        }

        const skill = elem.dataset.skill;


        elem.classList.add(this.config.navActiveClass);
        this.tabs[skill].classList.add(this.config.tabActiveClass);
        await anime({
            targets: this.tabs[skill],
            translateY: [30, 0],
            opacity: 1,
            duration: 400,
            easing: 'easeInOutQuad',
        }).finished;

        this.activeTrigger = elem;
        this.activeTab = skill;
        this.isAnimating = false;
    }

    setActiveElements() {
        this.activeTrigger = null;

        this.triggers.forEach(t => {
           if (t.classList.contains(this.config.navActiveClass)) {
               this.setActiveElement(t);
           }
        });

        if (!this.activeTrigger) {
            this.setActiveElement(this.triggers[0]);
        }
    }

    bindListeners() {
        ['onNavClick'].forEach(f => {
            this[f] = this[f].bind(this);
        })
    }

    bindEvent(elem, event, callback, params) {
        elem.addEventListener(event, () => callback(params))
    }

    addEventListeners() {
        this.triggers.forEach(t => this.bindEvent(t, 'click', this.onNavClick, t));
    }

    /**
     *
     * @param {Node} trigger
     */
    onNavClick(trigger) {
        if (this.activeTrigger === trigger) return;
        this.setActiveElement(trigger);
    }
}