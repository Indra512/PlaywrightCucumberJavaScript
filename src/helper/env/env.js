const dotenv = require('dotenv');

const getEnv = () => {
    dotenv.config({
        override: true,
        path: `src/helper/env/.env.${process.env.ENV}`
    });
}

module.exports = {
    getEnv
};