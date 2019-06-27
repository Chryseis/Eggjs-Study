'use strict'

module.exports = appInfo => {
    const config = {
        keys: appInfo.name + '_1513779989145_1674',
        security: {
            csrf: {
                enable: false
            },
            domainWhiteList: ['*']
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
        secretKey: 'n5j85oGmDTJpe-FH3GHy8tBU_HJHImCLPblUOaQq',
        bucket: 'beauty',
        host: 'http://cdn.chryseis.cn'
    }

    /**
     * Cors
     * */
    config.cors = {
        origin: '*',
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATH'
    }

    /**
     * Logger
     * */
    config.logger = {
        level: 'INFO',
        disableConsoleAfterReady: false
    }


    return config
}
