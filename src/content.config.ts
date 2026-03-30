import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const experience = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/experience' }),
	schema: z.object({
		organization: z.string(),
		title: z.string(),
		period: z.string(),
		order: z.number(),
	}),
});

const projects = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
	schema: z.object({
		title: z.string(),
		domain: z.enum([
			'Machine Learning',
			'Software Engineering',
			'Systems Infrastructure',
		]),
		featured: z.boolean().optional(),
		order: z.number().optional(),
	}),
});

export const collections = { experience, projects };
