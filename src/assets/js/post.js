import { annotate } from 'rough-notation'

const defaultHighlightSettings = { type: 'highlight', color: 'var(--color-highlight)', animationDuration: 250, strokeWidth: 4, multiline: true }
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

const defaultDecorativeUnderlineSettings = { type: 'underline', color: 'var(--color-blue)', animate: false, strokeWidth: 4 }
const allLevel2Headings = document.querySelectorAll('.content h2')
allLevel2Headings.forEach(heading => {
    const annotation = annotate(heading, defaultDecorativeUnderlineSettings)
    annotation.show()
})

const defaultBoxSettings = { type: 'box', color: 'var(--color-blue)', animate: false, strokeWidth: 6, padding: 0 }
const allImages = document.querySelectorAll('.content img')
allImages.forEach(image => {
    const annotation = annotate(image, defaultBoxSettings)
    annotation.show()
})