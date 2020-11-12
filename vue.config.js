// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
  transpileDependencies: ['vuetify'],
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src/'),
      },
    },
  },
}
