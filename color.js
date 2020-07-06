const path = require('path');
const fs = require('fs');
const { generateTheme, getLessVars } = require('antd-theme-generator');

const themeVariables = getLessVars(path.join(__dirname, './src/styles/vars.less'))
const defaultVars = getLessVars('./node_modules/antd/lib/style/themes/default.less')
const darkVars = { ...defaultVars, ...getLessVars('./node_modules/antd/lib/style/themes/dark.less') };
const lightVars = { ...defaultVars, ...getLessVars('./node_modules/antd/lib/style/themes/compact.less') };
// fs.writeFileSync('./src/styles/dark.json', JSON.stringify(darkVars));
// fs.writeFileSync('./src/styles/light.json', JSON.stringify(lightVars));
// fs.writeFileSync('./src/styles/theme.json', JSON.stringify(themeVariables));

const options = {
  stylesDir: path.join(__dirname, './src'),
  antDir: path.join(__dirname, './node_modules/antd'),
  varFile: path.join(__dirname, './src/styles/vars.less'),
  themeVariables: Array.from(new Set([
    ...Object.keys(darkVars),
    ...Object.keys(lightVars),
    ...Object.keys(themeVariables)
  ])),
  outputFilePath: path.join(__dirname, './public/color.less'),
}

generateTheme(options).then(less => {
  console.log('Theme generated successfully');
})
  .catch(error => {
    console.log('Error', error);
  })