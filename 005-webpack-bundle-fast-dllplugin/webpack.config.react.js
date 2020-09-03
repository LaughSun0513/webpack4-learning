
const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: {
        react: ['react','react-dom']
    },
    output: {
        filename: '_dll_[name].js',
        path: path.resolve(__dirname, 'build'),
        library: '_dll_[name]', // _dll_react 
        // libraryTarget: 'var'
    },
    plugins: [
        new webpack.DllPlugin({
            name: '_dll_[name]', // name == library
            path: path.resolve(__dirname, 'build', 'manifest.json')
        })
    ]
}