---
layout: layouts/post.html
pageTitle: Portfolio Site with 11ty, Tailwind&shy;CSS
date: 2025-10-09
fullTitle: Building a Portfolio Site with 11ty, Tailwind CSS, JavaScript, and Vite
blurb: After many years, I felt that I needed a new portfolio site to showcase my work. I wanted to create something new and starkly different from anything I'd created before, so I branched out into something more minimal and typographic. I experimented with a static site generator that had always interested me, and focused on a layout that emphasizes my tech stack and experience.
tags: project
githubUrl: https://github.com/vanessasickles/2025-portfolio-11ty
tech:
- 11ty
- Vite
- TailwindCSS
- JavaScript
- Git
- HTML
- CSS
---

## Features
- Static 11ty site deployed with Netlify
- Site **fully responsive** on all devices
- **Dark and light themes** that respect your device's `prefer-color-scheme` setting
- Dynamic **JavaScript highlighting of projects and experiences** that uses hovered tech
- **A focus on accessibility,** including focus effects, skipnav links, and intuitive content ordering
- ...and more!

## Choosing the right tech
When deciding how to solve a problem, I try to avoid using my tech stack as a hammer that turns everything into a nail. Instead, I try to assess and reach for the correct tool for any given problem.

To do this, I looked at what aspects were most important to me for a portfolio site:
- **Speed.** As a developer, I am always conscious about the impact of page load speed and response time on user experience. I wanted a framework that is fast and lightweight, and uses minimal resources.
- **Maintainability.** The most painful part of portfolio sites for me has always been maintenance. Developing an initial product is always fun, but the more tedious it is to add new projects, the less likely I know that I will be to do it. This also goes for how easy it is to deploy new changes.
- **Cleanliness and responsiveness.** Knowing that this would be an important showcase of skills for my frontend capabilities, I wanted to ensure that I could create something simple and brutally focused.
- **Fun.** Even though I wanted to create something fully functional, I also wanted to have fun building it, and make it fun to use! At the end of the day, I love coding, and I want to have a blast and learn new things while building it.

### Choosing a base framework
With this criteria in mind, I assessed a few options for what I wanted to use for my base framework for my site. 

- **WordPress.** I've spent many years building custom solutions in the WordPress ecosystem. Blocks have become especially powerful out of the gate in recent years, and I know that I can build a good solution for any type of content with post types, blocks, and Advanced Custom Fields. The block editor would make it easy to add and update new content. However, after hosting hobby WordPress sites for many years, I know that it comes with some challenges. Hosting becomes more expensive when you factor in PHP and a database, and you have to ensure the site stays functional through mandated PHP upgrades imposed by shared hosts. Overall, I decided that WordPress is a bit too heavy for my purposes; after all, I'm just one person updating a personal portfolio, not a design agency.
- **Laravel or Astro/Next.js.** As a long-time Laracast subscriber, I find myself inspired every time I pop back in to learn something new. I've always wanted to do more Laravel work. In a similar vein, I've also been really excited by the speed of server-side rendering capabilities of frameworks Astro and Next.js. While I considered these really good options and tools that I want to explore for future projects, I know that they are versatile rabbit holes of possibility and customizability that I can get lost in. However, these remain as really potent options that I'm interested in exploring.
- **11ty.** Over the years, I've heard a lot of good things about 11ty, from its versatility to its incredible speed. I've always wanted to try one of the many static site generators that had been popularized over the last decade, and I'd seen a few inspirational-to-me developers accomplish their own awesome sites with 11ty. The most appealing thing to me was the ability to write content in Markdown. This would make it especially fun and easy to upkeep and write in to me.

**I chose 11ty** for the promise of speed, the simplicity of creating, and its flexibility. So far, I have not been disappointed. It has been exceptionally easy to set up, and I've been extremely impressed by the capabilities of front matter for supplying data so that I can keep things DRY. It's lovely.

### Choosing a compiler
In the ever-growing landscape of web development, I've seen the pages turn on many compilers as they rise into and fall out of the spotlight. Grunt, Babel, Webpack -- you name it. I've had plenty of experience with Webpack in my professional environments, but have also seen some teams make splendid use of Laravel Mix and Vite. With 11ty decided, **I landed on Vite** because of its brilliant speed, 11ty's pain-free Vite plugin, and Tailwind's similarly pain-free Vite package.

### Why TailwindCSS?
I used [TailwindCSS](https://tailwindcss.com/) at my first job and **loved it**. I became accustomed to the speed in which I was able to quickly apply CSS properties. Once you get used to Tailwind's syntax, it literally lets you fly through applying CSS properties in minimal strokes. Having to return to typing out full properties in my second job felt like a sad, miserable slog. Additionally, it scales in `rem` units right off the bat, making it easy to structure a mathematical rhythm for hierarchy in a design system. 

I knew that if I wanted to have fun with this project, I'd want to return to TailwindCSS. It's come with the additional benefit of witnessing first-hand just how far the framework has come; the ease of customizability now is truly impressive.

Tailwind's bundled `tailwindcss/nesting` plugin has `postcss-nested` built in, which I'd reach for anyway to give me the nesting capabilities I'm used to with SASS.

Now, you might notice that unlike a normal Tailwind site, the markup is still fairly readable. This is because I use [Tailwind's `@apply` syntax](https://tailwindcss.com/docs/functions-and-directives#apply-directive) to apply their utility classes in the site's CSS files rather than adding them inline. This keeps the DOM fairly clean and readable, while letting me iterate insanely fast with minimal keystrokes in my CSS file.

Yes, I know that some years ago, this was considered [a deeply-regretted anti-pattern by the creator of Tailwind](https://x.com/adamwathan/status/1559250403547652097). There's a variety of pros and cons to inline utility classes, and I am happy to use them inline for any project with more granular templating that enables my code to remain DRY. But for my purposes, I highly value readability in my markup for my personal projects, and once you get to more than a few utility classes, the markup becomes difficult to read and modify in a template. It pulls you out of a flow state to slow down and figure out which element you're looking at, which for more complicated layouts, can become quite overwhelming. So I like using `@apply`. Thanks, Adam. Sorry about your hundreds of thousands of dollars, Adam.

Anyway. That aside! I like Tailwind. So I used Tailwind!

## Deciding on design
My design and agency background instilled a very ritualistic process for projects in me from very early on. **You spec features, you design, you develop.** However, when I started working on my own personal projects outside of other mandated structures, I realized that my brain doesn't always function that way. In practice, I'd sit down to start on a design and get "stuck" on the pressure of feeling like I had to create something totally *new*.

That's exactly what happened with this project. It's easy for me to design and build for everyone else -- they have branding, they have a style, and I just need to **create the best user experience I can that matches their brand**. But what represents *me?* That's a harder question for me to answer.

In more recent years, to get "unstuck", **I've just started building**. Building gets me into the flow, rewarding me with exciting challenges to solve right off the bat, and if I need to go back to the drawing board for anything, I can. It also lets me get a feeling for how my scope will creep and what I want to build for fun in the future that I might need to visually plan for. So I just started building instead. I got 11ty set up, got my lightning-fast build system figured out, and scaffolded my base CSS the way I like. All was well!

### The issue with winging it
**But this methodology came with another problem.** I wanted something new, but without anything planned, I started falling back into old patterns and old designs. Standard floating top navigation, centered content container, "Hi, I'm Vanessa" banner, skills section, projects section, contact. And it just felt-- boring. Just so, so lame. Intro banners always feel so awkward on a site where you're not totally sure who you're talking to. Of course, I'm building this to appeal to potential employers, but everyone has their individual vibes and if they're landing on my website, it's going to be from a place they already know my name and my summary (LinkedIn, resume, application). Is it really worth it to re-iterate so verbosely?

From there, **I started asking more questions.** Do I really need a whole navigation bar for what's basically a Single Page Application? Is that a good use of screen real-estate? Who does that serve? Who finds it fun or useful when a navigation item is just an anchor link to something you've already read instead of taking you to a new page with more info? I certainly don't.

So I went back to the drawing board. I looked at other portfolios for examples, and saw much of the format I was tired of repeated over and over. A part of me wondered if maybe there was a reason for that. What if this convention exists because it's a working strategy? Anecdotally, many of the portfolios that I saw in this layout belonged to either student, introductory, or freelance developers. Even as I looked through them, they all blended together; despite their names being front-and-center, I couldn't remember any that stuck out to me. The ones I *did* remember were the ones that broke out of this mold, not the ones that fit into it. So this gave me the confidence I needed to **break out of this observed convention and into trying something new.**

### Asking the right questions
As always in design, content is king and less is more. So what if I started with the **bare minimum** that I needed and built up from there? This is how the typographical theme came about.

I started asking new questions that would inform my design:
- What *content* are potential employers looking for on my portfolio?
- What *skills* are potential employers wanting me to exhibit in the execution of my portfolio?
- What *actions* do I want potential employers to take after arriving?

### Answering the right questions
I thought about what potential employers would look for right off the bat: my tech stack, my work, and my experience. A recruiter or a tech lead will look for the stack they're using and the level of experience they're working for, and will look for projects and experience that exhibit that skill. So: big and bold skills it is, first after the intro in the left column.

As a software developer with a love for frontend and a passion for accessibility, I want to make sure that my site is **responsive, accessible, and easy to use.** The site is responsive on all devices, respects your device's light & dark settings, as well as your reduced motion settings. For some flair, I used JavaScript to implement the lovely [Rough Notation](https://github.com/rough-stuff/rough-notation) package for hover effects, giving some playful variety to the otherwise geometric and rigid design.

Then, finally, **I want employers to see my work**, and then hopefully contact me. To help with this, I figured I could keep my LinkedIn present at all times in the left sidebar. While this started as an icon in my original design, I later expanded this to a more clear action item button in order to reduce friction.

With all of this in mind, this time I mocked up a **very rough wireframe in Figma**. Since this was the equivalent of jotting something down in a sketchbook, I didn't worry about character styles, exact measurements, or even accessible colors; I just slapped things down willy-nilly to get the idea out of my brain and onto a visual.

<figure>
  <img src="/assets/images/portfolio-design.png" alt="A screenshot of the Figma design comp for this site">
  <figcaption>The rough Figma wireframe. Not perfect, but perfect is the enemy of finished for me!</figcaption>
</figure>

## Development retrospective
First and foremost, **wow, 11ty is fun.** A lot of the limitations I worried that I'd run into with a static site generator, 11ty mitigated completely with their wonderful <a href="https://www.11ty.dev/docs/data-frontmatter/" target="_blank">front matter data</a> system. It was wonderfully intuitive, and exactly the right mixture of code-and-markdown I'm looking for. Solutions for issues were easy to find, and the `.eleventy.js` file was super easy to augment. Every plugin I plopped in was documented consistently and usefully, and Just Worked Every Time. I was able to painlessly build or add features gradually as I needed them.

Big shoutouts to the following 11ty community plugins for making it so that I didn't have to reinvent the wheel on some wonderful QOL features:
- [eleventy-plugin-icons](https://github.com/uncenter/eleventy-plugin-icons) for giving an easy template shortcode to import SVG icons inline into content, as I try to avoid Font Awesome like the plague nowadays for personal projects
- [markdown-it-anchor](https://github.com/valeriangalliat/markdown-it-anchor) for automatically generating anchor links for headings
- [eleventy-plugin-toc](https://github.com/jdsteinbach/eleventy-plugin-toc) for automatically generating a table of contents based off of those anchored headings, because I'm an absolute sucker for anything that makes it easier to skim the content of a page
- [eleventy-plugin-syntaxhighlight](https://github.com/11ty/eleventy-plugin-syntaxhighlight) for syntax highlighting for code blocks, as well as the [prism-duotone-sea theme](https://github.com/PrismJS/prism-themes/blob/master/themes/prism-duotone-sea.css) that I modified to my site's palette.

It was fun to check out v4 of TailwindCSS and see how much the framework has grown. I remember having to edit a several-thousand-line commented file of theme variables in older Tailwind projects, so it was nice to be able to easily override and add utilities with the `@theme` and `@utility` directives.

[Rough Notation](https://github.com/rough-stuff/rough-notation) was a real treat to work with. I'm usually picky on styling for these kinds of effects, but it just looked good right out of the box, and I had very few issues. I actually had to be careful to not over-use the effects because they are simply just that fun.

The JavaScript for the tech highlighting feature was simple but fun. I index the project and experience elements in an object to organize their elements and extract their attached data properties, then attach event listeners that show and hide the already-instantiated annotations when requested. Normally, I'd reach for class-based addition and subtraction for a highlighting feature like this, but since Rough Notation draws the SVGs with JavaScript, they don't have that kind of option available. It was still lovely and easy enough, even then, and it's very snappy.