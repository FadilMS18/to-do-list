const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')



module.exports={
    entry:{
        main: './src/index.js'
    },
    output:{
        filename:'[name].bundle.js',
        path : path.resolve(__dirname, 'dist'),
        clean: true,
        assetModuleFilename : 'images/[hash][ext][query]'
    },
    plugins:[
        new HtmlWebpackPlugin({
            title:'To-Do-List',
            template:'./src/index.html',
            meta:{
                description:'To-Do-List the odin project',
                author:'FadilMs18',
            },
            inject:'body'
        })
    ],
    module:{
        rules:[
            {
                test:/\.css$/i,
                use:['style-loader', 'css-loader']
            },
            {
                test:/\.(png|jpg|jpeg|gif|svg)/i,
                type:'asset/resource'
            },
            {
                test:/\.html$/i,
                loader:'html-loader'
            }
        ]
    }
}