/**
 * Created by admin on 2017/9/7.
 */
var file = require("../model/file.js");

var formidable = require("formidable");

var fs = require("fs");

var path = require("path");

var sd = require("silly-datetime");

exports.showIndex =  function(req,res,next){
  console.log("callback的顺序-0");
 file.getAllAlbum(function(err,allAlbums){
   console.log("callback的顺序0");
   if(err){
     next();
     return;
   }
   console.log("callback的顺序00");
    res.render("index",{
      "albums":allAlbums
    })
   console.log("callback的顺序000");
  })
};

//显示图片
exports.showAlbum =  function(req,res,next){
  var albuName=req.params.albumName;
  file.getAllImagesByalbumName(albuName,function(err,allImage){
    if(err){
      next();
      return;
    }
    res.render("album",{
      "albumName":albuName,
      "imgs":allImage

    });
  })

}
//显示上传
exports.showUp = function(req,res){
  /*if(err){
    console.log("up");
    next();
    return;
  }*/
  file.getAllAlbum(function(err,albums){
    res.render("up",{
      "albums":albums
    })
  })

}

//上传表单
exports.dopost = function(req,res){
  var form = new formidable.IncomingForm();
  form.uploadDir =path.normalize(__dirname+"/../temup/");
  form.parse(req, function(err, fields, files,next) {
    console.log(fields);
    console.log(files);
    if(err){
      next();
      return;
    }
    var ttt = sd.format(new Date(), 'YYYYMMDD HHmmss');
    var ran = parseInt(Math.random(90)+10);
    var etname = path.extname(files.tp.name);//path.extname()返回文件的扩展名。

    var wenjiajia = fields.wjj;
    var oldpath = files.tp.path;
    var newpath = path.normalize(__dirname+"/../upload/" + wenjiajia +"/"+ ttt + ran + etname);
    fs.rename(oldpath,newpath,function(err){
      if(err){
        res.send("改名失败");
      }
    })


  });
  res.end("sucess");
}