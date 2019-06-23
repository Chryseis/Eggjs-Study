const Service = require('egg').Service
const qiniu = require('qiniu')

class QiniuService extends Service {
    /**
     * @param ctx=应用上下问
     * @param zone=机房名
     * */
    constructor(ctx, zone = qiniu.zone.Zone_z0) {
        super(ctx)
        const { accessKey, secretKey } = this.app.config.qiniu
        this.mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
        this.config = new qiniu.conf.Config({ zone })
        this.bucketManager = new qiniu.rs.BucketManager(this.mac, this.config)
    }

    /**
     * 上传文件
     * @param bucket=空间名
     * @param key=文件路径
     * @param localFile=本地文件路径
     * */
    putFile(bucket, key, localFile) {
        const putPolicy = new qiniu.rs.PutPolicy({ scope: bucket })
        const uploadToken = putPolicy.uploadToken(this.mac)
        const putExtra = new qiniu.form_up.PutExtra()
        const formUploader = new qiniu.form_up.FormUploader(this.config)
        return new Promise((resolve, reject) => {
            formUploader.putFile(uploadToken, key, localFile, putExtra, (err, respBody, respInfo) => {
                if (err) {
                    reject(err)
                } else {
                    resolve({
                        respBody,
                        respInfo
                    })
                }
            })
        })
    }

    /**
     * 上传文件
     * @param bucket=空间名
     * @param key=文件路径
     * @param buffers=字节数组
     * */
    putBuffers(bucket, key, buffers) {
        const putPolicy = new qiniu.rs.PutPolicy({ scope: bucket })
        const uploadToken = putPolicy.uploadToken(this.mac)
        const putExtra = new qiniu.form_up.PutExtra()
        const formUploader = new qiniu.form_up.FormUploader(this.config)
        return new Promise((resolve, reject) => {
            formUploader.putFile(uploadToken, key, buffers, putExtra, (err, respBody, respInfo) => {
                if (err) {
                    reject(err)
                } else {
                    resolve({
                        respBody,
                        respInfo
                    })
                }
            })
        })
    }

    /**
     * 移动单个文件
     * @param srcBucket=原文件空间
     * @param srcKey=原文件路径（包含文件名）
     * @param destBucket=目标文件空间
     * @param destKey=目标文件路径（包含文件名）
     * @param options=配置参数 e.g {force:true}
     * */
    moveFile(srcBucket, srcKey, destBucket, destKey, options) {
        return new Promise((resolve, reject) => {
            this.bucketManager.move(srcBucket, srcKey, destBucket, destKey, options, (err, respBody, respInfo) => {
                if (err) {
                    reject(err)
                } else {
                    resolve({
                        respBody,
                        respInfo
                    })
                }
            })
        })
    }

    /**
     * 复制单个文件
     * @param srcBucket=原文件空间
     * @param srcKey=原文件路径（包含文件名）
     * @param destBucket=目标文件空间
     * @param destKey=目标文件路径（包含文件名）
     * @param options=配置参数 e.g {force:true}
     * */
    copyFile(srcBucket, srcKey, destBucket, destKey, options) {
        return new Promise((resolve, reject) => {
            this.bucketManager.copy(srcBucket, srcKey, destBucket, destKey, options, (err, respBody, respInfo) => {
                if (err) {
                    reject(err)
                } else {
                    resolve({
                        respBody,
                        respInfo
                    })
                }
            })
        })
    }

    /**
     * 删除单个文件
     * @param bucket=空间名
     * @param key=文件路径（包含文件名）
     * */
    deleteFile(bucket, key) {
        return new Promise((resolve, reject) => {
            this.bucketManager.delete(bucket, key, (err, respBody, respInfo) => {
                if (err) {
                    reject(err)
                } else {
                    resolve({
                        respBody,
                        respInfo
                    })
                }
            })
        })
    }

    /**
     * 通过前缀获取文件列表
     * */
    getFileByPrefix() {

    }
}

module.exports = QiniuService