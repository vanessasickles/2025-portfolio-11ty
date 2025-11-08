
import EleventyVitePlugin from '@11ty/eleventy-plugin-vite';
import pluginIcons from 'eleventy-plugin-icons';
import tailwindcss from '@tailwindcss/vite';

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