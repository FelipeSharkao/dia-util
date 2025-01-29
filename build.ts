import type { BuildConfig } from "bun"

const config: Omit<BuildConfig, "outdir" | "target" | "format"> = {
    entrypoints: ["./src/index.ts"],
    sourcemap: "linked",
    external: ["*"],
}
Bun.build({
    ...config,
    outdir: "dist/esm",
    format: "esm",
})
Bun.build({
    ...config,
    outdir: "dist/cjs",
    target: "node",
    format: "cjs",
})
