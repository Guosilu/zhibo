
const app = getApp();
const config = require("../../config/config.js");
Page({
  /**
   * 页面的初始数据
   */
  data: {
    img:config.img,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userType: wx.getStorageSync('userType')
  },
  getUserInfo: function (e) {
    console.log(e)
    if (e.detail.userInfo) {
      
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true,
        userType: app.login()
      })
    }else {
      wx.showToast({
        title: '您拒绝了授权登录!',
        icon: 'none'
      })
    }
  },
  /**
   * 获取缓存,判断是否登录
   */
  gotozb: function () {
    wx.getStorage({
      key: 'openId',
      success: function (res) {
        if (res.data) {
          /**
           * 获取PusherUrl
           * 如果有跳转到直播页面
           * 否则调转到创建直播页面
           */
          wx.request({
            url: config.coreUrl + 'getLiveUrl.php',
            method: 'POST',
            header: {
              // 'content-type': 'application/json'
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
              type: "isRoom",
              openId: res.data
            },
            success: function (data) {
              if (data.data !="error"){
                //跳转直播页面
                wx.navigateTo({
                  url: config.pusher
                })
              } else {
                //跳转创建直播页面
                wx.navigateTo({
                  url: config.setRoom
                })
              }
            },
            fail: function (res) {
              console.log(res)
            }
          })
        } else {
          wx.showToast({
            title: "请先登录",
            icon: 'none',
            mask: "true"
          })
        }
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    app.userTypeReadyCallback = res => {
      console.log(res)
      this.setData({
        userType: res
      })
    }
    
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log(res);
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
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
  
  }
})