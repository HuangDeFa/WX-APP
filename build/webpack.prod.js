
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
           filename:'[name].[contenthash].css',
           chunkFilename:'[name].[contenthash].css'
       })
    ],
    optimization:{
        minimizer:[
            new OptimizeCssAssetsWebpackPlugin({}),
        ],
        minimize:true,
        moduleIds:'hashed',
        namedModules:true,
        splitChunks:{
            chunks:'all',
            cacheGroups:{
                vendor:{
                    name:'vendor-chunk',
                    test:/node_modules/,
                    chunks:'initial'
                },
                common:{
                    chunks:'initial',
                    name:'common',
                    minChunks:2,
                    reuseExistingChunk:true
                }
            }
        }
    }
});