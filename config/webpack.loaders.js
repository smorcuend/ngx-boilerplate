const helpers = require('./helpers');
/*
 * Json loader support for *.json files.
 *
 * See: https://github.com/webpack/json-loader
 */
const JsonLoader = () => {
  return {
    test: /\.json$/,
    loader: 'json-loader'
  }
};

/*
 * to string and css loader support for *.css files
 * Returns file content as string
 *
 */
const CssLoader = () => {
  return {
    test: /\.css$/,
    loaders: ['to-string-loader', 'css-loader']
  }
};

const SassLoader = () => {
  return {
    test: /\.scss$/,
    loaders: [
      'style',
      'css',
      'postcss',
      'sass'
    ]
  }
};

// Bootstrap 4
const BootstrapLoader = () => {
  return {
    test: /bootstrap\/dist\/js\/umd\//,
    loader: 'imports?jQuery=jquery'
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
    loader: 'file'
  }
};

const SvgLoader = () => {
  return {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url?limit=10000&mimetype=image/svg+xml'
  }
};

const WoffLoader = () => {
  return {
    test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url?limit=10000&mimetype=application/font-woff'
  }
};
const TtfLoader = () => {
  return {
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url?limit=10000&mimetype=application/octet-stream'
  }
};
const EotLoader = () => {
  return {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'file'
  }
};

module.exports = {
  JsonLoader: JsonLoader,
  CssLoader: CssLoader,
  SassLoader: SassLoader,
  BootstrapLoader: BootstrapLoader,
  HtmlLoader: HtmlLoader,
  ImageLoader: ImageLoader,
  SvgLoader: SvgLoader,
  WoffLoader: WoffLoader,
  TtfLoader: TtfLoader,
  EotLoader: EotLoader,
  // JavascriptLoader: JavascriptLoader,
  // TsLintLoader: TsLintLoader,
  // TypescriptLoader: TypescriptLoader
};
