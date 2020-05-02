const path = require('path');
const config = require('./webpack.config');
const merge = require('webpack-merge');
const webpack = require('webpack')

module.exports=merge(config,{
    mode:'development',
    devtool:'cheap-module-eval-source-map',
    devServer:{
        port:9900,
        hot:true,
        contentBase:'../dist'
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin()
    ]
});