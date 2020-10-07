// @ts-check
"use strict";

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = "development";
process.env.NODE_ENV = "development";

// Makes the script crash on unhandled rejections instead of silently
// ignoring them. In the future, promise rejections that are not handled will
// terminate the Node.js process with a non-zero exit code.
process.on("unhandledRejection", (err) => {
    throw err;
});

const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const webpackConfig = require("../config/webpack.config");

const port = process.env.PORT || 57999;

const compiler = webpack(webpackConfig);
const serverConfig = {
    clientLogLevel: "silent",
    compress: true,
    contentBase: false,
    disableHostCheck: true,
    headers: {
        "Access-Control-Allow-Origin": "*",
    },
    // Allow binding to any host (localhost, jdoe-pc.latitudegeo.com, etc).
    host: "0.0.0.0",
    hot: false,
    https: true,
    port,
    publicPath: "/",
    stats: "minimal",
    sockHost: "localhost",
    watchOptions: {
        // Don't bother watching node_modules files for changes. This reduces
        // CPU/mem overhead, but means that changes from `npm install` while the
        // dev server is running won't take effect until restarted.
        ignored: /node_modules/,
    },
};

const devServer = new WebpackDevServer(compiler, serverConfig);
devServer.listen(serverConfig.port, serverConfig.host, (err) => {
    if (err) {
        throw err;
    }
});

["SIGINT", "SIGTERM"].forEach((signal) => {
    process.on(signal, () => {
        devServer.close(() => {
            process.exit();
        });
    });
});
