/**
 * 渲染公共模版
 */
const Controller = require('egg').Controller
const React = require('react')
const { renderToString } = require('react-dom/server')
const Content = require('../skeleton/content2')

class TemplateController extends Controller {
    async render() {
        const { app, ctx, service, logger } = this

        const { bucket, host } = app.config.qiniu

        const startPath = app.config.env

        const { projectName } = ctx.params

        const { respBody } = await service.qiniu.getFileByPrefix(bucket, { prefix: `${startPath}/${projectName}` })

        if (respBody.items && respBody.items.length > 0) {
            const sourceKey = respBody.items[respBody.items.length - 1].key

            const { data } = await app.curl(`${host}/${sourceKey}`, { method: 'GET', dataType: 'json' })

            const html = renderToString(React.createElement(Content.default))

            if (data) {
                const { css, js } = data
                const publicPath = `${host}/${js.replace('umi.js', '')}`
                await ctx.render('template.nj', {
                    html,
                    publicPath,
                    css: `${host}/${css}`,
                    js: `${host}/${js}`
                })
            } else {
                await ctx.render('error.nj')
            }
        } else {
            await ctx.render('error.nj')
        }
    }
}

module.exports = TemplateController
