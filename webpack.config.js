const path = require('path');

module.exports = {
    entry: './src/index.ts',
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.hbs$/i,
                loader: "html-loader",
                options: {
                    minimize: false,
                },
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
        alias: {
            handlebars : 'handlebars/dist/handlebars.js',
            Components: path.resolve(__dirname, 'src/components'),
            Controllers: path.resolve(__dirname, 'src/controllers'),
            Utils: path.resolve(__dirname, 'src/utils'),
        },
        fallback: {
            "fs": false
        },
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        library: {
            type: 'umd',
            umdNamedDefine: true,
            name: 'APQuestionInput',
        },
    },
};
