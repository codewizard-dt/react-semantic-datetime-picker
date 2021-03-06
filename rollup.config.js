import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import postcss from "rollup-plugin-postcss";
import dts from 'rollup-plugin-dts'

import postcssImport from "postcss-import";
import postcssNested from "postcss-nested";
import autoprefixer from "autoprefixer";

const packageJson = require("./package.json");

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true,
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    external: [
      'react',
      'react-dom',
      'lodash',
      'luxon',
      'semantic-ui-css',
      'semantic-ui-react',
    ],
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss({
        plugins: [postcssImport(), postcssNested(), autoprefixer()],
        extract: 'datepicker.css',
      }),
    ],
  },
  {
    input: "dist/esm/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    external: [/\.(css|less|scss|sass)$/],
  },

]