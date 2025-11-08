import { annotate, annotationGroup } from 'rough-notation';

// to-do: enable pre-annotated items via query string

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
    '.logo',
    '.project .name'
]
const hoverSelectorsString = hoverSelectors.join(",")
const elementsToAnimateOnhover = document.querySelectorAll(hoverSelectorsString)
const defaultUnderlineSettings = { type: 'underline', color: 'var(--color-blue)', animationDuration: 250, strokeWidth: 6, padding: 0 }
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