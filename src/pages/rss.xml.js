import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { config } from "../../my.config";

export async function GET(context) {
    const articles = await getCollection('articles');

  return rss({
    // `<title>` field in output xml
    title: config.SITE_TITLE,
    // `<description>` field in output xml
    description: config.SITE_DESCRIPTION,
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#contextsite
    site: context.site,
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports    
    items: articles.map((article) => ({
        title: article.data.title,
        description: article.data.excerpt || '',
        pubDate: article.data.pubDate || new Date(),
        link: `${config.SITE_ROOT}/${article.slug}/`,
      })),
    stylesheet: '/rss/pretty-feed-v3.xsl'
    // (optional) inject custom xml
    // customData: `<language>en-us</language>`,
  });
}
