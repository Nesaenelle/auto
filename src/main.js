// alert(2);
import { isScrolledIntoView, scrollToAnimate, isInViewport } from './Utils.js'

let scrollInstance = new scrollToAnimate();


let app = new Vue({
    el: '#app',
    data: {
        showMenu: false,
        onTop: false,
        authorized: false,
        searchValue: '',
        invalidNumber: false
    },
    mounted() {
        [].forEach.call(document.querySelectorAll('img[data-src]'), (img) => {
            img.setAttribute('src', img.getAttribute('data-src'));
            img.onload = () => {
                img.removeAttribute('data-src');
            };
        });

        window.addEventListener('scroll', () => {
            this.onTop = document.documentElement.scrollTop > 300;
        });

        $('a[href^="#link-"]').on('click', (e) => {
            e.preventDefault();

            function scroll() {
                let elem = e.currentTarget.getAttribute('href');
                $([document.documentElement, document.body]).animate({
                    scrollTop: $(elem).offset().top - 80
                }, 1000);
            }
            if ($('.reference').hasClass('active')) {
                scroll();
            } else {
                let $target = $('.reference__toggle');
                $target.next().stop().slideToggle(0);
                if (!$target.parent().hasClass('active')) {
                    $target.parent().addClass('active');
                }
                scroll();
            }
        })

        $('.hypothesis-list__item_text:first').slideDown(0);

        this.headerCheck();
        $(document).on('scroll', () => {
            this.headerCheck();
        });

        window.addEventListener('mousewheel', () => {
            scrollInstance.clear();
        });

        window.addEventListener('click', (e) => {
            if (!this.$refs.menu.contains(e.target)) {
                this.showMenu = false;
            }
        });

        let tabs = $('[data-navigation]');
        let links = $('header a[href]');

        window.addEventListener('scroll', () => {
            tabs.each((i, elem) => {
                if (isScrolledIntoView(elem, 110)) {
                    var id = elem.getAttribute('data-navigation');
                    links.each((i, link) => {
                        if (link.getAttribute('href').substr(1) === id) {
                            link.classList.add('active');
                        } else {
                            link.classList.remove('active');
                        }
                    });
                }
            });
        }, false);

        $('.slick').slick({
            dots: true,
            arrows: true,
            infinite: true,
            speed: 300,
            slidesToShow: 3,

            prevArrow: '.slick-prev',
            nextArrow: '.slick-next',
            responsive: [{
                    breakpoint: 1280,
                    settings: {
                        centerMode: true,
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 720,
                    settings: {
                        arrows: false,
                        dots: false,
                        centerMode: true,
                        centerPadding: '20px',
                        slidesToShow: 1
                    }
                }
            ]
        });

        $('.mask-input').mask('Z 000 ZZ | 000', {
            translation: {
                'Z': {
                    pattern: /[A-Za-z]/,
                    optional: false
                }
            }
        });

    },
    methods: {
        goBottom() {
            scrollInstance.animate(document.documentElement, window.innerHeight, 1000);
        },
        goTop() {
            scrollInstance.animate(document.documentElement, 0, 1000);
        },
        toggleMenu() {
            this.showMenu = !this.showMenu;
        },
        headerCheck() {
            if (document.documentElement.scrollTop > 100) {
                $('header').addClass('fixed');
            } else {
                $('header').removeClass('fixed');
            }
        },
        searchValueChange() {
            this.searchValue = this.searchValue.toUpperCase();
            this.invalidNumber = this.searchValue.length < 14;
        },
        searchSubmit(e) {
            this.searchValue;
        },
        navigation(e) {
            e.preventDefault();
            var id = e.currentTarget.getAttribute('href').substr(1);
            var elem = document.querySelector(`[data-navigation="${id}"]`);
            let offset = elem.offsetTop - 99;
            if (id === 'home') {
                offset = 0;
            }
            if (elem) {
                scrollInstance.animate(document.documentElement, offset, 1000);
            }
        }
    }
});