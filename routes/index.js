var express = require('express');
var router = express.Router();
var formidable = require("formidable");
var fs = require("fs");
var path = require("path");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

function mkdirs(dirname, mode, callback){
    fs.exists(dirname, function (exists){
        if(exists){
            callback();
        }else{
            mkdirs(path.dirname(dirname), mode, function (){
                fs.mkdir(dirname, mode, callback);

            });
        }
    });
}

router.post('/zip_post' , function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.uploadDir = path.resolve(__dirname, '../uploads/files');//缓存地址

    form.keepExtensions = true;//是否包含文件后缀
    form.multiples = true;//设置为多文件上传
    form.parse(req,function(err,fields,files){


        if(files.files instanceof Array){
                files.files.forEach(function (item,i) {
                    if(item.name.indexOf('.css')>-1){
                        mkdirs(path.resolve(__dirname, '../../css')+'/'+fields.text,'0777',function () {
                            fs.renameSync(item.path,  path.resolve(__dirname, '../../css')+'/' + fields.text +'/' + item.name);

                        });
                    }else if(item.name.indexOf('.js')>-1){
                        mkdirs(path.resolve(__dirname, '../../js')+'/' +fields.text,'0777',function () {
                            fs.renameSync(item.path,   path.resolve(__dirname, '../../js')+'/' + fields.text +'/' + item.name);

                        });
                    }else if(item.name.indexOf('.html')>-1){
                        mkdirs(path.resolve(__dirname, '../../WEB-INF/views')+'/'+fields.text,'0777',function () {
                            fs.renameSync(item.path, path.resolve(__dirname, '../../WEB-INF/views')+'/' + fields.text +'/' + item.name);

                        });
                    }else if(item.name.indexOf('.jpg')>-1||item.name.indexOf('.png')>-1||item.name.indexOf('.jpeg')>-1||item.name.indexOf('.ico')>-1||item.name.indexOf('.gif')>-1||item.name.indexOf('.mp3')>-1||item.name.indexOf('.mp4')>-1||item.name.indexOf('.ogg')>-1||item.name.indexOf('.bmp')>-1){
                        mkdirs(path.resolve(__dirname, '../../images')+'/'+fields.text,'0777',function () {
                            fs.renameSync(item.path, path.resolve(__dirname, '../../images')+'/' + fields.text +'/' + item.name);

                        });
                    }
                });
            }else{

            if(files.file.name.indexOf('.css')>-1){
                mkdirs(path.resolve(__dirname, '../../css')+'/'+fields.text,'0777',function () {
                        fs.renameSync(files.file.path,  path.resolve(__dirname, '../../css')+'/' + fields.text +'/' + files.file.name);

                });
            }else if(files.file.name.indexOf('.js')>-1){
                mkdirs(path.resolve(__dirname, '../../js')+'/' +fields.text,'0777',function () {
                    fs.renameSync(files.file.path,   path.resolve(__dirname, '../../js')+'/' + fields.text +'/' + files.file.name);

                });
            }else if(files.file.name.indexOf('.html')>-1){
                mkdirs(path.resolve(__dirname, '../../WEB-INF/views')+'/'+fields.text,'0777',function () {
                    fs.renameSync(files.file.path, path.resolve(__dirname, '../../WEB-INF/views')+'/' + fields.text +'/' + files.file.name);

                });
            }else if(files.file.name.indexOf('.jpg')>-1||files.file.name.indexOf('.png')>-1||files.file.name.indexOf('.jpeg')>-1||files.file.name.indexOf('.ico')>-1||files.file.name.indexOf('.gif')>-1||files.file.name.indexOf('.mp3')>-1||files.file.name.indexOf('.mp4')>-1||files.file.name.indexOf('.ogg')>-1||files.file.name.indexOf('.bmp')>-1){
                mkdirs(path.resolve(__dirname, '../../images')+'/'+fields.text,'0777',function () {
                    fs.renameSync(files.file.path, path.resolve(__dirname, '../../images')+'/' + fields.text +'/' + files.file.name);

                });
            }
        }




        });

        form.on("end",function(){
            res.send({
                "code": 1,
                "msg": "ok",
                "data": 'ok'
            })
        });

        form.on("error",function(){
            res.send({
                "code": 0,
                "msg": "no",
                "data": 'no'
            })
        })

});

var svgCaptcha = require('svg-captcha');

router.get('/captcha', function (req, res) {
    var captcha = svgCaptcha.create();
    // req.session.captcha = captcha.text;
    res.cookie('captcha',captcha.text);

    // res.type('svg');
    var codeData = {
        img:captcha.data
    }
    res.status(200).send(codeData);
});

module.exports = router;
