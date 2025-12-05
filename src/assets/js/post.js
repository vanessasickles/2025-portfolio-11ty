// Back to top
const options = {
    rootMargin: "0px",
    scrollMargin: "0px",
    threshold: 0.25
};
const backToTop = document.querySelector("#back-to-top")
const sidebar = document.querySelector(".sidebar-column")

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
        
        if (!entry.isIntersecting) {
            console.log(backToTop)
            backToTop.style.transform("translateY(50%)")
        } else {
        }
    })
}, options)
observer.observe(sidebar)

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
const prefersReducedMotion = window && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
const prefersDark = window && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
const highlightAnnotationColor = prefersDark ? annotationColorByTypeAndTheme['highlight']['dark'] : annotationColorByTypeAndTheme['highlight']['light']
const lineAnnotationColor = prefersDark ? annotationColorByTypeAndTheme['line']['dark'] : annotationColorByTypeAndTheme['line']['light']

const defaultHighlightSettings = { type: 'highlight', color: highlightAnnotationColor, animationDuration: 250, strokeWidth: 4, multiline: true, animate: !prefersReducedMotion }
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