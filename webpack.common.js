const path = require("path");

module.exports = {
    entry: {
        eventPage: path.join(__dirname, "src/ts/eventPage.ts"),
        popup: path.join(__dirname, "src/tsx/index.tsx"),
        background: path.join(__dirname, "src/ts/background.ts")
    },
    output: {
        path: path.join(__dirname, "dist/js"),
        filename: "[name].js"
    },
    resolve: {
        modules: ["node_modules"],
        extensions: [".js", ".tsx", ".ts"]
    },
    module: {
        rules: [
            {
                exclude: /node_modules/,
                test: /\.tsx?$/,
                use: "ts-loader"
            },
            {
                exclude: /node_modules/,
                test: /\.css?$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader"
                    }
                ]
            }
        ]
    }
};