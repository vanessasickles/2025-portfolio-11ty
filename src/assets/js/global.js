import { annotate } from 'rough-notation';

function classify(string) {
    return string.replace(/[., ]/g, '-').toLowerCase() 
}

// get project data map
const projectElements = document.querySelectorAll('.project')
const projectTechData = {}

projectElements.forEach(el => {
    if (el.dataset.name && el.dataset.tech) {
        projectTechData[el.dataset.name] = {
            element: el,
            tech: el.dataset.tech.split(',')
        }
    }
})

// Items to underline on hover
const hoverSelectors = [
    '#technologies-list button',
    '.logo',
    '.project .name'
]
const hoverSelectorsString = hoverSelectors.join(",")
const elementsToAnimateOnhover = document.querySelectorAll(hoverSelectorsString)
const defaultUnderlineSettings = { type: 'underline', color: 'var(--color-blue)', animationDuration: 300, strokeWidth: 6, padding: 0 }
const defaultBoxSettings = { type: 'box', color: 'var(--color-blue)', animationDuration: 700, strokeWidth: 6, padding: 16 }

elementsToAnimateOnhover.forEach(el => {
    el.addEventListener('mouseenter', () => {
        const annotation = annotate(el, defaultUnderlineSettings)
        annotation.show()

        el.addEventListener('mouseleave', () => {
            annotation.remove()
        })

        // light up projects with this data tag
        const isTechnologyButton = el.parentNode.parentNode.getAttribute("id") === 'technologies-list'
        if (isTechnologyButton) {
            const techType = el.innerHTML
            for (const projectKey in projectTechData) {
                const project = projectTechData[projectKey]
                if (project.tech.includes(techType)) {
                    // project includes tech; underline it

                    const projectAnnotation = annotate(project.element, defaultBoxSettings)
                    projectAnnotation.show()

                    el.addEventListener('mouseleave', () => {
                        projectAnnotation.remove()
                    })
                }
            }
        }
    })
})