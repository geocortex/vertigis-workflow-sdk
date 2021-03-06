/* eslint-disable @typescript-eslint/no-var-requires */
// @ts-check
"use strict";

const fs = require("fs");
const path = require("path");

const moduleFileExtensions = [".tsx", ".ts", ".jsx", ".js", ".json"];
// This assumes that commands are always run from project root.
const projRoot = process.cwd();

// Resolve file paths in the same order as webpack
const resolveModule = (resolveFn, filePath) => {
    const extension = moduleFileExtensions.find((extension) =>
        fs.existsSync(resolveFn(`${filePath}${extension}`))
    );

    if (extension) {
        return resolveFn(`${filePath}${extension}`);
    }

    return resolveFn(`${filePath}.js`);
};
const resolveProj = (relativePath) => path.resolve(projRoot, relativePath);
// Up 1 from "config/"
const resolveOwn = (relativePath) => path.resolve(__dirname, "..", relativePath);

module.exports = {
    projBuild: resolveProj("build"),
    projEntry: resolveModule(resolveProj, "src/main"),
    projRoot: resolveProj("."),
    projSrc: resolveProj("src"),
    ownPath: resolveOwn("."),
};

module.exports.moduleFileExtensions = moduleFileExtensions;
