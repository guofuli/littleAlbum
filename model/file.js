/**
 * Created by admin on 2017/9/7.
 */
var fs = require("fs");

exports.getAllAlbum = function (callback) {
  console.log("callback的顺序1");
  fs.readdir("./upload", function (err, files) {
    if (err) {
      callback("找不到文件12"+err,null);
      return;
    }
    var allAlbums = [];
    (function iterator(i) {
      if (i == files.length) {
        callback(null,allAlbums);
        return;
      }
      fs.stat("./upload/" + files[i], function (err, stats) {
        if (err) {
          callback("找不到文件13"+files[i],null);
          return;
        }
        if (stats.isDirectory()) {
          allAlbums.push(files[i]);
        }
        iterator(i + 1);
      })
    })(0)
  })
};

exports.getAllImagesByalbumName = function(albuName, callback) {
  fs.readdir("./upload/" + albuName, function (err, files) {
    if (err) {
      callback(err, null);
      return;
    }
    var allImages = [];
    (function iterator(i) {
      if (i == files.length) {
        callback(null,allImages);
        return;
      }
      fs.stat("./upload/" + albuName + "/" + files[i], function (err, stats) {
        if (stats.isFile()) {
          allImages.push(files[i]);
        }
        iterator(i + 1);
      });
    })(0);
  });

}