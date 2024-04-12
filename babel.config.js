module.exports = {
  presets: [
    ["@babel/preset-env", { targets: "defaults" }],
    "@babel/preset-react"
  ],
  plugins: [
    ["@babel/plugin-proposal-decorators", { decoratorsBeforeExport: true }]
  ]
};
