
import EleventyVitePlugin from '@11ty/eleventy-plugin-vite';
import pluginIcons from 'eleventy-plugin-icons';
import tailwindcss from '@tailwindcss/vite';

import { default as markdownIt } from 'markdown-it';
import markdownItAnchor from 'markdown-it-anchor';
import pluginTOC from 'eleventy-plugin-toc'

export default function (eleventyConfig) {
	eleventyConfig.addPlugin(EleventyVitePlugin, {
		viteOptions: {
			plugins: ['tailwindcss/nesting', tailwindcss()],
		},
	});
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
	});

	eleventyConfig.addPassthroughCopy('src/assets');

	// Automatically add anchor links to headings, and parse the table of contents
	eleventyConfig.setLibrary(
		'md',
		markdownIt().use(markdownItAnchor)
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

	return {
		dir: {
			input: 'src'
		}
	}
};