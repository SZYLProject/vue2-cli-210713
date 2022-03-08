const TerserPlugin = require("terser-webpack-plugin"); // 用于在生成环境剔除debuger和console
const CompressionPlugin = require("compression-webpack-plugin"); // gzip压缩,优化http请求,提高加载速度
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
//   .BundleAnalyzerPlugin; // 代码分析工具
const path = require("path");
const resolve = dir => {
  return path.join(__dirname, dir);
};

// const env = process.env.NODE_ENV


const cdn = {
  // 开发环境
  dev: {
    css: [],
    js: []
  },
  // // 生产环境
  // build: {
  //   css: [
  //     // "https://cdn.bootcdn.net/element-ui/2.11.1/theme-chalk/index.css",
  //     "https://cdn.bootcdn.net/ajax/libs/element-ui/2.15.7/theme-chalk/index.min.css",
  //     "https://cdn.bootcdn.net/nprogress/0.2.0/nprogress.min.css"
  //   ],
  //   js: ["/static/js/vue/2.6.11/vue.min.js"]
  // },
  // 生产环境
  buildCDN: {
    css: [
      "https://lib.baomitu.com/element-ui/2.15.7/theme-chalk/index.css",
      "https://lib.baomitu.com/nprogress/0.2.0/nprogress.css"
    ],
    js: [
      "https://cdn.bootcdn.net/ajax/libs/vue/2.6.11/vue.min.js",
      "https://cdn.bootcdn.net/ajax/libs/vue-router/3.2.0/vue-router.min.js",
      "https://cdn.bootcdn.net/ajax/libs/vuex/3.6.2/vuex.min.js",
      "https://cdn.bootcdn.net/ajax/libs/axios/0.26.0/axios.min.js",
      "https://lib.baomitu.com/element-ui/2.15.7/index.js",
      "https://lib.baomitu.com/echarts/4.8.0/echarts-en.common.js",
      "https://lib.baomitu.com/nprogress/0.2.0/nprogress.js",
      "https://cdn.bootcdn.net/ajax/libs/js-cookie/2.2.1/js.cookie.min.js"
    ]
  }
};

module.exports = {
  // publicPath: process.env.NODE_ENV === "production" ? "/dist/" : "/",
  publicPath: process.env.NODE_ENV === "prodection" ? "./" : "./",
  outputDir: "./statistic", // 打包名称
  assetsDir: "static", // 存放文件路径
  filenameHashing: true, // false 来关闭文件名哈希
  lintOnSave: true, // 关闭eslint
  // 打包时不生成.map文件
  productionSourceMap: false,
  devServer: {
    open: false, // 自动打开浏览器
    // host: "0.0.0.0",
    port: 9900, // 开发端口号
    // 前端解决跨域问题，配置代理;
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: process.env.VUE_APP_BASE_URL,
        logLevel: "debug", // 请求打印真实ip
        changeOrigin: true,
        pathRewrite: {
          ["^" + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "~@/style/element-variables.scss";'
      }
    }
  },
  // webpack相关配置
  chainWebpack: config => {
    config.entry.app = ["./src/main.js"];
    config.resolve.alias
      .set("@", resolve("src"))
      .set("cps", resolve("src/components"));
    // 关闭npm run build之后，This can impact web performance 警告
    config.performance.set("hints", false);
    // 移除 prefetch 插件
    config.plugins.delete("prefetch");
    // 移除 preload 插件
    config.plugins.delete("preload");
    // 压缩代码
    config.optimization.minimize(true);
    // 分割代码
    config.optimization.splitChunks({
      chunks: "all"
    });
    // 对图片进行压缩处理
    config.module
      .rule("images")
      .use("image-webpack-loader")
      .loader("image-webpack-loader")
      .options({
        disable: true, // webpack@2.x and newer
        quality: "65-80",
        speed: 4
      })
      .end();

    // 对vue-cli内部的 webpack 配置进行更细粒度的修改。
    // 添加CDN参数到htmlWebpackPlugin配置中， 详见public/index.html 修改
    config.plugin("html").tap(args => {
      if (process.env.NODE_ENV === "production") {
        args[0].cdn = cdn.buildCDN;
      }
      if (process.env.NODE_ENV === "development") {
        args[0].cdn = cdn.dev;
      }
      return args;
    });
  },
  configureWebpack: config => {
    // 为生产环境修改配置...
    if (process.env.NODE_ENV === "production") {
      // 忽略生产环境打包的文件
      config.externals = {
        vue: "Vue",
        "vue-router": "VueRouter",
        vuex: "Vuex",
        "vue-i18n": "VueI18n",
        axios: "axios",
        "element-ui": "ELEMENT",
        echarts: "echarts",
        mockjs: "Mock",
        nprogress: "NProgress",
        "js-cookie": "Cookies"
      };
      // 去除console来减少文件大小，效果同'UglifyJsPlugin'
      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true, // Must be set to true if using source-maps in production
        terserOptions: {
          compress: {
            warnings: false,
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ["console.log"]
          }
        }
      });
      // 开启gzip压缩
      config.plugins.push(
        new CompressionPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: new RegExp("\\.(" + ["js", "css"].join("|") + ")$"), // 匹配文件扩展名
          // threshold: 10240, // 对超过10k的数据进行压缩
          threshold: 5120, // 对超过5k的数据进行压缩
          minRatio: 0.8
          // cache: true, // 是否需要缓存
          // deleteOriginalAssets: false // true删除源文件(不建议);false不删除源文件
        })
      );
    } else {
      // 为开发环境修改配置...
    }
  },
  // 第三方插件配置
  pluginOptions: {}
};
