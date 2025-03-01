const { Page } = require('@playwright/test');
const { Logger } = require('winston');

const fixture = {
    page: undefined,
    logger: undefined
}

module.exports = {
    fixture
};