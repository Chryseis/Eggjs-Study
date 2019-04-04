'use strict';

module.exports = appInfo => {
    const config = {
        keys: appInfo.name + '_1513779989145_1674',
        security: {
            csrf: {
                enable: false
            }
        }
    };

    /**
     * some description
     * @member Config#test
     * @property {String} key - some description
     */
    config.test = {
        key: appInfo.name + '_123456',
    };

    return config;
};
