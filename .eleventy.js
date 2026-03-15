const { DateTime } = require('luxon');
const navigationPlugin = require('@11ty/eleventy-navigation');
const rssPlugin = require('@11ty/eleventy-plugin-rss');
const markdownIt = require("markdown-it");
const markdownItAttrs = require("markdown-it-attrs");
require('dotenv').config();

module.exports = (config) => {
  require('dotenv').config();

  config.addGlobalData('UMAMI_URL', process.env.UMAMI_URL);
  config.addGlobalData('UMAMI_WEBSITE_ID', process.env.UMAMI_WEBSITE_ID);

  config.addGlobalData('CLOUDFLARE_TOKEN', process.env.CLOUDFLARE_TOKEN);

  config.addPlugin(navigationPlugin);
  config.addPlugin(rssPlugin);

  config.addPassthroughCopy('css');
  config.addPassthroughCopy('static');

  config.setDataDeepMerge(true);

  const md = markdownIt({
    html: true,
    linkify: true,
    typographer: true,
  }).use(markdownItAttrs);

  md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
    const token = tokens[idx];
    const hrefIndex = token.attrIndex("href");

    if (hrefIndex >= 0) {
      const href = token.attrs[hrefIndex][1];

      // Only external links
      if (href.startsWith("http") && !href.includes("kazvee.com")) {
        token.attrSet("target", "_blank");
        token.attrSet("rel", "noopener");
      }
    }

    return self.renderToken(tokens, idx, options);
  };


  config.setLibrary("md", md);

  config.addFilter("htmlDateString", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
  });

  config.addFilter("readableDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("dd LLL, yyyy");
  });

  config.addNunjucksFilter("dateObj", (dateString) => {
    if (!dateString) return null;
    return new Date(dateString);
  });

  config.addNunjucksFilter("date", (dateObj, format = "MMMM d, yyyy") => {
    if (!dateObj) return "";
    return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat(format);
  });

  config.addGlobalData("eleventyComputed", {
    updatedDate: (data) => {
      if (!data.updated) return null;
      return new Date(data.updated);
    }
  });

  config.addCollection("tagList", (collection) => {
    const tagsObject = {};
    collection.getAll().forEach((item) => {
      if (!item.data.tags) return;
      item.data.tags
        .filter(tag => !['post', 'all'].includes(tag))
        .forEach(tag => {
          if (typeof tagsObject[tag] === 'undefined') {
            tagsObject[tag] = 1;
          } else {
            tagsObject[tag] += 1;
          }
        });
    });

    const tagList = [];
    Object.keys(tagsObject).forEach(tag => {
      tagList.push({ tagName: tag, tagCount: tagsObject[tag] });
    });
    return tagList.sort((a, b) => b.tagCount - a.tagCount);
  });
};
