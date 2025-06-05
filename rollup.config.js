import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import dts from "rollup-plugin-dts";
import { readFileSync } from "fs";

const pkg = JSON.parse(readFileSync("./package.json"));

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "./dist/index.js",
        format: "cjs",
        sourcemap: true,
      },
      {
        file: "./dist/index.mjs",
        format: "es",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({
        tsconfig: "./tsconfig.json",
        declaration: true,
        declarationDir: "./dist",
      }),
      terser(),
    ],
    external: ["react", "react-dom"],
  },
  {
    input: "./dist/index.d.ts",
    output: [{ file: "./dist/index.d.ts", format: "es" }],
    plugins: [dts()],
  },
];
