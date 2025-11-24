import { annotate, annotationGroup } from 'rough-notation';

// to-do: enable pre-annotated items via query string
// to-do: disable effects for motion reduced users, replace with normal hovers in CSS
// to-do: extract highlighting logic into a function to DRY add it to focus & active states

const prefersReducedMotion = window && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
const annotationColorByTheme = {
    light: 'var(--color-blue)',
    dark: 'var(--color-dark-blue)'
}
const annotationColor = (window && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? annotationColorByTheme['dark'] : annotationColorByTheme['light']

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

const workplaceElements = document.querySelectorAll('.workplace .work-description li')
const workplaceTechExamples = []

workplaceElements.forEach(el => {
    if (el.dataset.tech) {
        workplaceTechExamples.push({
            element: el,
            tech: el.dataset.tech.split(',')
        })
    }
})


// Items to underline on hover
const hoverSelectors = [
    '#technologies-list button',
    '.project .name'
]
const hoverSelectorsString = hoverSelectors.join(",")
const elementsToAnimateOnhover = document.querySelectorAll(hoverSelectorsString)
const defaultUnderlineSettings = { type: 'underline', color: annotationColor, animationDuration: 250, strokeWidth: 6, padding: 0, animate: !prefersReducedMotion }
const defaultBoxSettings = { type: 'box', color: annotationColor, animationDuration: 350, strokeWidth: 6, padding: 16, animate: !prefersReducedMotion }

elementsToAnimateOnhover.forEach(el => {
    const annotation = annotate(el, defaultUnderlineSettings)
    el.addEventListener('mouseenter', () => {
        annotation.show()

        el.addEventListener('mouseleave', () => {
            annotation.hide()
        })

        // light up projects with this data tag
        const isTechnologyButton = el.parentNode.parentNode.getAttribute("id") === 'technologies-list'
        if (isTechnologyButton) {
            const techType = el.innerHTML

            const allTechExamplesAnnotations = []

            // Highlight projects that use this tech
            for (const projectKey in projectTechData) {
                const project = projectTechData[projectKey]
                if (project.tech.includes(techType)) {
                    // project includes tech; underline it
                    const projectAnnotation = annotate(project.element, defaultBoxSettings)
                    // projectAnnotation.show()
                    allTechExamplesAnnotations.push(projectAnnotation)

                    el.addEventListener('mouseleave', () => {
                        projectAnnotation.remove()
                    })
                }
            }

            // Highlight experience example that uses this tech
            workplaceTechExamples.forEach(workplaceItem => {
                if (workplaceItem.tech.includes(techType)) {
                    const workplaceItemAnnotation = annotate(workplaceItem.element, defaultUnderlineSettings)
                    // workplaceItemAnnotation.show()
                    allTechExamplesAnnotations.push(workplaceItemAnnotation)

                    el.addEventListener('mouseleave', () => {
                        workplaceItemAnnotation.remove()
                    })
                }
            })

            const techAnnotationGroup = annotationGroup(allTechExamplesAnnotations)
            techAnnotationGroup.show()
        }
    })
})