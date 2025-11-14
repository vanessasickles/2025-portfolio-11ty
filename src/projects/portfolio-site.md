---
layout: layouts/post.html
pageTitle: Portfolio Site with 11ty, TailwindCSS
fullTitle: Building a Portfolio Site with 11ty, Tailwind CSS, JavaScript, and Vite
blurb: After many years, I felt that I needed a new portfolio site to showcase my work. I wanted to create something new and starkly different from anything I'd created before, so I branched out into something more minimal and typographic. I experimented with a static site generator that had always interested me, and focused on a layout that emphasizes my tech stack and experience.
tags: project
githubUrl: https://github.com/vanessasickles/2025-portfolio-11ty
liveUrl: url
tech:
- 11ty
- Vite
- TailwindCSS
- JavaScript
- Git
---

## Choosing the right tech
When deciding how to solve a problem, I try to avoid using my tech stack as a hammer that turns everything into a nail. Instead, I try to assess and reach for the correct tool for any given problem.

To do this, I looked at what aspects were most important to me for a portfolio site:
- **Speed.** As a developer, I am always conscious about the impact of page load speed and response time on user experience. I wanted a framework that is fast and lightweight, and uses minimal resources.
- **Maintainability.** The most painful part of portfolio sites for me has always been maintenance. Developing an initial product is always fun, but the more tedious it is to add new projects, the less likely I know that I will be to do it. This also goes for how easy it is to deploy new changes.
- **Clean and responsive.** Knowing that this would be an important showcase of skills for my frontend capabilities, I wanted to ensure that I could create something simple and brutally focused.
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
I used **TailwindCSS** at my first job and **loved it**. I became accustomed to the speed in which I was able to quickly apply CSS properties. Once you get used to Tailwind's syntax, it literally lets you fly through applying CSS properties in minimal strokes. Having to return to typing out full properties in my second job felt like a sad, miserable slog. Additionally, it scales in `rem` units right off the bat, making it easy to structure a mathematical rhythm for hierarchy in a design system. 

I knew that if I wanted to have fun with this project, I'd want to return to TailwindCSS. It's come with the additional benefit of witnessing first-hand just how far the framework has come; the ease of customizability now is truly impressive.

Tailwind's bundled `tailwindcss/nesting` plugin has `postcss-nested` built in, which I'd reach for anyway to give me the nesting capabilities I'm used to with SASS.

## Deciding on design
My design and agency background instilled a very ritualistic process for projects in me from very early on. **You spec features, you design, you develop.** However, when I started working on my own personal projects outside of other mandated structures, I realized that my brain doesn't always function that way. In practice, I'd sit down to start on a design and get "stuck" on the pressure of feeling like I had to create something totally *new*.

That's exactly what happened with this project. It's easy for me to design and build for everyone else -- they have branding, they have a style, and I just need to **create the best user experience I can that matches their brand**. But what represents *me?* That's a harder question for me to answer.

In more recent years, to get "unstuck", I've just started building. Building gets me into the flow, rewarding me with exciting challenges to solve right off the bat, and if I need to go back to the drawing board for anything, I can. It also lets me get a feeling for how my scope will creep and what I want to build for fun in the future that I might need to visually plan for. So I just started building instead. I got 11ty set up, got my lightning-fast build system figured out, and scaffolded my base CSS the way I like. All was well!

**But this methodology came with another problem.** I wanted something new, but without anything planned, I started falling back into old patterns and old designs. Standard floating top navigation, "Hi, I'm --" banner, skills section, projects section, contact. And it just felt-- boring. Just so, so lame. Intro banners always feel so awkward on a site where you're not totally sure who you're talking to. Of course, I'm building this to appeal to potential employers, but everyone has their individual vibes and if they're landing on my website, it's going to be from a place they already know my name and my summary (LinkedIn, resume, application).

From there, **I started asking more questions.** Do I really need a whole navigation bar for what's basically a Single Page Application? Is that a good use of screen real-estate? Who does that serve? Who finds it fun or useful when a navigation item is just an anchor link to something you've already read instead of taking you to a new page with more info? I certainly don't.

So I went back to the drawing board.