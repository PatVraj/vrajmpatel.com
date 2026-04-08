import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const experience = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/experience' }),
	schema: z.object({
		organization: z.string(),
		title: z.string(),
		period: z.string(),
		order: z.number(),
		location: z.string().optional(),
		logo: z.string().optional(),
		logoDark: z.string().optional(),
		logo2: z.string().optional(),
		logo2Dark: z.string().optional(),
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
			'Research',
		]),
		featured: z.boolean().optional(),
		order: z.number().optional(),
		tech: z.array(z.string()).optional(),
		github: z.string().url().optional(),
		link: z.string().url().optional(),
		paper: z.string().optional(),
		notebook: z.string().url().optional(),
		privateRepo: z.boolean().optional(),
		tags: z.array(z.string()).optional(),
		summary: z.string().optional(),
	}),
});

export const collections = { experience, projects };
