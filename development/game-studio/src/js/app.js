// Import our CSS
import styles from '../css/app.scss';
import 'photoswipe/style.css';
import './_icons';

import Splide from '@splidejs/splide';
import { AutoScroll } from '@splidejs/splide-extension-auto-scroll';

import Skill from "./components/Skills";
import MicroModal from 'micromodal';
import Navigation from "./components/Navigation";
import ScrollingText from "./components/ScrollingText";
import Cursor from "./components/Cursor";
import ScrollIndicator from "./components/ScrollIndicator";
import Typing from "./components/Typing";
import Lines from "./components/Lines";
import AOS from 'aos';
import PhotoSwipeLightbox from 'photoswipe/lightbox';

function isTouchDevice() {

    const prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');

    const mq = function (query) {
        return window.matchMedia(query).matches;
    };

    if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
        return true;
    }

    const query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
    return mq(query);
}

function removeNotification() {
    const notification = document.querySelector('.c-notification');

    if (notification) notification.parentNode.removeChild(notification);
}

const isTouch = isTouchDevice();

// App main
const main = async () => {
    AOS.init({
        offset: 200,
        duration: 1000,
    });
    Skill.init('[data-skill]');
    Navigation.init();
    ScrollingText.init();
    ScrollIndicator.init();
    Typing.init();
    Lines.init();
    MicroModal.init({
        awaitCloseAnimation: true,
        debug: true,
    });

    let cursorInstance;

    if (!isTouch) cursorInstance = new Cursor();

    const gallery = document.getElementById('gallery');
    if (gallery) {
        const lightbox = new PhotoSwipeLightbox({
            gallerySelector: '#gallery',
            childSelector: 'a',
            showHideAnimationType: 'zoom',
            pswpModule: () => import('photoswipe')
        });

        lightbox.init();
    }


    const lazyVideos = Array.from(document.querySelectorAll('video.lazy') || []);
    lazyVideos.forEach(video => {
        for (let source in video.children) {
            const videoSource = video.children[source];
            if (typeof videoSource.tagName === 'string' && videoSource.tagName === 'SOURCE') {
                videoSource.src = videoSource.dataset.src;
            }
        }
        video.load();
        video.classList.remove("lazy");
    });

    const notificationClose = document.querySelector('.c-notification__close');
    if (notificationClose) {
        notificationClose.addEventListener('click', removeNotification);
        setTimeout(removeNotification, 6000);
    }

    const imageSlider = document.querySelector('.image-slider');

    if (imageSlider) {
        new Splide( imageSlider, {
            // type: 'loop',
            drag: 'free',
            autoWidth: true,
            gap: 24,
            pagination: false,
            padding: 48,
        }).mount();
    }

    const cardSlider = document.querySelector('.c-card-slider');

    if (cardSlider) {
        new Splide(cardSlider, {
            // type: 'loop',
            // drag: 'free',
            // autoWidth: true,
            arrowPath: 'M23.6 28.4 15.3 20l8.3-8.4.8.8-7.7 7.6 7.7 7.6z',
            perPage: 3,
            gap: 24,
            pagination: false,
            perMove: 1,
            padding: { left: 54, right: 120 },
            breakpoints: {
                1336: {
                    perPage: 2,
                    // arrows: false,
                    // padding: { left: 0, right: 64 },
                },
                767: {
                    perPage: 1,
                    arrows: false,
                    padding: { left: 0, right: 64 },
                }
            }
        }).mount();
    }

    const clientsSliderLtr = document.querySelectorAll('.clients-slider.ltr');

    clientsSliderLtr.forEach(slider => {
        if(slider) {
            new Splide(slider, {
                type: 'loop',
                drag: 'free',
                arrows: false,
                direction: 'ltr',
                // arrowPath: 'M23.6 28.4 15.3 20l8.3-8.4.8.8-7.7 7.6 7.7 7.6z',
                perPage: 3,
                gap: 24,
                pagination: false,
                perMove: 1,
                padding: { left: 54, right: 120 },
                autoScroll: {
                    speed: .65
                  },
                breakpoints: {
                    1336: {
                        perPage: 2,
                        // arrows: false,
                        // padding: { left: 0, right: 64 },
                    },
                    767: {
                        perPage: 1,
                        arrows: false,
                        padding: { left: 0, right: 64 },
                    }
                }
            }).mount({ AutoScroll });
        }
    })

    const clientsSliderRtl = document.querySelectorAll('.clients-slider.rtl');

    clientsSliderRtl.forEach(slider => {

        if(slider) {
            new Splide(slider, {
                type: 'loop',
                drag: 'free',
                arrows: false,
                direction: 'rtl',
                // arrowPath: 'M23.6 28.4 15.3 20l8.3-8.4.8.8-7.7 7.6 7.7 7.6z',
                perPage: 3,
                gap: 24,
                pagination: false,
                perMove: 1,
                padding: { left: 54, right: 120 },
                autoScroll: {
                    speed: .65
                  },
                breakpoints: {
                    1336: {
                        perPage: 2,
                        // arrows: false,
                        // padding: { left: 0, right: 64 },
                    },
                    767: {
                        perPage: 1,
                        arrows: false,
                        padding: { left: 0, right: 64 },
                    }
                }
            }).mount({ AutoScroll });
        }
    })

    // FORM FILE UPLOAD

    const fileInputs = [...document.querySelectorAll('.c-input-group--file')];
    function readFileField(field) {
        const inputEl = field.querySelector('input[type="file"]');
        const fileWrapperEl = field.querySelector('.c-input-group__uploaded');
        const fileNameEl = field.querySelector('[data-file-name]');
        const clearBtnEl = field.querySelector('[data-file-clear]');

        function onSelect() {
            fileNameEl.textContent = inputEl.value.replace(/.*[\/\\]/, '');
            fileWrapperEl.classList.add('set');
            field.classList.remove('c-input-group--error');
        }

        function onClear() {
            try {
                inputEl.value = null;
            } catch(e) {}

            if (inputEl.value) {
                inputEl.parentNode.replaceChild(inputEl.cloneNode(true), inputEl);
            }

            fileWrapperEl.classList.remove('set');
        }

        if (inputEl) inputEl.addEventListener('change', onSelect);
        if (clearBtnEl) clearBtnEl.addEventListener('click', onClear)

    }

    fileInputs.forEach(readFileField)
};

if (isTouch) {
    document.body.classList.add('touch');
}

document.addEventListener('DOMContentLoaded', async () => {
    await main();
});

// Accept HMR as per: https://webpack.js.org/api/hot-module-replacement#accept
if (module.hot) {
    module.hot.accept();
}
