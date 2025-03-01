const { Given, When, Then, setDefaultTimeout } = require("@cucumber/cucumber");
const { RegisterPage } = require("../../pages/register.page");
const { fixture } = require("../../fixture/fixture");
const data = require('../../helper/util/test-data/registerUser.json');

setDefaultTimeout(60 * 1000 * 2);

Given('I navigate to the register page', async function () {
    const registerPage = new RegisterPage(fixture.page)
    await registerPage.navigateToTheRegistrationPage();
});

When('I create a new user', async function () {
    const registerPage = new RegisterPage(fixture.page)
    const username = data.username + Date.now().toString();
    await registerPage.registerUser(data.firstName, data.lastName, username, data.password, data.conformPassword, data.isMale);
});

Then('I confirm user registration is success', async function () {
    const registerPage = new RegisterPage(fixture.page)
    await registerPage.verifyLogin();
});