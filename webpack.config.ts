import { AureliaPlugin } from "aurelia-webpack-plugin";
import { Configuration } from "webpack";

import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import { resolve } from "path";

const config = (
  _env: any,
  argv?: { mode?: "production" | "development" }
): Configuration => {
  const mode = (argv || {}).mode || "development";
  const isRelease = mode === "production";
  return {
    mode: mode,
    entry: {
      app: ["aurelia-bootstrapper"],
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          include: /src/,
          use: {
            loader: "ts-loader",
            options: { silent: true, configFile: "tsconfig.app.json" },
          },
        },
        {
          test: /\.html$/,
          use: ["html-loader", "aurelia-webpack-plugin/html-requires-loader"],
        },
      ],
    },
    resolve: {
      extensions: [".ts", ".js"],
      modules: ["src", resolve(__dirname, "node_modules")],
      symlinks: false,
    },
    plugins: [
      new AureliaPlugin({
        noHtmlLoader: true,
        features: {
          ie: true,
          svg: false,
          polyfills: "esnext",
        },
      }),

      new BundleAnalyzerPlugin({
        analyzerMode: "static",
        reportFilename: "report.html",
        openAnalyzer: false,
        generateStatsFile: true,
      }),

      // new NormalModuleReplacementPlugin(/^@casl\/ability$/, resolve("./node_modules/@casl/ability/dist/es6m/index.mjs")),
    ],
  };
};

export default config;
