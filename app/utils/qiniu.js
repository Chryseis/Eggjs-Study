const qiniu = require('qiniu');
const md5 = require('blueimp-md5');

const accessKey = 'KlyDLBozrI-MpaN-tPIRwtVBexxjS9Ajkv5aTAYP';
const secretKey = 'n5j85oGmDTJpe-FH3GHy8tBU_HJHImCLPblUOaQq';
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
const config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z0;
const formUploader = new qiniu.form_up.FormUploader(config);
const putExtra = new qiniu.form_up.PutExtra();

function qiniuUploadBuffer(buffer, ext) {
    //这里base-html是存储空间名
    const key = `beauty/${md5(+new Date())}.${ext}`;
    const Bucket = `chrys90:${key}`;
    const options = {
        scope: Bucket,
        MimeType: 0,
    };
    const putPolicy = new qiniu.rs.PutPolicy(options);
    const uploadToken = putPolicy.uploadToken(mac);

    return new Promise((resolve) => {
        formUploader.put(uploadToken, key, buffer, putExtra, function (respErr,
                                                                       respBody, respInfo) {
            if (respErr) {
                throw respErr;
            }
            if (respInfo.statusCode === 200) {
                resolve('http://ppfiz0mdd.bkt.clouddn.com/' + respBody.key);
            } else {
                console.log(respInfo.statusCode);
                console.log(respBody);
                if (respBody.error) {
                    console.log(respBody.error);
                }
            }
        });
    });
}

module.exports = qiniuUploadBuffer;