const { watch } = require('fs');
const path = require('path');

const webpack = require('webpack');

module.exports = {    
    mode: 'development',
    watch: true,    
    entry: './public/js/app.js',
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, './public/dist'),
    },    
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [ 
                            '@babel/preset-env',
                        ],                                       
                        
                    }
                    
                }
            }
        ]
    },
    
    


}