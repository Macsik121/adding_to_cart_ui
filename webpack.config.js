require('dotenv').config();
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const browserConfig = {
    mode: 'development',
    entry: { app: './browser/App.jsx' },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'public')
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: '/node_modules/',
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-react',
                                ['@babel/preset-env', {
                                    targets: {
                                        "edge": "17",
                                        "firefox": "60",
                                        "chrome": "67",
                                        "safari": "11.1"
                                    }
                                }]
                            ]
                        }
                    }
                ]
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

const serverConfig = {
    mode: 'development',
    entry: { server: './server/uiserver.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    target: 'node',
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-react',
                                ['@babel/preset-env', {
                                    targets: {
                                        "edge": "17",
                                        "firefox": "60",
                                        "chrome": "67",
                                        "safari": "11.1"
                                    }
                                }]    
                            ]
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            API_SERVER_ADDRESS: `'${process.env.API_SERVER_ADDRESS}'`
        })
    ],
};

module.exports = [browserConfig, serverConfig];
