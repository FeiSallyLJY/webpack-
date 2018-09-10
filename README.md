# webpack-
整理webpack打包的一些简单的操作步骤

1.什么是webpack
  它可以分析项目结构，找到JavaScript模块，以及其他浏览器不能运行的扩展语言
  例如：（less) 并将其转换和打包为合适的格式供浏览器使用
2.为什么使用webpack
  把js,css img 等（模块）打包；减少请求；
3.安装webpack
  还是通过npm下载
第一步
  npm init => package.json
第二步 安装webpack
  =======>全局安装（不推荐=>原因 =>框架更新太快）
    npm i (install) -g webpack@(版本号）
  ======> 局部安装（推荐）--save-dev 开发的模式去使用
    npm i --save-dev webpack@（版本号）学的（3.5.6）

4.用终端命令 实现 
   node_modules\.bin\webpack 打包(webpack 模块)
   app\main.js(入口)
   public\build_main.js(出口)
   node_modules\.bin\webpack app\main.js public\build_main.js
   但是!!
   
    用终端操作终归不好管理
    那么，webpack提供了一个配置文件 名字叫做webpack.config.js(规定)
    
    在package.json里面的script这个对象=>是一个自定义指令的位置==>我们可以简化命令实现打包
     "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack",
    "server": "webpack-dev-server --open"
   },
    npm 直接 key 是由限制的=====>
    如果不是npm自带的关键字，===>你需要 => npm run key


5.webpack 的强大功能 调试更简单
  source maps(可以使用打断点功能)
  打包之后的文件 如果配置了 source maps 可以看到依赖的代码
  ===========>在配置哪里webpack.config.js
  一共四种 devtool:'eval-source-map'
    第三种!// eval-source-map 偏中小型的一种
使用eval 打包源文件模块，在同一个文件中
生成一个干净完整source map。这个文件可以在不影响构建速度的前提下生成完整的sourcemap
但对打包后输出的JS文件的执行具有性能和安全的隐患。

在开发阶段这是一个非常好的选项，在生产阶段一定不要启用这个选项。

对小到中型的项目中，eval-source-map是一个很好的选项，!!!!!在此强调你只应该在开发阶段使用它
我们继续对上文新建的webpack.config.js,进行配置
(1)module.exports = {
    devtool:'eval-source-map',
    // 唯一的入口文件
    entry:__dirname + '/app/main.js',
    // 打包之后的文件该输出到哪个位置
    output:{
        path:__dirname + '/public',
        filename: 'build_main.js'
    },
}

代码热更新 => 创建自己的开发测试服务器
 (2) 在webpack.config.js,进行配置
   // devServer 2.9.5 启动自带热更新
    // 并且它会监测所依赖的模块是否修改
    // 我们update code=> 状态触发 => 重新打包 => 触发刷新
    devServer: {
        // 本地服务器所加载的页面所在的目录
        contentBase:'./public',
        // 服务器端口 => 默认端口 8080
        port:'8888'
    },
webpack提供一个本地开发服务器，这个服务器是基于node.js
不过这个模块需要下载 并且依赖一下
cnpm i --save-dev webpack-dev-server@2.9.5
webpack-dev-server => 3.0以上版本是为webpack4.0服务的
我们用2.9.5版本
命令：npm run server


webpack又一个强大功能
---loaders ===========>
通过使用不同的loader，webpack 有能力调用外部的工具和模块，
实现对不同格式文件的处理，比如说把es6=>es5;转化成现代浏览器兼容的js文件
==========>因为babel 一直就在干这个兼容性转义的，所以用babel  //https://www.babeljs.cn/

====> 下载babel的处理模块包
babel的安装和配置
babel的三个核心模块
babel-loader ===》让webpack知道babel如何运行
babel-core ===》让babel知道如何解析代码
babel-preset-env ===》可以根据不同的环境转换代码
cnpm i --save-dev babel-loader babel-core babel-preset-env
这个改一下版本：cnpm i --save-dev babel-loader@7.1.1
babel-loader ======> es6 进行转义 ==> (前端的export与export default 规范）


模块功能主要由两个命令构成：export和import。
export命令用于规定模块的对外接口，
import命令用于输入其他模块提供的功能。

   {
                // 必须要有 一个用以匹配loader所处理文件的扩展名的正则表达式
                test:/\.js$/,
                // 后面配置的是 loader的名称
                use:'babel-loader',
                // include / exclude 必须处理的文件和需要屏蔽的文件
                exclude:/node_modules/
            },
对css进行打包！！！
安装style-loader 和css-loader
cnpm i --save-dev style-loader css-loader
css-loader的版本号改成0.28.11

   // 安装style-loader 和css-loader
            {
                test:/\.css$/,
                // 配置多个loader的时候 use=> value 是 数组
                // 如果没有额外配置 直接String
                // 如果有 为json对象
                use:[
                    'style-loader',
                    {
                        loader:'css-loader',
                        options:{
                            // 把css 当成模块 => json对象来看待
                            modules:true,//指定启用css modules
                            //文件名   样式名   转换
                            localldentName:'[name]_[local]--[hash:base64:5]'//指定css的类名格式
                        }
                    }
                ]
            },
对图片进行打包
  // 打包图片 file-loader / url-loader
            {
                // 图片格式正则
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        // 配置 url-loader 的可选项
                        options: {
                            // 限制 图片大小 10000B，小于限制会将图片转换为
                            // base64格式
                            limit: 10000,
                            // 超出限制，创建的文件格式
                            // build/images/[图片名].[hash].[图片格式]
                            name: 'images/[name].[hash].[ext]'
                        }
                    }
                ]
            }
 下载的文件的一些版本号  
 
    "babel-core": "^6.26.3",
    "babel-loader": "^7.1.1",
    "babel-preset-env": "^1.7.0",
    "css-loader": "^0.28.11",
    "file-loader": "^2.0.0",
    "style-loader": "^0.23.0",
    "url-loader": "^1.1.1",
    "webpack": "^3.5.6",
    "webpack-dev-server": "^2.9.5"
