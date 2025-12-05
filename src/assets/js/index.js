import { annotate, annotationGroup } from 'rough-notation';

// to-do: enable pre-annotated items via query string
// to-do: extract highlighting logic into a function to DRY add it to focus & active states

const prefersReducedMotion = window && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
const prefersDark = window && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
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
const themePreference = prefersDark ? 'dark' : 'light'

// Items to underline on hover
const hoverSelectors = [
    '#technologies-list button',
    '.project .name'
]
const hoverSelectorsString = hoverSelectors.join(",")
const elementsToAnimateOnhover = document.querySelectorAll(hoverSelectorsString)
const tutorialText = document.querySelector("#technology-instructions")
const defaultUnderlineSettings = { type: 'underline', color: annotationColorByTypeAndTheme['line'][themePreference], animationDuration: 250, strokeWidth: 6, padding: 0, animate: !prefersReducedMotion, multiline: true }
const defaultBoxSettings = { type: 'box', color: annotationColorByTypeAndTheme['line'][themePreference], animationDuration: 350, strokeWidth: 6, padding: 16, animate: !prefersReducedMotion }
const defaultHighlightSettings = { type: 'highlight', color: annotationColorByTypeAndTheme['highlight'][themePreference], animationDuration: 500, multiline: true, animate: !prefersReducedMotion, iterations: 2 }

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
            tech: el.dataset.tech.split(','),
            annotation: annotate(el, defaultBoxSettings)
        }
    }
})

const workplaceElements = document.querySelectorAll('.workplace .work-description li')
const workplaceTechExamples = []

workplaceElements.forEach(el => {
    if (el.dataset.tech) {
        workplaceTechExamples.push({
            element: el,
            tech: el.dataset.tech.split(','),
            annotation: annotate(el, defaultUnderlineSettings)
        })
    }
})

elementsToAnimateOnhover.forEach(el => {
    const annotation = annotate(el, defaultUnderlineSettings)
    el.addEventListener('mouseenter', () => {
        annotation.show()

        el.addEventListener('mouseleave', () => {
            annotation.hide()
        })

        // If it's a tech button, light up projects with this data tag and remove the tutorial prompt
        const isTechnologyButton = el.parentNode.parentNode.getAttribute("id") === 'technologies-list'
        if (isTechnologyButton) {
            const techType = el.innerHTML
            const allTechExamplesAnnotations = []

            if (tutorialText && !tutorialText.classList.contains("hidden")) {
                tutorialText.classList.add("!hidden")
            }

            // Highlight projects that use this tech
            findAnnotationsForProjectByTechType(projectTechData, techType).forEach(projectAnnotation => {
                allTechExamplesAnnotations.push(projectAnnotation)
                el.addEventListener('mouseleave', () => {
                    projectAnnotation.hide()
                })
            })

            // Highlight experience example that uses this tech
            findWorkplaceTechAnnotationsByTechType(workplaceTechExamples, techType).forEach(techAnnotation => {
                allTechExamplesAnnotations.push(techAnnotation)
                el.addEventListener('mouseleave', () => {
                    techAnnotation.hide()
                })
            })

            const techAnnotationGroup = annotationGroup(allTechExamplesAnnotations)
            techAnnotationGroup.show()
        }
    })
})

const instructionAnnotation = annotate(document.querySelector('#technology-instructions .text'), defaultHighlightSettings)
instructionAnnotation.show()

function findAnnotationsForProjectByTechType(projects, tech) {
    const annotationsForProjectsThatIncludeTechType = []
    for (const projectKey in projects) {
        const project = projects[projectKey]
        if (project.tech.includes(tech)) {
            annotationsForProjectsThatIncludeTechType.push(project.annotation)
        }
    }

    return annotationsForProjectsThatIncludeTechType
}

function findWorkplaceTechAnnotationsByTechType(workplaces, tech) {
    const annotationsForWorkplacesThatIncludeTechType = []
    workplaces.forEach(workplaceItem => {
        if (workplaceItem.tech.includes(tech)) {
            annotationsForWorkplacesThatIncludeTechType.push(workplaceItem.annotation)
        }
    })

    return annotationsForWorkplacesThatIncludeTechType
}