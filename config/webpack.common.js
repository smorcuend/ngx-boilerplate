const webpack = require('webpack');
const helpers = require('./helpers');

/*
 * Webpack Loaders
 */
const loaders = require('./webpack.loaders');

/*
 * Webpack Plugins
 */
const plugins = require('./webpack.plugins');

/*
 * Webpack Constants
 */
const HMR = helpers.hasProcessFlag('hot');
const METADATA = {
  title: 'Angular2 Boilerplate by Seedtag',
  baseUrl: '/',
  isDevServer: helpers.isWebpackDevServer()
};

plugins.HtmlWebpackPluginInstance.options['metadata'] = METADATA;

/*
 * Webpack configuration
 *
 * See: http://webpack.github.io/docs/configuration.html#cli
 */
module.exports = function(options) {
  const isProd = options.env === 'production';
  return {

    /*
     * The entry point for the bundle
     * Our Angular.js app
     *
     * See: http://webpack.github.io/docs/configuration.html#entry
     */
    entry: {

      'polyfills': './src/polyfills.browser.ts',
      'vendor': './src/vendor.browser.ts',
      'main': './src/main.browser.ts'

    },

    /*
     * Options affecting the resolving of modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#resolve
     */
    resolve: {

      /*
       * An array of extensions that should be used to resolve modules.
       *
       * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
       */
      extensions: ['.ts', '.js', '.json', '.scss'],

      // An array of directory names to be resolved to the current directory
      modules: [
        helpers.root('src'), 'node_modules'
      ],

      alias: {
        jQuery: 'jquery/dist/jquery'
      }

    },

    /*
     * Options affecting the normal modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#module
     */
    module: {

      /*
       * An array of automatically applied loaders.
       *
       * IMPORTANT: The loaders here are resolved relative to the resource which they are applied to.
       * This means they are not resolved relative to the configuration file.
       *
       * See: http://webpack.github.io/docs/configuration.html#module-loaders
       */
      rules: [

        loaders.SourceMapLoader(),

        // loaders.TsLintLoader(),
        loaders.TsLoader(isProd),
        loaders.JsonLoader(),
        loaders.CssLoader(),
        loaders.SassLoader(),
        loaders.BootstrapLoader(),
        loaders.HtmlLoader(),
        loaders.ImageLoader(),
        loaders.SvgLoader(),
        loaders.WoffLoader(),
        loaders.TtfLoader(),
        loaders.EotLoader()

      ],

    },

    /*
     * Add additional plugins to the compiler.
     *
     * See: http://webpack.github.io/docs/configuration.html#plugins
     */
    plugins: [

      plugins.CopyWebpackPluginInstance,
      plugins.CommonsChunkPluginInstance,
      plugins.HtmlWebpackPluginInstance,
      plugins.ForkCheckerPluginInstance,
      plugins.HtmlElementsPluginInstance,
      plugins.AssetsPluginInstance,
      plugins.ProvidePluginInstance,
      plugins.ContextReplacementPluginInstance

    ]

  };
}
