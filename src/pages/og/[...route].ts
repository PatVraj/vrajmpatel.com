import { OGImageRoute } from 'astro-og-canvas';
import { getCollection } from 'astro:content';

const collection = await getCollection('projects');
const pages = Object.fromEntries(
  collection.map(({ id, data }) => [id, data])
);

export const { getStaticPaths, GET } = await OGImageRoute({
  param: 'route',
  pages,
  getImageOptions: async (_path, page: any) => ({
    title: page.title,
    description: page.summary || "Machine Learning & Backend Systems by Vraj Patel.",
    bgGradient: [[15, 23, 42], [30, 58, 138]], // Slate 900 to Blue 900
    font: {
      title: {
        weight: 'bold',
        families: ['Inter']
      },
      description: {
        weight: 'normal',
        families: ['Inter']
      }
    },
    fonts: [
      'https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-400-normal.ttf',
      'https://cdn.jsdelivr.net/fontsource/fonts/inter@latest/latin-700-normal.ttf'
    ]
  }),
});
