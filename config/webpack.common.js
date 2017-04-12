const helpers = require('./helpers');

const webpack = require('webpack');
const ngcWebpack = require('ngc-webpack');

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
const AOT = helpers.hasNpmFlag('aot');
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
      'main':      AOT ? './src/main.browser.aot.ts' :
                  './src/main.browser.ts'

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
      extensions: ['.ts', '.js', '.json'],

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

        // loaders.SourceMapLoader(),

        loaders.TsLintLoader(),
        loaders.TsLoader(isProd),
        loaders.CssLoader(),
        loaders.SassLoader(),
        // loaders.BootstrapLoader(),
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

      // Common chunks creation
      new plugins.CommonsChunkPlugin({
        name: 'polyfills',
        chunks: ['polyfills']
      }),
      // This enables tree shaking of the vendor modules
      new plugins.CommonsChunkPlugin({
        name: 'vendor',
        chunks: ['main'],
        minChunks: module => /node_modules/.test(module.resource)
      }),
      // Specify the correct order the scripts will be injected in
      new plugins.CommonsChunkPlugin({
        name: ['polyfills', 'vendor'].reverse()
      }),

      /*
       * Plugin: ForkCheckerPlugin
       * Description: Do type checking in a separate process, so webpack don't need to wait.
       *
       * See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
       */
      new plugins.CheckerPlugin(),

      plugins.CopyWebpackPluginInstance,
      plugins.HtmlWebpackPluginInstance,
      plugins.HtmlElementsPluginInstance,
      plugins.AssetsPluginInstance,
      plugins.ProvidePluginInstance,
      plugins.ContextReplacementPluginInstance,

            // Fix Angular 2
      new plugins.NormalModuleReplacementPlugin(
        /facade(\\|\/)async/,
        helpers.root('node_modules/@angular/core/src/facade/async.js')
      ),
      new plugins.NormalModuleReplacementPlugin(
        /facade(\\|\/)collection/,
        helpers.root('node_modules/@angular/core/src/facade/collection.js')
      ),
      new plugins.NormalModuleReplacementPlugin(
        /facade(\\|\/)errors/,
        helpers.root('node_modules/@angular/core/src/facade/errors.js')
      ),
      new plugins.NormalModuleReplacementPlugin(
        /facade(\\|\/)lang/,
        helpers.root('node_modules/@angular/core/src/facade/lang.js')
      ),
      new plugins.NormalModuleReplacementPlugin(
        /facade(\\|\/)math/,
        helpers.root('node_modules/@angular/core/src/facade/math.js')
      ),

      
      new ngcWebpack.NgcWebpackPlugin({
        disabled: !AOT,
        tsConfig: helpers.root('tsconfig.webpack.json'),
        resourceOverride: helpers.root('config/resource-override.js')
      })

    ]

  };
}
