const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    video: false,
    size: 0,
    albumIndex: -1,
    albums: []
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
    var that = this;
    wx.request({
      method: 'GET',
      url: 'http://xgh.local.com/xcx/albums',
      data: {
        fields: 'id,name'
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        that.setData({
          albums: res.data
        });
      },
    })
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


  /**
   * 选择 / 拍摄视频
   * @author abei<abei@nai8.me>
   */
  addVideo: function () {
    var that = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success: function (res) {
        that.setData({
          video: res.tempFilePath,
          size: (res.size / (1024 * 1024)).toFixed(2)
        })
      }
    })
  },

  formSubmit: function (e) {
    var that = this;
    var desc = e.detail.value.desc;
    if (that.data.albumIndex < 0) {
      wx.showModal({
        title: '小乖猴助手',
        content: '请选择相册'
      })
      return;

      wx.showToast({
        title: '请选择相册',
      })
      return;
    }
    var albumId = that.data.albums[that.data.albumIndex].id;

    if (that.data.video == false) {
      wx.showModal({
        title: '小乖猴助手',
        content: '请录制或选择一个小视频'
      })
      return false;
    }
    if (that.data.photos.length == 0) {
      wx.showToast({
        title: '至少传一个图',
      })
      return;
    }

    if (that.data.size > 1024 * 1024 * 2) {
      wx.showModal({
        title: '小乖猴助手',
        content: '很抱歉，视频最大允许2M，当前为' + (that.data.size / (1024 * 1024)).toFixed(2) + 'M'
      })
      return false;
    }

    wx.showLoading({ title: '提交中' });
    wx.request({
      method: 'POST',
      data: {
        album_id: albumId,
        description: desc
      },
      url: 'http://xgh.local.com/xcx/photos',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.statusCode == 201) {
          var photo = res.data;
          wx.showLoading({ title: '视频上传中' });
          wx.uploadFile({
            url: 'http://xgh.local.com/xcx/photo-items/add',
            method: 'POST',
            filePath: that.data.video,
            header: {
              'content-type': 'multipart/form-data'
            },
            name: 'file',
            formData: {
              photo_id: photo.id,
              album_id: photo.album_id
            },
            success: function (r) {
              wx.hideLoading();
              wx.showModal({
                title: '小乖猴助手',
                content: '上传成功',
              })
            },
            fail: function (r) {

            }
          })
        } else {
          wx.showModal({
            title: '小乖猴助手',
            content: res.data
          })
        }
      }
    });
  },

  /**
   * 上传图片
   */
  chooseImage: function () {
    var that = this;
    var items = that.data.photos;
    wx.chooseImage({
      count: 9, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths;

        for (var i = 0; i < tempFilePaths.length; i++) {
          items.push({
            src: tempFilePaths[i]
          });
        }

        that.setData({
          photos: items
        });
      }
    })
  },

  previewImage: function (e) {
    var current = e.target.dataset.src

    wx.previewImage({
      current: current,
      urls: this.data.photos
    })
  },

  uploadImage: function (photo, img) {
    var that = this;
    wx.uploadFile({
      url: 'http://xgh.local.com/xcx/photo-items',
      method: 'POST',
      filePath: img.src,
      header: {
        'content-type': 'multipart/form-data'
      },
      name: 'file',
      formData: {
        photo_id: photo.id,
        album_id: photo.album_id
      },
      success: function (r) {

      },
      fail: function (r) {

      }
    })
  },

  bindPickerChange: function (e) {
    this.setData({
      albumIndex: e.detail.value
    })
  },

})