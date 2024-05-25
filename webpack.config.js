const path = require('path');

module.exports = {
    resolve: {
        fallback: {
            "stream": require.resolve("stream-browserify"),
            "http": require.resolve("stream-http"),
            "https": require.resolve("https-browserify"),
            "url": require.resolve("url/"),
            "zlib": require.resolve("browserify-zlib"),
            "util": require.resolve("util/"),
            "path": require.resolve("path-browserify"),
            "crypto": require.resolve("crypto-browserify"),
            "os": require.resolve("os-browserify/browser")
        }
    }
};
