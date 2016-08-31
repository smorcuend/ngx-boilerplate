const webpack = require('webpack');
const helpers = require('./helpers');
/*
 * Webpack Plugins
 */
// problem with copy-webpack-plugin
const CopyWebpackPluginInstance = require('copy-webpack-plugin');
const HtmlWebpackPluginInstance = require('html-webpack-plugin');
const ForkCheckerPluginInstance = require('awesome-typescript-loader').ForkCheckerPlugin;
const HtmlElementsPluginInstance = require('./html-elements-plugin');
const AssetsPluginInstance = require('assets-webpack-plugin');

const AssetsPlugin = new AssetsPluginInstance({
  path: helpers.root('dist'),
  filename: 'assets/webpack-assets.json',
  prettyPrint: true
});

/*
 * Plugin: ForkCheckerPlugin
 * Description: Do type checking in a separate process, so webpack don't need to wait.
 *
 * See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
 */
const ForkCheckerPlugin = new ForkCheckerPluginInstance();
/*
 * Plugin: CommonsChunkPlugin
 * Description: Shares common code between the pages.
 * It identifies common modules and put them into a commons chunk.
 *
 * See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
 * See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
 */
const CommonsChunkPlugin = new webpack.optimize.CommonsChunkPlugin({
  name: ['polyfills', 'vendor'].reverse()
});

/*
 * Plugin: CopyWebpackPlugin
 * Description: Copy files and directories in webpack.
 *
 * Copies project static assets.
 *
 * See: https://www.npmjs.com/package/copy-webpack-plugin
 */
const CopyWebpackPlugin = new CopyWebpackPluginInstance([{
  from: 'src/assets',
  to: 'assets'
}]);

/*
 * Plugin: HtmlWebpackPlugin
 * Description: Simplifies creation of HTML files to serve your webpack bundles.
 * This is especially useful for webpack bundles that include a hash in the filename
 * which changes every compilation.
 *
 * See: https://github.com/ampedandwired/html-webpack-plugin
 */
const HtmlWebpackPlugin = new HtmlWebpackPluginInstance({
  template: 'src/index.html',
  filename: 'index.html',
  chunksSortMode: 'dependency'
});

/*
 * Plugin: HtmlHeadConfigPlugin
 * Description: Generate html tags based on javascript maps.
 *
 * If a publicPath is set in the webpack output configuration, it will be automatically added to
 * href attributes, you can disable that by adding a "=href": false property.
 * You can also enable it to other attribute by settings "=attName": true.
 *
 * The configuration supplied is map between a location (key) and an element definition object (value)
 * The location (key) is then exported to the template under then htmlElements property in webpack configuration.
 *
 * Example:
 *  Adding this plugin configuration
 *  new HtmlElementsPlugin({
 *    headTags: { ... }
 *  })
 *
 *  Means we can use it in the template like this:
 *  <%= webpackConfig.htmlElements.headTags %>
 *
 * Dependencies: HtmlWebpackPlugin
 */
const HtmlElementsPlugin = new HtmlElementsPluginInstance({
  headTags: require('./head-config.common')
});

const ProvidePlugin = new webpack.ProvidePlugin({
  $: "jquery",
  jQuery: "jquery",
  "window.jQuery": "jquery",
  Tether: "tether",
  "window.Tether": "tether",
  Tooltip: "exports?Tooltip!bootstrap/js/dist/tooltip",
  Alert: "exports?Alert!bootstrap/js/dist/alert",
  Button: "exports?Button!bootstrap/js/dist/button",
  Carousel: "exports?Carousel!bootstrap/js/dist/carousel",
  Collapse: "exports?Collapse!bootstrap/js/dist/collapse",
  Dropdown: "exports?Dropdown!bootstrap/js/dist/dropdown",
  Modal: "exports?Modal!bootstrap/js/dist/modal",
  Popover: "exports?Popover!bootstrap/js/dist/popover",
  Scrollspy: "exports?Scrollspy!bootstrap/js/dist/scrollspy",
  Tab: "exports?Tab!bootstrap/js/dist/tab",
  Tooltip: "exports?Tooltip!bootstrap/js/dist/tooltip",
  Util: "exports?Util!bootstrap/js/dist/util",
});

const ContextReplacementPlugin = new webpack.ContextReplacementPlugin(
  /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
  __dirname
);

module.exports = {
  CopyWebpackPlugin: CopyWebpackPlugin,
  CommonsChunkPlugin: CommonsChunkPlugin,
  HtmlWebpackPlugin: HtmlWebpackPlugin,
  ForkCheckerPlugin: ForkCheckerPlugin,
  HtmlElementsPlugin: HtmlElementsPlugin,
  AssetsPlugin: AssetsPlugin,
  ProvidePlugin: ProvidePlugin,
  ContextReplacementPlugin: ContextReplacementPlugin

};
