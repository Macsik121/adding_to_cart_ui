require('dotenv').config();
const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: { app: ['./src/App.jsx'] },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: 'babel-loader',
                exclude: '/node_modules/'
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            API_SERVER_ADDRESS: `'${process.env.API_SERVER_ADDRESS}'`
        })
    ],
    optimization: {
        splitChunks: {
            name: 'vendor',
            chunks: 'all'
        }
    }
}