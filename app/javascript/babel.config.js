module.exports = function (api) {
    api.cache(false);
  
    const presets = ["@babel/preset-env"]
    const plugins = [
        ['wildcard', {
            'exts': ["js", "es6", "es", "jsx", "javascript", "vue"]
        }],
        ["@babel/plugin-transform-runtime", {
                "regenerator": true
        }]
    ]
  
    return {
      presets,
      plugins
    };
}