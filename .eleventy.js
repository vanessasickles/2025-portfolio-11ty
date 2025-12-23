
import EleventyVitePlugin from '@11ty/eleventy-plugin-vite'
import pluginIcons from 'eleventy-plugin-icons'
import tailwindcss from '@tailwindcss/vite'

import { default as markdownIt } from 'markdown-it'
import markdownItAnchor from 'markdown-it-anchor'
import pluginTOC from 'eleventy-plugin-toc'
import syntaxHighlight from "@11ty/eleventy-plugin-syntaxhighlight"

// Initiliaze the markdown-it parser, and modify the link rules to set target blank
// @see https://github.com/markdown-it/markdown-it/blob/master/docs/architecture.md#renderer
const md = markdownIt({ html: true }).use(markdownItAnchor)
var defaultRender = md.renderer.rules.link_open || function (tokens, idx, options, env, self) {
  return self.renderToken(tokens, idx, options)
};

md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  // Add a new `target` attribute, or replace the value of the existing one.
  tokens[idx].attrSet('target', '_blank')

  // Pass the token to the default renderer.
  return defaultRender(tokens, idx, options, env, self)
};

export default function (eleventyConfig) {
	eleventyConfig.addPlugin(EleventyVitePlugin, {
		viteOptions: {
			plugins: ['tailwindcss/nesting', tailwindcss()],
			esbuild: {
				supported: {
					'top-level-await': true
				},
				minify: true
			}
		},
	})
	eleventyConfig.addPlugin(pluginIcons, {
		mode: 'inline',
		sources: [
			{
				name: 'custom',
				path: './src/assets/icons',
				default: true,
				class: (name, source) => `icon icon-${name}`,
			}
		]
	})
	eleventyConfig.addPlugin(syntaxHighlight)

	eleventyConfig.addPassthroughCopy('src/assets')
	eleventyConfig.addPassthroughCopy('favicon.ico')
	eleventyConfig.addPassthroughCopy('manifest.webmanifest')

	// Automatically add anchor links to headings, and parse the table of contents
	eleventyConfig.setLibrary(
		'md',
		md
	)

	eleventyConfig.addPlugin(pluginTOC, {
		tags: ['h2', 'h3', 'h4'],
		wrapper: 'div',
		wrapperClass: 'table-of-contents'
	})

	function classify(string) {
		return string.replace(/[., ]/g, '-').toLowerCase() 
	}

	// Liquid filter for making text class-safe
	eleventyConfig.addLiquidFilter("classify", function(string) {
		return classify(string)
	})

	// Liquid filter for turning an array into a comma-separated string
	eleventyConfig.addLiquidFilter("arrayCommaJoin", function(array) {
		return array.join(",")
	})

	// Liquid filter for escaping text for use in an HTML attribute
	eleventyConfig.addLiquidFilter("escape", function(string) {
		return string
			.replaceAll("&", "&amp;")
			.replaceAll("<", "&lt;")
			.replaceAll(">", "&gt;")
			.replaceAll('"', "&quot;")
			.replaceAll("'", "&#039;")
	})

	eleventyConfig.addFilter('markdownify', (markdownString) => md.render(markdownString))

	return {
		dir: {
			input: 'src'
		}
	}
};