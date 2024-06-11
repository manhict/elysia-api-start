module.exports = {
    name: "elysia_api",
    script: "./src/index.ts",
    interpreter: 'bun',
    exec_mode: 'fork', // cluster, fork
    instances: 1,
    watch: false
};