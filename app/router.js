module.exports = app => {
    const { router, controller } = app
    router.get('/', async(ctx) => ctx.body = 'Holy shit')
    router.post('/img2cdn', controller.upload.img2cdn)
    router.get('/qiniu/list', controller.qiniu.list)
    router.post('/qiniu/test/post', controller.qiniu.publishTest)
    router.post('/qiniu/prod/post', controller.qiniu.publishProd)
    //模版
    router.get('/h5/:projectName', controller.template.render)
}