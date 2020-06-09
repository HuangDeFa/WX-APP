/* eslint disable */
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const VueLoaderPlugin =  require('vue-loader/lib/plugin');

module.exports={
    entry:{
        polyfill:path.resolve('node_modules','@babel/polyfill'),
        app:path.resolve(__dirname,'../src/main.js')
    },
    output:{
        filename:"[name].js",
        path:path.resolve(__dirname,'../dist'),
        chunkFilename:'[name].bundle.js'
    },
    plugins:[
        new HtmlWebPackPlugin({
            template:path.resolve(__dirname,'../public/index.html')
        }),
        new CleanWebpackPlugin(),
        new VueLoaderPlugin()
    ],
    module:{
        noParse:/^(vue|vuex|vue-roter|vue-router-sync)$/,
        rules:[
            {
                test: /\.vue$/,         // npm i -D vue-loader vue-template-compiler vue-style-loader
                use:['cache-loader','thread-loader',{
                    loader:'vue-loader',
                    options:{
                        compilerOptions:{
                          preserveWhitespace:false
                        }
                    }
                  }],      // vue-loader 解析 Vue文件 ，vue-template-compiler 解析模板
                  include:[path.resolve(__dirname,"../src")],        //优化打包，减少webpack查找文件
                  exclude:/node_modules/
            },
            {
                test:/\.m?js$/,
                exclude: file => (
                    /node_modules/.test(file) &&
                    !/\.vue\.js/.test(file)
                  ),
                use:{
                    loader:'babel-loader',
                    options:{
                        presets:[
                            '@babel/preset-env'
                        ]
                    }
                }
            },
          {
              test:/\.scss$/,
              use:[
                  'vue-style-loader',
                  'style-loader',
                  'css-loader',
                  {
                      loader:'postcss-loader',
                      options:{
                          plugins:[require('autoprefixer')]
                      }
                  },
                  {
                      loader:'sass-loader',
                      options:{
                         //配置一个全局的样式
                          prependData:`@import "@/app.scss";`         
                      }
                  }
              ]
          },
          {
            test:/\.css$/,
            use:[
                "style-loader",
                "css-loader",
                {
                    loader:'postcss-loader',
                    options:{
                        plugins:[require('autoprefixer')]
                    }
                }
            ]
          } , 
          {
              test:/\.svg$/,
              include:[path.resolve(__dirname,'../src/icon/svg')],
              loader:'svg-sprite-loader',
              options:{
                symbolId:'icon-[name]'
              }
          },
         //文件处理 主要是： 多媒体文件 ，url-loader/file-loader
          {
            test: /\.(png|jpe?g|gif|webp|ico|svg)(\?.*)?$/,
            exclude:[path.resolve(__dirname,'../src/icon/svg')],
            use:[
                {
                    loader:'url-loader',
                    options:{
                        limit:4096,    //4M 超过4M使用后备的 file-loader
                        esModule:false,
                        fallback:{
                            loader:'file-loader',
                            options:{
                                name:"image/[name]/[hash:8].[ext]"
                            }
                        }
                    }
                }
            ]
          },
          {
            test:/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            use:[
                {
                    loader:'url-loader',
                    options:{
                        limit:4096,
                        fallback:{
                            loader:'file-loader',
                            options:{
                                name:'media/[name]/[hash:8].[ext]'
                            }
                        }
                    }
                }
                
            ]
          },
          {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
            use:[
                {
                    loader:'url-loader',
                    options:{
                        limit:4096,
                        fallback:{
                            loader:'file-loader',
                            options:{
                                name:'fonts/[name]/[hash:8].[ext]'
                            }
                        }
                    }
                }
            ]
          }
        ]
    },
    resolve:{
        alias:{
            "vue$":"vue/dist/vue.runtime.esm.js",
            "@":path.resolve(__dirname,'../src')
        },
        extensions:['.js','mjs','.vue','.json']
    }
}