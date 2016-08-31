/**
 * Configuration for head elements added during the creation of index.html.
 *
 * All href attributes are added the publicPath (if exists) by default.
 * You can explicitly hint to prefix a publicPath by setting a boolean value to a key that has
 * the same name as the attribute you want to operate on, but prefix with =
 *
 * Example:
 * { name: 'msapplication-TileImage', content: '/assets/icon/ms-icon-144x144.png', '=content': true },
 * Will prefix the publicPath to content.
 *
 * { rel: 'apple-touch-icon', sizes: '57x57', href: '/assets/icon/apple-icon-57x57.png', '=href': false },
 * Will not prefix the publicPath on href (href attributes are added by default
 *
 */
module.exports = {
  link: [{
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/assets/img/isotipo.png"
    },
    {
      rel: "stylesheet",
      type: "text/css",
      href: "//cdnjs.cloudflare.com/ajax/libs/material-design-iconic-font/2.2.0/css/material-design-iconic-font.min.css"
    },
    {
      rel: "stylesheet",
      type: "text/css",
      href: "//fonts.googleapis.com/css?family=Open+Sans"
    },
    {
      rel: "stylesheet",
      type: "text/css",
      href: "/assets/spinner/spinner.css"
    }
  ],
  meta: [
    { name: 'msapplication-TileColor', content: '#00bcd4' },
    { name: 'theme-color', content: '#00bcd4' }
  ]
};
