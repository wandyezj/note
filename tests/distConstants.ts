import path from "path";
import { getRootDirectory } from "./getRootDirectory";

export const localDistPath = path.resolve(getRootDirectory(), "dist");

export const rootUrlLocal = "https://localhost:3000";
export const rootUrlProduction = "https://wandyezj.github.io/website";
