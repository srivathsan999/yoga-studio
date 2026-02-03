/* 
* Main JavaScript
* Initializes GSAP animations, Tab logic, Mobile Menu, and other interactive elements.
*/

document.addEventListener('DOMContentLoaded', () => {
    // Initialize GSAP ScrollTrigger
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        const fadeElements = document.querySelectorAll('.fade-up');

        fadeElements.forEach((element) => {
            gsap.fromTo(element,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });
    }

    // Tabs Logic
    const initTabs = (triggerClass, contentClass) => {
        const triggers = document.querySelectorAll(triggerClass);
        const contents = document.querySelectorAll(contentClass);

        if (triggers.length > 0) {
            triggers.forEach(trigger => {
                trigger.addEventListener('click', (e) => {
                    e.preventDefault();

                    // Determine if this is a button style tab or text style tab
                    const isButton = trigger.classList.contains('btn');

                    // Reset all triggers of this type
                    triggers.forEach(t => {
                        if (isButton) {
                            t.classList.remove('btn-primary', 'active');
                            t.classList.add('btn-outline');
                        } else {
                            t.classList.remove('active', 'text-primary', 'border-bottom', 'border-primary');
                            t.classList.add('text-muted');
                        }
                    });

                    // Hide all contents
                    contents.forEach(c => {
                        c.classList.remove('active');
                        c.classList.add('d-none');
                    });

                    // Activate clicked trigger
                    if (isButton) {
                        trigger.classList.remove('btn-outline');
                        trigger.classList.add('btn-primary', 'active');
                    } else {
                        trigger.classList.add('active', 'text-primary', 'border-bottom', 'border-primary');
                        trigger.classList.remove('text-muted');
                    }

                    // Show target content
                    const targetId = trigger.getAttribute('data-target');
                    const targetContent = document.getElementById(targetId);

                    if (targetContent) {
                        targetContent.classList.remove('d-none');
                        targetContent.classList.add('active');

                        if (typeof gsap !== 'undefined') {
                            gsap.fromTo(targetContent,
                                { opacity: 0, y: 20 },
                                { opacity: 1, y: 0, duration: 0.5 }
                            );
                        }
                    }
                });
            });
        }
    };

    initTabs('.tab-trigger', '.tab-content');

    // Mobile Menu Toggle
    const navToggler = document.querySelector('.navbar-toggler');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (navToggler && mobileMenu) {
        navToggler.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');

            const icon = navToggler.querySelector('i');
            if (icon) {
                if (mobileMenu.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Mobile Dropdown Logic
        const mobileDropdownTriggers = document.querySelectorAll('.mobile-dropdown-trigger');
        mobileDropdownTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const content = trigger.nextElementSibling;
                const icon = trigger.querySelector('.fa-chevron-down');

                if (content) {
                    content.classList.toggle('d-none');
                    trigger.classList.toggle('active');

                    if (icon) {
                        // Simple rotation using style since GSAP might be overkill or not loaded on all pages
                        icon.style.transform = content.classList.contains('d-none') ? 'rotate(0deg)' : 'rotate(180deg)';
                        icon.style.transition = 'transform 0.3s ease';
                    }
                }
            });
        });
    }

    // FAQ Accordion
    const faqTriggers = document.querySelectorAll('.faq-trigger');

    faqTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const isExpanded = trigger.classList.contains('active');

            if (!isExpanded) {
                trigger.classList.add('active');
                const content = trigger.nextElementSibling;
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                trigger.classList.remove('active');
                trigger.nextElementSibling.style.maxHeight = null;
            }
        });
    });
});
