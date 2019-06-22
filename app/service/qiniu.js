const Service = require('egg').Service
const Qiniu = require('qiniu')

class QiniuService extends Service {
    constructor(ctx) {
        super(ctx)
        const { accessKey, secretKey } = this.app.config.qiniu
        this.mac = new Qiniu.auth.digest.Mac(accessKey, secretKey)
    }
}

module.exports = QiniuService