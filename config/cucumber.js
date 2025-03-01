module.exports = {
    default: {
        tags: process.env.npm_config_TAGS || "",
        formatOptions: {
            snippetInterface: "async-await"
        },
        paths: [
            "src/test/features/*.feature"
        ],
        publishQuite: true,
        dryRun: false,
        require: [
            "src/test/steps_definitions/*.js",
            "src/test/hooks/hooks.js"
        ],
        format: [
            "html:test-results/cucumber-report.html",
            "json:test-results/cucumber-report.json"
        ],
        parallel: 2,
        retry: 1
    }
}