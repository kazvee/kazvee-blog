const { DateTime } = require('luxon');
const navigationPlugin = require('@11ty/eleventy-navigation');
const rssPlugin = require('@11ty/eleventy-plugin-rss');

module.exports = (config) => {
  config.addPlugin(navigationPlugin);
  config.addPlugin(rssPlugin);

  config.addPassthroughCopy('css');
  config.addPassthroughCopy('static');

  config.setDataDeepMerge(true);

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
