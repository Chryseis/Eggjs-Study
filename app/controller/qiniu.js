/**
 * 七牛云操作
 * */

const Controller = require('egg').Controller

class QiniuController extends Controller {
    /**
     * 获取七牛云资源列表
     * @param bucket=空间名
     * @param prefix=文件前缀
     * @param limit=每次加载数量
     * */
    async list() {
        const { app, ctx, service } = this

        const { bucket, prefix, limit = 10 } = ctx.query

        const { respBody, respInfo } = await service.qiniu.getFileByPrefix(bucket, {
            prefix,
            limit
        })

        ctx.helper.success(respBody)
    }
}

module.exports = QiniuController