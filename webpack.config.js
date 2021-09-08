const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')

const isDev = true//process.env.NODE_ENV === 'development'
const isProd = !isDev

const optimization = () => {
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }

    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetsWebpackPlugin (),
            new TerserWebpackPlugin ()
        ]
    }

    return config
}

const cssLoaders = extra => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                hmr: isDev,
                reloadAll: false,
                url: false,
            },
        },
        {
            loader:  'css-loader',
            options: {
                url: false,
            },
        }
    ]

    if(extra) {
        loaders.push(extra)
    }

    return loaders
}

//const filename = ext => isDev ? '[name].${ext}' : '[name].[hash].${ext}'

module.exports = {
    context: path.resolve(__dirname, './'),
    mode: 'development',
    entry: {
        script: './script.js',
    },
    output: {
        publicPath: '', // относительно папки
        filename: '[name].js',
        path: path.resolve(__dirname, './dist')
    },
    resolve: {
        extensions: ['.js','.css', '.scss', 'jpg']
    },
    optimization: optimization(),
    devServer: {
        port: 8888,
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html',
            minify: {
                collapseWhitespace: isProd
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'fonts'),
                    to: path.resolve(__dirname, 'dist/fonts')
                },
                {
                    from: path.resolve(__dirname, 'favicon.ico'),
                    to: path.resolve(__dirname, 'dist/favicon.ico')
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: cssLoaders(),
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader')
            },
            {
                test: /\.(png|jpg|jpeg|gif|svg|webp|avif)$/,
                use:  [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'images/',
                        publicPath:'images/'
                    }
                }]
            },
            /*{
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use:  [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/',
                        publicPath:'fonts/'
                    },
                }]
            },*/
        ]
    }
}