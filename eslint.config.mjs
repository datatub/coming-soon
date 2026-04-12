import { defineConfig } from "eslint/config";
import tsParser from "@typescript-eslint/parser";

export default defineConfig([
	{
		files: ["**/*.ts"],
		languageOptions: {
			parser: tsParser,
			sourceType: "module",
			ecmaVersion: "latest",
		},
		rules: {
			semi: "error",
			"prefer-const": "error",
		},
	},
]);