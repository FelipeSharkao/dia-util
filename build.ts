import type { BuildConfig, BunPlugin } from "bun"
import dts from "bun-plugin-dts"

const config: Omit<BuildConfig, "outdir" | "target" | "format"> = {
    entrypoints: ["./src/index.ts"],
    minify: true,
    packages: "external",
    plugins: [resolveAliasesPlugin()],
}
Bun.build({
    ...config,
    outdir: "dist",
    format: "esm",
    plugins: [...(config.plugins ?? []), dts()],
})
Bun.build({
    ...config,
    outdir: "dist/cjs",
    target: "node",
    format: "cjs",
})

function resolveAliasesPlugin(): BunPlugin {
    return {
        name: "Resolve Aliases",
        setup(build) {
            build.onResolve({ filter: /.*/ }, (args) => {
                if (args.path.startsWith("@/")) {
                    return { path: `${import.meta.dir}/src/${args.path.slice(2)}.ts` }
                }
            })
        },
    }
}
