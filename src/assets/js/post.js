import { annotate } from 'rough-notation'

const defaultUnderlineSettings = { type: 'underline', color: 'var(--color-blue)', animationDuration: 250, strokeWidth: 4, padding: 0 }
const allLinks = document.querySelectorAll('a:not(.linkout)')

allLinks.forEach(linkEl => {
    const annotation = annotate(linkEl, defaultUnderlineSettings)
    linkEl.addEventListener('mouseenter', () => {
        annotation.show()

        linkEl.addEventListener('mouseleave', () => {
            annotation.hide()
        })
    })
})