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

        const { bucket = 'beauty', prefix, limit = 10, marker } = ctx.query

        const { respBody, respInfo } = await service.qiniu.getFileByPrefix(bucket, {
            marker,
            prefix,
            limit
        })

        ctx.helper.success(respBody)
    }

    /**
     * 发布测试
     * @param source=文件路径
     * */
    async publishTest() {
        const { app, ctx, config, service } = this

        const { sourceKey } = ctx.request.body

        const host = config.qiniu.host

        const bucket = config.qiniu.bucket

        const projectName = sourceKey.split('/')[1]

        const { data } = await app.curl(`${host}/${sourceKey}`, { method: 'GET', dataType: 'json' })

        const { respBody: list } = await service.qiniu.getFileByPrefix(bucket, { prefix: `test/${projectName}` })

        if (list.items && list.items.length > 0) {
            list.items.forEach(async(o) => {
                await service.qiniu.deleteFile(bucket, o.key)
            })
        }

        const { respBody } = await service.qiniu.putBuffers(bucket, `test/${projectName}/${+new Date()}.json`, JSON.stringify(data))

        ctx.helper.success(respBody)

    }

    /**
     * 发布正式
     * */
    async publishProd() {
        const { app, ctx, config, service } = this

        const { sourceKey } = ctx.request.body

        const host = config.qiniu.host

        const bucket = config.qiniu.bucket

        const projectName = sourceKey.split('/')[1]

        const { data } = await app.curl(`${host}/${sourceKey}`, { method: 'GET', dataType: 'json' })

        const { respBody: list } = await service.qiniu.getFileByPrefix(bucket, { prefix: `prod/${projectName}` })

        if (list.items && list.items.length > 0) {
            list.items.forEach(async(o) => {
                await service.qiniu.deleteFile(bucket, o.key)
            })
        }

        const { respBody } = await service.qiniu.putBuffers(bucket, `prod/${projectName}/${+new Date()}.json`, JSON.stringify(data))

        await service.qiniu.putBuffers(bucket, `log/${projectName}/${+new Date()}.json`, JSON.stringify(data))

        ctx.helper.success(respBody)
    }
}

module.exports = QiniuController