/**
 * @type {import('next').NextConfig}
 */
const withPlugins = require('next-compose-plugins');
const withCSS = require('@zeit/next-css');
const withReactSvg = require('next-react-svg');
const withImages = require('next-images');

const path = require('path');

const svgPlugin = withReactSvg({
    include: path.resolve(__dirname, './public/images'),
    webpack(config, options) {
        return config;
    }
})

const imagesPlugin = withImages({})

const cssPlugin = withCSS({})

module.exports = withPlugins([
    cssPlugin,
    svgPlugin,
    imagesPlugin
    // [withImages],
    // withCSS({}),
    // withImages({}),
    // withReactSvg({
    //     include: path.resolve(__dirname, './public/images'),
    //     webpack(config, options) {
    //         return config
    //     }
    // })
]);