
var multer = require('multer');
var crypto = require('crypto');
var md5 = require('md5');
var config = {
    "upload": {
        path: '../uploads/files'
    }
};
var patho = config.upload.path;
var storage = multer.diskStorage({
    destination: patho,
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null,md5(file.originalname[0])+parseInt(Math.random()*100000000) + "." + fileFormat[fileFormat.length - 1]);
    }
});

var upload = multer({
    storage: storage
});
module.exports = upload;