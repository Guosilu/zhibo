const config = require('../config/config.js');
/**
 * 上传类
 * fileObjList: [{columnName: "", filePath: ""},{},...]
 */
class upload {
  constructor({ fileObjList,  onExec }) {
    this.fileObjList = fileObjList || {};
    this.fileUrlObjList = [];
    this.onExec = onExec;
  }

  exec() {
    this.uploadFileNameList().catch(function (error) {console.log('error: ' + error);})
      .then(this.onExec);
  }

  //获取url地址列表
  uploadFileNameList () {
    var that = this;
    var paramObjList = this.fileScreen();
    return new Promise(function (resolve, reject) {
      var promiseArr = [];
      for (let i = 0; i < paramObjList.length; i++) {
        var promise = that.fileUpload(paramObjList[i]);
        promiseArr.push(promise);
      }
      Promise.all(promiseArr).then(res => {
        var fileNameList = [];
        for (let i = 0; i < res.length; i++) {
          var fileNameOne = {
            columnName: res[i].columnName,
            fileUrl: res[i].fileUrl
          }
          fileNameList.push(fileNameOne);
        }
        fileNameList = that.fileUrlObjList.concat(fileNameList);
        resolve(fileNameList);
      });
    })
  }

  //单个文件上传 resol: {columnName: '', fileUrl: ''}
  fileUpload (paramObj) {
    var that = this;
    return new Promise(function (resolve, reject) {
      if (paramObj.filePath) {
        wx.uploadFile({
          url: paramObj.url,
          filePath: paramObj.filePath,
          name: paramObj.name,
          formData: paramObj.formData,
          success: function (res) {
            let data = JSON.parse(res.data);
            let success = data.success;
            if (success == 1) {
              let resol = {
                columnName: paramObj.columnName,
                fileUrl: data.file_url,
              }
              //console.log(resol);
              resolve(resol);
            } else {
              reject("返回success不为1");
            }
          }
        });
      } else {
        reject("'paramObj.filePath'不存在");
      }
    });
  }

  //筛选本地资源 *编辑使用
  fileScreen () {
    var that = this;
    var paramObjList = [];
    var fileObjList = this.fileObjList;
    var parttTmp = /^([a-zA-Z]{1,10}:\/\/tmp(\/|_)).+(\.[0-9a-zA-Z]{1,5})$/;
    for (let i = 0; i < fileObjList.length; i++) {
      var fpath = fileObjList[i].filePath;
      var cname = fileObjList[i].columnName;
      if (parttTmp.test(fpath)) {
        paramObjList.push({
          url: config.uploadUrl,
          filePath: fpath,
          columnName: cname,
          name: 'file',
          formData: {
            action: 'upload',
          }
        });
      } else {
        that.fileUrlObjList.push({
          columnName: fileObjList[i].columnName,
          fileUrl: fileObjList[i].filePath,
        });
      }
    }
    console.log("筛选上传对象:"); console.log(paramObjList);
    console.log("筛选略过对象:"); console.log(that.fileUrlObjList);
    return paramObjList;
  }
}

var doUpload = (opt) => {
  return new upload(opt).exec();
}

module.exports = {
  upload: doUpload,
}