'use strict'

module.exports = appInfo => {
    const config = {
        keys: appInfo.name + '_1513779989145_1674',
        security: {
            csrf: {
                enable: false
            }
        }
    }

    /**
     * View Engine
     */
    config.view = {
        defaultViewEngine: 'nunjucks',
        mapping: {
            '.nj': 'nunjucks',
        },
    }


    return config
}
