module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/style/variables.scss";`,
      },
    },
  },
};
