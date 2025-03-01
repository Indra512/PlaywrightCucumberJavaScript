const { chromium, firefox, webkit } = require("@playwright/test");

const options = {
    headless: !true
};

const invokeBrowser = () => {
    const browserType = process.env.BROWSER;
    // const browserType = process.env.npm_config_BROWSER;
    switch (browserType) {
        case "chromium":
            return chromium.launch(options);
        case "firefox":
            return firefox.launch(options);
        case "webkit":
            return webkit.launch(options);
        default:
            throw new Error("Please provide valid browser");
    }
}

module.exports = {
    invokeBrowser
};