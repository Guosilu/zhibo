//非直接使用请复制一份自行修改
const config = require('../config/config.js');
/**
 * 上传文件构造函数
 * fileObjList: [{columnName: "", filePath: ""},{},...]
 */
function upload(ele, fileObjList) {
  this.ele = null;
  this.fileObjList = {};
  this.fileUrlObjList = [];
  this.task = [];

  //多文件上传 返回: 数组 fileNameList: [{columnName: '', fileUrl: ''}, {} ...]
  this.uploadFileNameList = function () {
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
        console.log(fileNameList);
        resolve(fileNameList);
      });
    })
  }

  //文件上传 resol: {columnName: '', fileUrl: ''}
  this.fileUpload = function (paramObj) {
    var that = this;
    return new Promise(function (resolve, reject) {
      if (paramObj.filePath) {
        var Task = wx.uploadFile({
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
        that.task.push(Task);
        that.uploadTask(Task, paramObj.columnName);
      } else {
        reject("'paramObj.filePath'不存在");
      }
    });
  }

  //筛选本地资源 *编辑使用
  this.fileScreen = function () {
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

  //上传状况 progress, totalBytesSent, totalBytesExpectedToSend
  this.uploadTask = function (Task, columnName) {
    var that = this;
    Task.onProgressUpdate((res) => {
      var key = 'uploadProgress.' + columnName
      res.totalBytesSent = (res.totalBytesSent / 1024 / 1024).toFixed(2);
      res.totalBytesExpectedToSend = (res.totalBytesExpectedToSend / 1024 / 1024).toFixed(2);
      that.ele.setData({
        [key]: res,
        showUploadProgress: Boolean(JSON.stringify(res) != '{}')
      })
      //console.log(that.ele.data.uploadProgress);
    })
  }

  //取消上传任务
  this.stopTask = function () {
    var that = this;
    console.log(this.task);
    wx.hideLoading();
    for (let i = 0; i < this.task.length; i++) {
      if (this.task[i]) this.task[i].abort();
    }
  }
}

module.exports = {
  upload: upload,
}