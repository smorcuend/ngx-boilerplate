const helpers = require('./helpers');
const plugins = require('./webpack.plugins');
const AOT = helpers.hasNpmFlag('aot');

/* Pre-Loaders */

const TsLintLoader = () => {
  return {
    test: /\.ts$/,
    enforce:'pre',
    use: 'tslint-loader'
  }
};

/* Loaders */

/*
 * Typescript loader support for .ts and Angular async routes via .async.ts
 * Replace templateUrl and stylesUrl with require()
 *
 * See: https://github.com/s-panferov/awesome-typescript-loader
 * See: https://github.com/TheLarkInn/angular2-template-loader
 */
const TsLoader = (isProd) => {
  return {
    test: /\.ts$/,
    use: [
      {
        loader: '@angularclass/hmr-loader',
        options: {
          pretty: !isProd,
          prod: isProd
        }
      },
      { // MAKE SURE TO CHAIN VANILLA JS CODE, I.E. TS COMPILATION OUTPUT.
        loader: 'ng-router-loader',
        options: {
          loader: 'async-import',
          genDir: 'compiled',
          aot: AOT
        }
      },
      {
        loader: 'awesome-typescript-loader',
        options: {
          configFileName: 'tsconfig.webpack.json'
        }
      },
      {
        loader: 'angular2-template-loader'
      }
    ],
    exclude: [/\.(spec|e2e)\.ts$/]
  }
};

const JSONLoader = () => {
  return {
    test: /\.json$/,
    use: 'json-loader'
  }
}

/*
 * to string and css loader support for *.css files
 * Returns file content as string
 *
 */
const CssLoaders = () => {
  return [
    {
      test: /\.css$/,
      exclude: helpers.root('src', 'app'),
      loaders: plugins.ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
    },
    {
      test: /\.css$/,
      include: helpers.root('src', 'app'),
      loaders: ['css-to-string-loader','css-loader']
    },
  ]
};

const SassLoaders = () => {
  return [
    {
      test: /\.scss$/,
      exclude: [
        helpers.root('node_modules'),
        helpers.root('src', 'app')
        ],
      loaders: [
        'to-string-loader',
        'style-loader',
        'css-loader',
        'resolve-url-loader',
        'sass-loader?sourceMap'
      ]
    },

    {
      test: /\.scss$/,
      include: helpers.root('src', 'app'),
      exclude: helpers.root('node_modules'),
      loaders: [
        'css-to-string-loader',
        //'raw-loader',
        'style-loader',
        'css-loader',
        'resolve-url-loader',
        'sass-loader?sourceMap'
        ]
    },
  ]
};

/* Raw loader support for *.html
 * Returns file content as string
 *
 * See: https://github.com/webpack/raw-loader
 */
const HtmlLoader = () => {
  return {
    test: /\.html$/,
    use: 'raw-loader',
    exclude: [helpers.root('src/index.html')]
  }
};

/*
 * File loader for supporting images, for example, in CSS files.
 */
const ImageLoader = () => {
  return {
    test: /\.(jpg|png|gif)$/,
    use: 'file-loader'
  }
};

/* File loader for supporting fonts, for example, in CSS files. */
const FontLoader = () => {
  return {
    test: /\.(eot|woff2?|svg|ttf)([\?]?.*)$/,
    use: 'file-loader'
  }
};

/* Post-Loaders */


module.exports = {
  TsLoader: TsLoader,
  TsLintLoader: TsLintLoader,
  JSONLoader: JSONLoader,
  CssLoaders: CssLoaders,
  SassLoaders: SassLoaders,
  HtmlLoader: HtmlLoader,
  ImageLoader: ImageLoader,
  FontLoader: FontLoader
};
