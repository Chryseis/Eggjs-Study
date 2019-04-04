const moment = require('moment');

module.exports = {
    success(res = null, msg = '请求成功') {
        this.ctx.body = {
            code: 0,
            data: res,
            msg
        };
        this.ctx.status = 200;
    },

    fail(res = null, msg = '请求失败') {
        this.ctx.body = {
            code: -1,
            err_msg: res,
            msg
        };
        this.ctx.status = 200;
    },

    dateFormat({date = new Date(), symbol = 'YYYY-MM-DD HH:mm'}) {
        return moment(date).format(symbol)
    }
};