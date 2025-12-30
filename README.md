# Portfolio Site - 11ty, TailwindCSS, JavaScript
In 2025, I decided to rebuild my portfolio site with 11ty. It was an extremely fun project that showed me exactly why 11ty is a static site generator favorite; it was incredibly easy to work with, with some amazing community plugins to boot.

You can find the site [live here,](https://vanessasickles.dev/) or [read more about developing this site here](https://vanessasickles.dev/projects/portfolio-site/).

## Thanks to
Big shoutouts to the following 11ty community plugins for making it so that I didn't have to reinvent the wheel on some wonderful QOL features:
- [eleventy-plugin-vite](https://github.com/11ty/eleventy-plugin-vite) for letting me easily integrate Vite as my build system for my CSS, TailwindCSS, and minifying my JS
- [eleventy-plugin-icons](https://github.com/uncenter/eleventy-plugin-icons) for giving an easy template shortcode to import SVG icons inline into content, as I try to avoid Font Awesome like the plague nowadays for personal projects
- [markdown-it-anchor](https://github.com/valeriangalliat/markdown-it-anchor) for automatically generating anchor links for headings
- [eleventy-plugin-toc](https://github.com/jdsteinbach/eleventy-plugin-toc) for automatically generating a table of contents based off of those anchored headings, because I'm an absolute sucker for anything that makes it easier to skim the content of a page
- [eleventy-plugin-syntaxhighlight](https://github.com/11ty/eleventy-plugin-syntaxhighlight) for syntax highlighting for code blocks, as well as the [prism-duotone-sea theme](https://github.com/PrismJS/prism-themes/blob/master/themes/prism-duotone-sea.css) that I modified to my site's palette.

## Build
The plugin uses Vite for its build, with help from the [eleventy-plugin-vite](https://github.com/11ty/eleventy-plugin-vite) plugin.

To build for development:
```
npm run dev
```

To build for production:
```
npm run prod
```
