import "i18next";

// относительные пути от этого файла к public/languages/en/*
// путь: src/types -> ../../public/...
import header from "../../../public/languages/en/header.json";
import home from "../../../public/languages/en/home.json";

declare module "i18next" {
	interface CustomTypeOptions {
		resources: {
			header: typeof header;
			home: typeof home;
		};
	}
}
