
const path = require('path');
const config = require('./webpack.config');
const merge = require('webpack-merge');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
module.exports=merge(config,{
    mode:'production',
    devtool:"cheap-module-source-map",
    output:{
        filename:'[name].[contenthash].js'
    },
    plugins:[
       new CopyWebpackPlugin([{
        from:path.resolve(__dirname,'../public'),
        to:path.resolve(__dirname,'../dist')
       }]),
       new MiniCssExtractPlugin({
           filename:'[name].[hash].css',
       }),
       
    ],
    optimization:{
        minimizer:[
            new UglifyJsPlugin({
                parallel:true,
                cache:true,
                sourceMap:true
            }),
            new OptimizeCssAssetsWebpackPlugin({}),
        ],
        moduleIds:'hashed',
        runtimeChunk:'single',
        minimizer:[],
        splitChunks:{
            chunks:'all',
            cacheGroups:{
                vendor:{
                    test:/node_modules/,
                    chunks:'initial'
                }
            }
        }
    }
});