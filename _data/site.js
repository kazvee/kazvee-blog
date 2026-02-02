module.exports = {
  meta: {
    title: "blog.kazvee.com",
    description: "A space where I collect notes, references, and project documentation as I learn and build.",
    lang: "en",
    siteUrl: "https://blog.kazvee.com/",
  },
  feed: { // used in feed.xml.njk
    subtitle: "blog.kazvee.com",
    filename: "atom.xml",
    path: "/atom.xml",
    id: "https://blog.kazvee.com/",
    authorName: "kazvee",
    authorEmail: ""
  },
  hero: { // used in hero section of main page ie. index.html.njk
    title: "blog.kazvee.com",
    description: "Welcome to my collection of notes, references, and project documentation. 🍁",
    logo: "/static/img/logo-image.png"
  }
}