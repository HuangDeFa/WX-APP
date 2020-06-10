
const path = require('path');
const config = require('./webpack.config');
const merge = require('webpack-merge');
const webpack = require('webpack');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports=merge(config,{
    mode:'production',
    devtool:"cheap-module-source-map",
    output:{
        filename:'js/[name].[contenthash].js'
    },
    optimization:{
        minimizer:[
            new OptimizeCssAssetsWebpackPlugin({
                cssProcessorOptions:{
                    safe:true
                }
            }),
           new TerserPlugin({
               terserOptions:{
                   compress:{
                    arrows: false,
                    collapse_vars: false,
                    comparisons: false,
                    computed_props: false,
                    hoist_funs: false,
                    hoist_props: false,
                    hoist_vars: false,
                    inline: false,
                    loops: false,
                    negate_iife: false,
                    properties: false,
                    reduce_funcs: false,
                    reduce_vars: false,
                    switches: false,
                    toplevel: false,
                    typeofs: false,
                    booleans: true,
                    if_return: true,
                    sequences: true,
                    unused: true,
                    conditionals: true,
                    dead_code: true,
                    evaluate: true
                   },
                   mangle:{
                       safari10:true
                   }
               },
               cache:true,
               parallel:true,
               sourceMap:true,
               extractComments:false
           })
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