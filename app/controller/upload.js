/*
* Upload
* */
const Controller = require('egg').Controller;
const qiniuUploadBuffer = require('../utils/qiniu');

class UploadController extends Controller {
    async img2cdn() {
        const {ctx} = this;
        const {imgUrl} = ctx.request.body;
        const result = await ctx.curl(decodeURIComponent(imgUrl));
        const ext = result.headers['content-type'].replace('image/', '');
        const buffer = result.data;

        const imgCdnUrl = await qiniuUploadBuffer(buffer, ext);

        ctx.helper.success({imgUrl: imgCdnUrl});
    }
}

module.exports = UploadController;