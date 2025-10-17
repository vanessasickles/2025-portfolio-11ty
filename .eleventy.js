
import EleventyVitePlugin from '@11ty/eleventy-plugin-vite';
import tailwindcss from '@tailwindcss/vite'

export default function (eleventyConfig) {
	eleventyConfig.addPlugin(EleventyVitePlugin, {
		viteOptions: {
			plugins: [tailwindcss()],
		},
	});

	eleventyConfig.addPassthroughCopy('src/assets');

	return {
		dir: {
			input: 'src'
		}
	}
};