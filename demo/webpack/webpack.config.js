const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/index.tsx',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].[contenthash].js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    'css-loader',
                ],
            },
            {
                test: /\.ts(x?)$/,
                exclude: /node_modules/,
                use: ['babel-loader', 'ts-loader'],
            },
            {
                test: /\.s[ac]ss$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    devServer: {
        static: path.join(__dirname, 'dist'),
        historyApiFallback: true,
        host: '0.0.0.0',
        port: 8001,
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/index.html',
            filename: './index.html',
        }),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css',
            ignoreOrder: false,
        }),
        new webpack.NormalModuleReplacementPlugin(
            // The pattern covers the package and its CSS
            // @react-pdf-viewer/core
            // @react-pdf-viewer/core/lib/styles/index.css
            /^@react-pdf-viewer\/[a-z-]+[\/lib\/styles]*[\/index.(css)]*$/,
            (resource) => {
                const request = resource.request;
                const pkgName = request.split('/')[1];

                switch (true) {
                    case request.endsWith('.css'):
                        resource.request = path.join(__dirname, `../../packages/${pkgName}/src/styles/index.scss`);
                        break;

                    default:
                        resource.request = path.join(__dirname, `../../packages/${pkgName}/src`);
                        break;
                }
            }
        ),
    ],
};
