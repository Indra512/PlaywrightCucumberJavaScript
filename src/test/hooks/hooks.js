const { BeforeAll, Before, After, AfterAll, Status } = require('@cucumber/cucumber');
const { fixture } = require('../../fixture/fixture');
const { invokeBrowser } = require('../../helper/browsers/browser_manager');
const { getEnv } = require('../../helper/env/env');
const { createLogger } = require('winston');
const { options } = require('../../helper/util/logger');
const fse = require('fs-extra');

let browser;
let context;

BeforeAll(async function () {
    getEnv();
    browser = await invokeBrowser();
});

Before(async function ({ pickle }) {
    context = await browser.newContext({
        recordVideo: {
            dir: "test-results/videos",
        }
    });
    const page = await context.newPage();
    fixture.page = page;
    fixture.logger = createLogger(options(`${pickle.name}_${pickle.id}`));
    fixture.logger.info(`**********Scenario Started::${pickle.name}**********`);
});

After(async function ({ pickle, result }) {
    let videoPath;
    let image;
    fixture.logger.info(`**********Scenario Ended::${pickle.name}**********`);
    if (result?.status === Status.FAILED) {
        image = await fixture.page.screenshot();
        this.attach(image, "image/png");
        fixture.logger.info(`${pickle.name} scenario is failed`);
    } else {
        fixture.logger.info(`${pickle.name} scenario is passed`);
    }
    await fixture.page.close();
    await context.close();
    if (result?.status === Status.FAILED) {
        videoPath = await fixture.page.video().path();
        this.attach(fse.readFileSync(videoPath), "video/webm");
    }
});

AfterAll(async function () {
    fixture.logger.close();
    await browser.close();
});