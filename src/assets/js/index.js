import { annotate, annotationGroup } from 'rough-notation';

// to-do: enable pre-annotated items via query string
// to-do: extract highlighting logic into a function to DRY add it to focus & active states

const allAnnotations = []

const prefersReducedMotion = window && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
const annotationColorByTheme = {
    light: 'var(--color-blue)',
    dark: 'var(--color-dark-blue)'
}
const annotationColor = (window && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? annotationColorByTheme['dark'] : annotationColorByTheme['light']

// Items to underline on hover
const hoverSelectors = [
    '#technologies-list button',
    '.project .name'
]
const hoverSelectorsString = hoverSelectors.join(",")
const elementsToAnimateOnhover = document.querySelectorAll(hoverSelectorsString)
const defaultUnderlineSettings = { type: 'underline', color: annotationColor, animationDuration: 250, strokeWidth: 6, padding: 0, animate: !prefersReducedMotion, multiline: true }
const defaultBoxSettings = { type: 'box', color: annotationColor, animationDuration: 350, strokeWidth: 6, padding: 16, animate: !prefersReducedMotion }

function classify(string) {
    return string.replace(/[., ]/g, '-').toLowerCase() 
}

// get project data map
const projectElements = document.querySelectorAll('.project')
const projectTechData = {}

projectElements.forEach(el => {
    if (el.dataset.name && el.dataset.tech) {
        const annotation = annotate(el, defaultBoxSettings)
        projectTechData[el.dataset.name] = {
            element: el,
            tech: el.dataset.tech.split(','),
            annotation: annotation
        }

        allAnnotations.push(annotation)
    }
})

const workplaceElements = document.querySelectorAll('.workplace .work-description li')
const workplaceTechExamples = []

workplaceElements.forEach(el => {
    if (el.dataset.tech) {
        const annotation = annotate(el, defaultUnderlineSettings)
        workplaceTechExamples.push({
            element: el,
            tech: el.dataset.tech.split(','),
            annotation: annotation
        })

        allAnnotations.push(annotation)
    }
})

// Extracted function for annotation search + effects to apply to hover and focus alike
const annotateAll = (originatingElement, annotation, disableEventName) => {
    annotation.show()
    console.log(annotation, typeof annotation)

    originatingElement.addEventListener(disableEventName, () => {
        const ariaPressed = originatingElement.getAttribute('aria-pressed') === 'true'
        if (!ariaPressed) {
            annotation.hide()
        }
    })

    // If it's a tech button, light up projects with this data tag
    const isTechnologyButton = document.querySelector("#technologies-list").contains(originatingElement)
    if (isTechnologyButton) {
        const techType = originatingElement.innerHTML
        const allTechExamplesAnnotations = []

        // Highlight projects that use this tech
        findAnnotationsForProjectByTechType(projectTechData, techType).forEach(projectAnnotation => {
            if (projectAnnotation._state ==='not-showing') {
                allTechExamplesAnnotations.push(projectAnnotation)
            }
            originatingElement.addEventListener(disableEventName, () => {
                const ariaPressed = originatingElement.getAttribute('aria-pressed') === 'true'
                if (!ariaPressed) {
                    projectAnnotation.hide()
                }
                
            })
        })

        // Highlight experience examples that use this tech
        findWorkplaceTechAnnotationsByTechType(workplaceTechExamples, techType).forEach(techAnnotation => {
            if (techAnnotation._state ==='not-showing') {
                allTechExamplesAnnotations.push(techAnnotation)
            }
            
            originatingElement.addEventListener(disableEventName, () => {
                const ariaPressed = originatingElement.getAttribute('aria-pressed') === 'true'
                if (!ariaPressed) {
                    techAnnotation.hide()
                }
            })
        })

        const techAnnotationGroup = annotationGroup(allTechExamplesAnnotations)
        techAnnotationGroup.show()
    }
}

elementsToAnimateOnhover.forEach(el => {
    const annotation = annotate(el, defaultUnderlineSettings)
    allAnnotations.push(annotation)

    const elAriaPressed = el.getAttribute('aria-pressed') === 'true'

    el.addEventListener('mouseenter', () => {
        annotateAll(el, annotation, 'mouseleave')
    })

    // Add same funcitonality, but for focusout
    el.addEventListener('focusin', () => {
        annotateAll(el, annotation, 'focusout')
    })
})

// Set up tech toggle buttons to use aria-pressed to manage state
const allTechToggles = document.querySelectorAll('#technologies-list button[aria-pressed]')
allTechToggles.forEach(toggle => {
    const annotationMatchingPressedButton = findAnnotationInSetByNode(allAnnotations, toggle)
    const techType = toggle.innerHTML
    const annotationsToGroup = []

    if (annotationMatchingPressedButton) {
        annotationsToGroup.push(annotationMatchingPressedButton)
    }

    addEventListener('click', (e) => {
        const pressed = e.target.getAttribute('aria-pressed') === 'true'
        // console.log(annotationMatchingPressedButton)

        // Set to now-pressed        
        e.target.setAttribute('aria-pressed', String(!pressed))
    })
})


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

function findAnnotationInSetByNode(annotationSet, node) {
    const annotationMatchingSpecifiedNode = annotationSet.find((annotation) => {
        return annotation._e === node
    })
    return annotationMatchingSpecifiedNode
}