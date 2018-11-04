const config = require('../../config/config.js');
const commonFun = require("../../js/commonFun.js");
const uploadFun = require("../../js/uploadFun.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    catList: [
      { 'name': '请选择', 'catid': 0 },
      { 'name': '教育', 'catid': 4},
      { 'name': '新闻', 'catid': 5},
      { 'name': 'MV' , 'catid': 6},
    ],
    imagePath: '',
    imageSize: '',
    videoPath: '',
    videoSize: '',
    catIndex: 0,
  },

  //选择图片
  chooseImage: function () {
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        that.setData({
          imagePath: res.tempFiles[0].path,
          imageSize: res.tempFiles[0].size,
        });
      }
    })
  },

  //选择视频
  chooseVideo: function () {
    let that = this;
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success(res) {
        console.log(res)
        that.setData({
          videoPath: res.tempFilePath,
          videoSize: (res.size / (1024 * 1024)).toFixed(2),
        });
      }
    })
  },

  //上传文件参数配置
  fileParamConfig: function () {
    let paramObjList = [];
    let thumbPatamObj = {
      url: config.uploadUrl,
      filePath: this.data.imagePath,
      columnName: 'thumb',
      name: 'file',
      formData: {
        action: 'upload',
      }
    };
    let videoPatamObj = {
      url: config.uploadUrl,
      filePath: this.data.videoPath,
      columnName: 'video',
      name: 'file',
      formData: {
        action: 'upload',
      }
    };
    paramObjList.push(thumbPatamObj); 
    paramObjList.push(videoPatamObj);
    return paramObjList;
  },

  //表单提交
  formSubmit: function (e) {
    let that = this;
    let submitVal = e.detail.value;
    let post = submitVal;
    let paramObjList = this.fileParamConfig();
    if (!this.submitCheck(submitVal)) return false;
    post['openId'] = app.globalData.openId;
    this.showLoading('正在上传文件...')
    uploadFun.uploadFileNameList(paramObjList).then(res => {
      for (let i = 0; i < res.length; i++) {
        post[res[i].columnName] = res[i].fileUrl
      }
      let dataObj = {
        url: config.videoUrl,
        data: {
          action: 'add',
          post: post,
        }
      }
      wx.hideLoading();
      this.showLoading('正在提交数据...')
      commonFun.request(dataObj).then(res=>{
        if(res > 0) {
          wx.hideLoading();
          //that.showTip('提交完成!');
          this.showLoading('提交完成...')
          setTimeout(function(){
            wx.switchTab({
              url: '/pages/my/my'
            })
          },1000)
        }
      });
    })
  },

  //验证表单
  submitCheck: function (submitVal) {
    if (submitVal.catid < 1) {
      this.showTip('请选择分类');
      return false;
    }
    if (submitVal.title == '') {
      this.showTip('请填写标题');
      return false;
    }
    if (this.data.imagePath == '') {
      this.showTip('至少传一个图');
      return false;
    }
    if (this.data.videoPath == '') {
      this.showTip('请录制或选择一个小视频');
      return false;
    }
    if (parseFloat(this.data.videoSize) > 100) {
      this.showTip('很抱歉，视频最大允许20M，当前为' + this.data.videoSize + 'M');
      return false;
    }
    return true;
  },
  
  //提示方法
  showTip: function (msg) {
    wx.showToast({
      icon: 'none',
      title: msg,
    })
  },

  //加载方法
  showLoading: function (msg) {
    wx.showLoading({
      title: msg,
    })
  },

  //删除图片
  deleteImage: function () {
    this.setData({
      imagePath: '',
      imageSize: '',
    })
  },

  //删除视频
  deleteVideo: function () {
    this.setData({
      videoPath: '',
      videoSize: '',
    })
  },

  //图片预览
  previewImage: function (e) {
    var image = e.target.dataset.src
    wx.previewImage({
      current: image,
      urls: [image]
    })
  },

  //选择
  bindPickerChange: function (e) {
    this.setData({
      catIndex: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
})