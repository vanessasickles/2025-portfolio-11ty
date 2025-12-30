---
layout: layouts/post.html
pageTitle: Posting Table Generator
date: 2025-10-11
fullTitle: Building a Custom HTML/CSS Posting Table Generator with Vue.js and Pinia
blurb: In some online communities, collaborative writers participate in joint storytelling with their original characters. While doing so, many want to decorate their writing ("posts") with a certain aesthetic. They will use custom HTML and CSS to decorate their posts, and in the process, often end up creating unresponsive or layout-breaking codes. To address this problem, I used **Vue.js** and **Pinia** to create an interactive interface for visually creating and customizing these posting tables, which consistently generates non-breaking code for them to use instead.
tags: project
githubUrl: https://gitfront.io/r/vanessasickles/Y5Em9KYoAwwN/table-generator/
liveUrl: https://vue-table-generator.netlify.app/
tech:
- Vue.js
- Pinia
- JavaScript
- HTML
- CSS
---

## Features
- **A responsive interface** for visually adjusting various aspects of a posting table, such as fully customizable colors, images, margins, paddings, text styles, borders, and more
- Reactivity and state management using **Vue.js** and **Pinia** for instant visual updates and data storage
- The ability to **generate templated inline CSS and HTML**, as well as an interface to **export, copy, and paste** the resultant code
- **Flexible-setting Vue.js components** for flexibly and easily adding new options and writing their values dynamically to the reactive state
- Utilization of **modern HTML5 elements** to create **natively-accessible components** such as detail/summary elements and `color` type inputs

## What is a "posting table"?
In some online communities, collaborative writers take turns participating in joint storytelling activities with their original characters. While doing so, many want to decorate their writing (called **"posts"**) with aesthetic elements such as images, background colors, and fonts. They will use custom HTML and CSS to create layout templates for their posts, coloquially known as **"tables"** (a testament to the age of this custom, named after when HTML tables were the primary form of creating more complex layouts for the web).

I'm particularly fond of this part of these communities, as my first introduction to HTML and CSS came from **learning how to make posting tables and decorating character profiles over 15 years ago** in these online communities.

## The long-standing problem
Tables are an extremely popular community staple. Many users joke that **they won't write with a new character until they have a table for them!**

However, while wonderful writers, many players struggle with creating their own codes, often citing lack of knowledge or finding HTML/CSS intimidating. This means that players will use limited free-use resources, or they will attempt to re-use and/or modify codes they've carried from community to community for years. **The community ends up with a smorgasboard of disparate code of uncertain quality.** This includes codes that are completely broken, or that break the layout of the community's site in their posts, often by accidental omission of closing tags when copying/pasting or modifying. Even many modern-created codes are hacky or created with outdated knowledge or without a full understanding of web best principles.

**Phones have also deeply proliferated a once desktop-dominated writing space,** with some users only viewing sites from their mobile devices, and with many tables being created with hard-coded values that become completely dysfunctional on mobile.

So, these communities need a way to **generate table codes:**
- With a visual, non-code editor
- That are mobile compatible
- That include all the appropriate closing tags

With this in mind, I set out to build a solution in the form of a visual editor for posting tables, one that would generate codes for users in an easy and intuitive interface.

## Building a user-friendly solution
I envisioned a webapp that allowed a user to visually edit the look of their table. While do-able in vanilla JavaScript, a reactive framework with a state management solution was begging to be used for a live-updating interface such as this one. I reached for **Vue.js**, and as someone familiar with Vue 2 and Vuex in my day-to-day workplace environment, I reached instead for **Vue 3** and **Pinia** to try out the more modern solutions and got to work.

The end result was something like this!

<figure>
  <img src="/assets/images/table-generator.gif" alt="An animated GIF showing the basic layout and functionality of the table generator">
  <figcaption>A quick preview of the app functionality. Styles coming soon!</figcaption>
</figure>

When considering how to structure the interface, I broke it down into several major "sections" of visual features that I know users look for -- major colors, main text, "speech" text (used to highlight a character's dialogue), and several others. It also included a mobile vs desktop preview, to let a user check out how their table will look on mobile!

### Designing Vue.js components
I knew that **this thing would have a *lot* of inputs**. Inputs would be the main thing that users interact with, and will control the entire application. It would make the most sense to build a **re-usable input control component** that hosted the bulk of the repetitive logic that every single input would need.

**This component flexbily:**
- Accepts path options for where in the store to save its data, ensuring **unique store paths for each data point**
- Handles label text, input IDs, and **properly associating labels with their inputs**
- Accepts **instruction text** to display with any given input
- Accepts a **unit of measurement** to include with the saved value (like `px`)

Additionally, with the `for` prop, I can tell the input what object to nest its path value under. This is important in the code generation step, as there are several places we want to apply the inline styles when generating the final code (for example, will this style go on a character speech span, or will it go on the table's overall wrapping `div`?).

You can [check out the code for this component](https://github.com/vanessasickles/table-generator/blob/master/src/components/StyleInput.vue) in the project files, but here's a cross-section of a few different types of inputs this component supports:

```js
// A color input that saves its value to the speechStyles object ("for") to the "color" path
<StyleInput type="color" label="Speech Text Color" path="color" for="speech" />

// A text input that saves its value to the speechStyles object ("for") to the "fontFamily" path
<StyleInput type="text" label="Font Family" path="fontFamily" for="speech" />

// A text input that saves its value to the speechStyles object ("for") to the "lineHeight" path.
// The "attributes" prop allows passing standard HTML attributes,
// allowing for fully customizing the input.
<StyleInput type="number" label="Line Height" path="lineHeight" :attributes="{
    step: '0.25',
    min: '0.75',
    max: 2
}" for="speech" />

// A text input that saves its value to the speechStyles object ("for") to the "fontWeight" path.
// Uses an object to denote values and labels for radios and selects
// Instruction text can also be added!
<StyleInput type="select" label="Font Weight" path="fontWeight" for="speech" :options="[
    { label: 'light', value: '200' },
    { label: 'normal', value: 'normal'},
    { label: 'thicker', value: '600'},
    { label: 'bold', value: 'bold'},
    { label: 'bolder', value: '900'}
]" 
    instructions="Some options not make a difference depending on which weights are available in your font!"
/>
```

Overall, it was very fun to find areas to upgrade and componentize as I went along. I think the final process for adding new inputs is extremely swift and painless, which was perfect for iterating and adding features!

### Providing code for the user-created table
Modifying a visual of your table is nice, but users need to be able to walk away with usable code! The last leg of the app was creating a section where users can generate and copy their codes with ease.

A common feature on these sites is a way to save your tables and easily select them, so the app generates the code in chunks that match up 1:1 with the fields that particular feature asks for to reduce copy and paste errors. I also included handy copy buttons for easy transfer.

<figure>
  <img src="/assets/images/table-generator-code.gif" alt="An animated GIF showing the feature that lets you generate and copy the final table codes">
  <figcaption>The "Generate Code" function, which outputs the sectioned inline HTML & CSS for your table, as well as easy buttons for copying the code blocks!</figcaption>
</figure>

**You might be wondering:** *why **inline styles**, rather than generating classes in a `style` tag and applying them?* This is because this particular forum software will either strip `style` tags or break them by adding `br` elements on the line breaks within a style tag. Because of this, inline styles are necessary for posting tables. It's not pretty in the final markup, but it works for usability for this medium!

## Check it out live!
There's [a working Netlify app](https://vue-table-generator.netlify.app/) where you can check out the generator and play around with it yourself! Note that the app is **mostly unstyled** except for major layout placement; styles were intended to be a custom-crafted upsell for those purchasing the code on Gumroad, but some will likely be coming soon to give it a more designed look standing on its own!