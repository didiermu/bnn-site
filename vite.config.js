import path from "path";

export default {
    root: path.resolve(__dirname, "src"),
    base: "",
    publicDir: path.resolve(__dirname, "public"),
    build: {
        outDir: path.resolve(__dirname, "dist"),
        rollupOptions: {
            input: {
                indexEs: path.resolve(__dirname, "src/es/index.html"),
                indexEn: path.resolve(__dirname, "src/en/index.html"),
                humansEs: path.resolve(__dirname, "src/es/humans.html"),
                humansEn: path.resolve(__dirname, "src/en/humans.html"),
                headerEs: path.resolve(
                    __dirname,
                    "src/es/templates/header.html"
                ),
                headerEn: path.resolve(
                    __dirname,
                    "src/en/templates/header.html"
                ),
                footerEs: path.resolve(
                    __dirname,
                    "src/es/templates/footer.html"
                ),
                footerEn: path.resolve(
                    __dirname,
                    "src/en/templates/footer.html"
                ),
            },
            output: {
                chunkFileNames: "js/[name]-[hash].js",
                entryFileNames: "js/[name]-[hash].js",

                assetFileNames: ({ name }) => {
                    if (/\.(gif|jpe?g|png|svg)$/.test(name ?? "")) {
                        return "img/[name]-[hash][extname]";
                    }

                    if (/\.css$/.test(name ?? "")) {
                        return "css/[name]-[hash][extname]";
                    }

                    // default value
                    // ref: https://rollupjs.org/guide/en/#outputassetfilenames
                    return "assets/[name]-[hash][extname]";
                },
            },
        },
    },
    resolve: {
        alias: {
            "~bootstrap": path.resolve(__dirname, "node_modules/bootstrap"),
            "@assets": path.resolve(__dirname, "img/"),
        },
    },
    server: {
        hot: true,
    },
};
