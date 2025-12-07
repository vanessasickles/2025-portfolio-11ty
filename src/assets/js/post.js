const prefersReducedMotion = window && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Sidebar observer for back to top
const backToTopOptions = {
    rootMargin: "0px",
    scrollMargin: "0px",
    threshold: 0.25
};
const backToTop = document.querySelector(".back-to-top-wrap")
const sidebar = document.querySelector(".sidebar-column")

const backToTopObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        const classes = backToTop.classList
        if (entry.isIntersecting) {
            if (classes.contains('slide-in')) {
                classes.add('slide-out')
                classes.remove('slide-in')
            }
        } else {
            classes.add('slide-in')
            classes.remove('slide-out')
        }
    })
}, backToTopOptions)
backToTopObserver.observe(sidebar)

// Sidebar observer for scrollGroup
const scrollGroupOptions = {
    rootMargin: "0px",
    scrollMargin: "0px",
    threshold: 0
};

function convertRemToPixels(rem) {    
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}

const scrollGroup = document.querySelector('#scroll-group')
const scrollGroupObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        if (window.innerWidth > convertRemToPixels(80)) {
            const classes = scrollGroup.classList
            if (entry.isIntersecting) {
                classes.remove('top-fixed')
                classes.remove('slide-in-top')
            } else {
                if (!prefersReducedMotion) {
                    classes.add('slide-in-top')
                }
                classes.add('top-fixed')
            }
        }
    })
}, scrollGroupOptions)
scrollGroupObserver.observe(sidebar)

// Annotations
import { annotate } from 'rough-notation'

const annotationColorByTypeAndTheme = {
    highlight: {
        light: 'var(--color-highlight)',
        dark: 'var(--color-dark-highlight)'
    },
    line: {
        light: 'var(--color-blue)',
        dark: 'var(--color-dark-blue)'
    }
}

const prefersDark = window && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
const highlightAnnotationColor = prefersDark ? annotationColorByTypeAndTheme['highlight']['dark'] : annotationColorByTypeAndTheme['highlight']['light']
const lineAnnotationColor = prefersDark ? annotationColorByTypeAndTheme['line']['dark'] : annotationColorByTypeAndTheme['line']['light']

const defaultHighlightSettings = { type: 'highlight', color: highlightAnnotationColor, animationDuration: 250, strokeWidth: 4, multiline: true, animate: !prefersReducedMotion, padding: '0 2px' }
const allLinks = document.querySelectorAll('a:not(.linkout)')

allLinks.forEach(linkEl => {
    const annotation = annotate(linkEl, defaultHighlightSettings)
    linkEl.addEventListener('mouseenter', () => {
        annotation.show()

        linkEl.addEventListener('mouseleave', () => {
            annotation.hide()
        })
    })
})

const defaultDecorativeUnderlineSettings = { type: 'underline', color: lineAnnotationColor, animate: false, strokeWidth: 4, animate: false }
const allLevel2Headings = document.querySelectorAll('.content h2')
allLevel2Headings.forEach(heading => {
    const annotation = annotate(heading, defaultDecorativeUnderlineSettings)
    annotation.show()
})

const defaultBoxSettings = { type: 'box', color: lineAnnotationColor, animate: false, strokeWidth: 6, padding: 0,  animate: !prefersReducedMotion }
const allImages = document.querySelectorAll('.content img')
allImages.forEach(image => {
    const annotation = annotate(image, defaultBoxSettings)
    annotation.show()
})