
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

	return {
		dir: {
			input: 'src'
		}
	}
};