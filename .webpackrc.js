export default {
  proxy: {
    "/": {
     target: "http://192.168.1.109:7777/",
      //target: "http://localhost:8080/",
      changeOrigin: true,
      crossDomain:true,
      pathRewrite: { "^/": "" }
    }
  }
};
