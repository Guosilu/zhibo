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

  //上传图片
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
  //选择 / 拍摄视频
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
  uploadVideo: function () {
    let paramObj = {
      url: config.uploadUrl,
      filePath: this.data.video,
      name: 'file',
      formData: {
        action: 'upload',
      }
    }
    uploadFun.fileUpload(paramObj).then(function (res) {
      console.log(res);
    });
  },
  formSubmit: function (e) {
    console.log(e);
    var that = this;
    if (that.data.videoPath == '') {
      wx.showToast({
        title: '请录制或选择一个小视频',
      })
      return false;
    }
    if (that.data.imagePath == '') {
      wx.showToast({
        title: '至少传一个图',
      })
      return false;
    }

    if (that.data.size > 1024 * 1024 * 20) {
      wx.showModal({
        title: '错误!',
        content: '很抱歉，视频最大允许2M，当前为' + (that.data.size / (1024 * 1024)).toFixed(2) + 'M'
      })
      return false;
    }
  },

  deleteImage: function () {
    this.setData({
      imagePath: ''
    })
  },

  previewImage: function (e) {
    var image = e.target.dataset.src
    wx.previewImage({
      current: image,
      urls: [image]
    })
  },

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