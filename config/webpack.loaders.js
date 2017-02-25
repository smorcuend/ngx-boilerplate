const helpers = require('./helpers');

/* Pre-Loaders */

const TsLintLoader = () => {
  return {
    test: /\.ts$/,
    enforce:'pre',
    loaders: 'tslint-loader'
  }
};

/* Loaders */

/*
 * Typescript loader support for .ts and Angular 2 async routes via .async.ts
 * Replace templateUrl and stylesUrl with require()
 *
 * See: https://github.com/s-panferov/awesome-typescript-loader
 * See: https://github.com/TheLarkInn/angular2-template-loader
 */
const TsLoader = (isProd) => {
  return {
    test: /\.ts$/,
    loaders: [
      '@angularclass/hmr-loader?pretty=' + !isProd + '&prod=' + isProd,
      'awesome-typescript-loader',
      'angular2-template-loader'
    ],
    exclude: [/\.(spec|e2e)\.ts$/, helpers.root('node_modules')]
  }
};

const SourceMapLoader = () => {
 return {
    enforce: 'pre',
    test: /\.js$/,
    loader: 'source-map-loader',
    exclude: [helpers.root('node_modules')]
  }
}


/*
 * to string and css loader support for *.css files
 * Returns file content as string
 *
 */
const CssLoader = () => {
  return {
    test: /\.css$/,
    loaders: [
      'to-string-loader',
      'css-loader'
    ]
  }
};

const SassLoader = () => {
  return {
    test: /\.scss$/,
    loaders: [
      'style-loader',
      'css-loader',
      'sass-loader'
    ]
  }
};

// Bootstrap 4
const BootstrapLoader = () => {
  return {
    test: /bootstrap\/dist\/js\/umd\//,
    loader: 'imports-loader?jQuery=jquery'
  }
};

/* Raw loader support for *.html
 * Returns file content as string
 *
 * See: https://github.com/webpack/raw-loader
 */
const HtmlLoader = () => {
  return {
    test: /\.html$/,
    loader: 'raw-loader',
    exclude: [helpers.root('src/index.html')]
  }
};

/* File loader for supporting images, for example, in CSS files.
 */
const ImageLoader = () => {
  return {
    test: /\.(jpg|png|gif)$/,
    loader: 'file-loader'
  }
};

const SvgLoader = () => {
  return {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
  }
};

const WoffLoader = () => {
  return {
    test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url-loader?limit=10000&mimetype=application/font-woff'
  }
};
const TtfLoader = () => {
  return {
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
  }
};
const EotLoader = () => {
  return {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'file-loader'
  }
};

/* Post-Loaders */


module.exports = {
  TsLoader: TsLoader,
  TsLintLoader: TsLintLoader,
  SourceMapLoader: SourceMapLoader,
  // JavascriptLoader: JavascriptLoader,
  CssLoader: CssLoader,
  SassLoader: SassLoader,
  BootstrapLoader: BootstrapLoader,
  HtmlLoader: HtmlLoader,
  ImageLoader: ImageLoader,
  SvgLoader: SvgLoader,
  WoffLoader: WoffLoader,
  TtfLoader: TtfLoader,
  EotLoader: EotLoader,
};
