export default {
  proxy: {
    "/": {
     target: "http://140.143.206.61:8080/",
      //target: "http://localhost:8080/",
      changeOrigin: true,
      crossDomain:true,
      pathRewrite: { "^/": "" }
    }
  }
};
