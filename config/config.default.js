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

    /**
     * Qiniu Config
     * */
    config.qiniu = {
        accessKey: 'KlyDLBozrI-MpaN-tPIRwtVBexxjS9Ajkv5aTAYP',
        secretKey: 'n5j85oGmDTJpe-FH3GHy8tBU_HJHImCLPblUOaQq'
    }


    return config
}
