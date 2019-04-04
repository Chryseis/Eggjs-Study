module.exports = app => {
    const {router, controller} = app;
    router.get('/', async (ctx) => ctx.body = 'Holy shit');
    router.post('/img2cdn', controller.upload.img2cdn);
};