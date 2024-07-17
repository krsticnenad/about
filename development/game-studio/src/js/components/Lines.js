export default class Lines {
    constructor() {
        this.lines = [
            { // Our work Hero
                selector: '.our-work-header',
                lines: [
                    {
                        width: 320,
                        rotation: -45,
                        position: {
                            bottom: -60,
                            right: 0,
                        },
                        offset: 'translateY(-50%)',
                    }
                ]
            },
            {
                selector: '.c-locations-section',
                lines: [
                    {
                        width: 320,
                        rotation: -45,
                        position: {
                            top: '50%',
                            left: 0,
                        },
                    }
                ]
            },
            { // Homepage Hero
                selector: '.c-hero-section',
                lines: [
                    {
                        width: 240,
                        rotation: -45,
                        position: {
                            bottom: 0,
                            right: 0,
                        },
                        offset: 'translateY(-50%)',
                    }
                ]
            },
            { // Contact page
                selector: '.work-with-us-form',
                lines: [
                    {
                        width: 320,
                        rotation: -45,
                        position: {
                            bottom: 185,
                            right: 0,
                        },
                    }
                ]
            },
            { // Page headers
                selector: '.c-header-section',
                lines: [
                    {
                        width: 280,
                        rotation: 45,
                        position: {
                            top: 0,
                            right: 0,
                        },
                    },
                    {
                        width: 200,
                        rotation: 45,
                        position: {
                            bottom: 110,
                            left: 0,
                        },
                    },
                    {
                        width: 240,
                        rotation: -45,
                        position: {
                            top: 0,
                            right: 0,
                        },
                    },
                ]
            },
            {
                selector: '.featured-section',
                lines: [
                    {
                        width: 240,
                        rotation: -45,
                        position: {
                            left: 180,
                            bottom: 150,
                        }
                    },
                    {
                        width: 320,
                        rotation: 45,
                        position: {
                            bottom: 20,
                            left: 120,
                        },
                    },
                ]
            },
            {
                selector: '.plain-text-section',
                lines: [
                    {
                        width: 320,
                        rotation: 45,
                        position: {
                            bottom: 0,
                            left: 0,
                        },
                    },
                    {
                        width: 240,
                        rotation: -45,
                        position: {
                            top: -20,
                            left: 120,
                        },
                    },
                ]
            },
            {
                selector: '.footer-form',
                lines: [
                    {
                        width: 300,
                        rotation: 45,
                        position: {
                            top: -300,
                            left: 0,
                        },
                    }
                ]
            }
        ];

        this.elementCache = [];
        this.linesCache = [];

        this.setupLines();
        this.bindListeners();
        this.addEventListeners();
    }

    static init() {
        new Lines();
    }

    setupLines() {
        let sectionElem;
        this.lines.forEach(section => {
            sectionElem = document.querySelector(section.selector);

            if (sectionElem && this.checkCache(sectionElem)) {
                this.drawLine(sectionElem, this.randomItem(section.lines))
            }
        })
    }

    bindListeners() {
        ['animateIn', 'animateOut'].forEach(f => {
            this[f] = this[f].bind(this);
        })
    }

    drawLine(section, line) {
        const lineElem = document.createElement('div');
        const offset = line.offset || '';
        lineElem.classList.add('global-line');
        lineElem.style.width = this.formatUnit(line.width);
        lineElem.style.transform = `rotate(${line.rotation}deg) ${offset} scaleX(0)`;

        this.positionElement(lineElem, line.position);

        this.linesCache.push(lineElem);

        section.style.position = 'relative';
        section.appendChild(lineElem);

    }

    positionElement(element, positions) {
        Object.keys(positions).forEach(position => {
           element.style[position] = this.formatUnit(positions[position]);
        });
    }

    checkCache(section) {
        if (this.elementCache.includes(section)) return false;

        this.elementCache.push(section);
        return true;
    }

    formatUnit(n) {
        return !isNaN(n) ? `${n}px` : n;
    }

    randomItem(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    addEventListeners() {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateIn(entry.target);
                } else {
                    this.animateOut(entry.target);
                }
            })
        });

        this.linesCache.forEach(line => observer.observe(line));
    }

    animateIn(line) {
        const oldTransform = line.style.transform;
        line.style.transform = oldTransform.replace('scaleX(0)', 'scaleX(1)');
    }

    animateOut(line) {
        const oldTransform = line.style.transform;
        line.style.transform = oldTransform.replace('scaleX(1)', 'scaleX(0)');
    }
}