const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    target: 'web',
    mode: 'development',
    entry: path.join(__dirname, 'src', 'app.js'),
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist'),
        assetModuleFilename: path.join('images', '[name].[contenthash][ext]'),
    },
    devServer: {
        open: true,
        static: {
            directory: path.join(__dirname, 'dist'),
            watch: true
        },
        watchFiles: ['src'],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src', 'index.html'),
            filename: 'index.html',
        }),
        new CopyWebpackPlugin({'patterns': [
            {from:'./src/images', to:'images'}
        ]}),
    ],
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                    ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            ]
    },
};
