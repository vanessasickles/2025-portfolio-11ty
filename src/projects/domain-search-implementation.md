---
layout: layouts/post.html
pageTitle: Domain Search UX and API Implemen&shy;tation
date: 2025-10-10
fullTitle: Implementing a Domain Search API from Scratch in a New User Interface
blurb: At a prior place of employment, I was tasked to develop a domain search experience from the ground up in **Vue.js** and **PHP**, implementing several existing APIs in the process, and augmenting another **Ruby on Rails API** with additional endpoints to support the feature's data needs.
tags: project
tech:
- Vue.js
- Vuex
- JavaScript
- PHP
- Ruby on Rails
- HTML
- Git
---

## Features
- Complex state management and store design with **Vuex**, flexibly serving the product's needs as the feature expanded
- Multi-step **API requests** and data loading, updating state objects asynchronously with new data
- Advanced result filtering functionality, utilizing **Vue.js** reactivity for **instantaneous result updates**, all built with a data structure that allows for seamless, modular addition of new filter types
- Adding additional endpoints to an existing **Ruby on Rails API**, utilizing **ActiveRecord** and **Faraday** to source data for responses

## Data challenges of a new product
When building a brand new product, one of the biggest challenges is where you will source any dynamic data required by the product and its interface. While building a minimally viable product, you often have to work with certain limitations in those sources.

### Sourcing product data
In a typical user journey, when a user searches for a domain for their website or business, they want to see the availability and pricing of the domain they have in mind. However, it's also beneficial to suggest alternatives for the top-level domain (the TLD, such as `com`, `net`, or `org`) or for the second-level domain (the SLD, the part before the period of a TLD, such as `google` in `google.com`).

This array of information can come from various places in a business logic flow. In this case, **I had to work with segemented APIs from several sources** to accomplish the multi-step process of taking the user's query, generating domain suggestions, displaying them, fetching pricing and availability, and then updating those suggestions with the matching data to minimize a user's wait time on a domain search.

Part of this work included aggregating and unifying some of our data sources into an existing API used for the frontend application, built in **Ruby on Rails**, and creating new endpoints there to use in our frontend application.

### Organizing incoming data and application state
On the technical side, you also want to make sure that you're storing and updating this information neatly and accurately. **I structured and organized the Vuex store** responsible for this aspect of the application as it grew, ensuring it remained flexible, maintainable, and expandable.

When working with a reactive framework like Vue.js, one common pitfall I've witnessed is **the urge to make everything reactive.** For example, a user's input is useful to watch and keep track of for when they eventually initiate a new search, but you also want to keep track of what they previously searched with so that you don't re-initiate a new search needlessly, or so that you can track the difference between their current input and their previous one. There are also many "in-between" states while waiting for asynchronous data to load. **Designing what data to store, as well as when and how to store them,** was one of the fun challenges that came with this project.

## Building quality of life features
One of the most fun features I worked on in the project was the dynamic result filter system. The easy reactivity of Vue.js as a framework offered a snappy experience, allowing a user to instantly filter results by price, length, TLD, and more. This included a double-ended range slider component made modular and re-useable by passing in different data paths with props. It was also fun to optimize, ensuring that the multiple bite-sized filter functions ran with minimal looping over large datasets.

Starting a new product from the ground-up also let me focus on accessibility, ensuring that inputs were keyboard-accessible and properly associated with labels (and marked with sensible `aria-label`ing when labelled atypically in the design).