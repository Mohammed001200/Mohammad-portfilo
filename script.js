'use strict';

//Opening or closing side bar

const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

if (sidebarBtn && sidebar) {
    sidebarBtn.addEventListener("click", function() { elementToggleFunc(sidebar); });
}

//Activating Modal-testimonial

const testimonialsItem = document.querySelectorAll('[data-testimonials-item]');
const modalContainer = document.querySelector('[data-modal-container]');
const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
const overlay = document.querySelector('[data-overlay]');

const modalImg = document.querySelector('[data-modal-img]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalText = document.querySelector('[data-modal-text]');

const testimonialsModalFunc = function () {
    if (modalContainer) modalContainer.classList.toggle('active');
    if (overlay) overlay.classList.toggle('active');
}

if (testimonialsItem && testimonialsItem.length && modalContainer && modalImg && modalTitle && modalText) {
    for (let i = 0; i < testimonialsItem.length; i++) {
        testimonialsItem[i].addEventListener('click', function () {
            const avatar = this.querySelector('[data-testimonials-avatar]');
            const title = this.querySelector('[data-testimonials-title]');
            const text = this.querySelector('[data-testimonials-text]');

            if (avatar && modalImg) {
                modalImg.src = avatar.src || '';
                modalImg.alt = avatar.alt || '';
            }
            if (title && modalTitle) modalTitle.innerHTML = title.innerHTML;
            if (text && modalText) modalText.innerHTML = text.innerHTML;

            testimonialsModalFunc();
        })
    }
}

//Activating close button in modal-testimonial
if (modalCloseBtn) modalCloseBtn.addEventListener('click', testimonialsModalFunc);
if (overlay) overlay.addEventListener('click', testimonialsModalFunc);

//Activating Filter Select and filtering options

const select = document.querySelector('[data-select]');
const selectItems = document.querySelectorAll('[data-select-item]');
const selectValue = document.querySelector('[data-select-value]');
const filterBtn = document.querySelectorAll('[data-filter-btn]');

if (select) {
    select.addEventListener('click', function () { elementToggleFunc(this); });

    if (selectItems && selectItems.length) {
        for(let i = 0; i < selectItems.length; i++) {
            selectItems[i].addEventListener('click', function() {
                let selectedValue = this.innerText.toLowerCase();
                if (selectValue) selectValue.innerText = this.innerText;
                elementToggleFunc(select);
                filterFunc(selectedValue);
            });
        }
    }
}

const filterItems = document.querySelectorAll('[data-filter-item]');

const filterFunc = function (selectedValue) {
    for(let i = 0; i < filterItems.length; i++) {
        if(selectedValue == "all") {
            filterItems[i].classList.add('active');
        } else if (selectedValue == filterItems[i].dataset.category) {
            filterItems[i].classList.add('active');
        } else {
            filterItems[i].classList.remove('active');
        }
    }
}

//Enabling filter button for larger screens 

let lastClickedBtn = null;
if (filterBtn && filterBtn.length) {
    lastClickedBtn = filterBtn[0];
    for (let i = 0; i < filterBtn.length; i++) {
        filterBtn[i].addEventListener('click', function() {
            let selectedValue = this.innerText.toLowerCase();
            if (selectValue) selectValue.innerText = this.innerText;
            filterFunc(selectedValue);

            if (lastClickedBtn) lastClickedBtn.classList.remove('active');
            this.classList.add('active');
            lastClickedBtn = this;
        })
    }
}

// Enabling Contact Form

const form = document.querySelector('[data-form]');
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');

if (form && formInputs && formInputs.length && formBtn) {
    for(let i = 0; i < formInputs.length; i++) {
        formInputs[i].addEventListener('input', function () {
            if(form.checkValidity()) {
                formBtn.removeAttribute('disabled');
            } else {
                formBtn.setAttribute('disabled', '');
            }
        })
    }
}

// Enabling Page Navigation 

const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

if (navigationLinks && navigationLinks.length && pages && pages.length) {
    for(let i = 0; i < navigationLinks.length; i++) {
        navigationLinks[i].addEventListener('click', function() {
            // remove active from all pages and nav links
            for(let j = 0; j < pages.length; j++) {
                pages[j].classList.remove('active');
            }
            for(let k = 0; k < navigationLinks.length; k++) {
                navigationLinks[k].classList.remove('active');
            }

            const target = this.innerHTML.trim().toLowerCase();
            // find and activate the matching page
            for(let j = 0; j < pages.length; j++) {
                if(pages[j].dataset.page && pages[j].dataset.page === target) {
                    pages[j].classList.add('active');
                    break;
                }
            }

            // set the clicked nav link active
            this.classList.add('active');
            window.scrollTo(0, 0);
        });
    }
}