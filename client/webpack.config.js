module.exports = {
  resolve: {
    fallback: {
      zlib: require.resolve('browserify-zlib'),
      querystring: require.resolve('querystring-es3'),
      path: require.resolve('path-browserify'),
      buffer: require.resolve('buffer'),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      http: require.resolve('stream-http'),
      url: require.resolve('url'),
      util: require.resolve('util'),
    },
  },
};
