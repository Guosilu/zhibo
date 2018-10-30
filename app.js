//app.js
const config = require('config/config.js');
App({
  redirectTo: function () {
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.setStorageSync('isLogin', true)
        } else {
          wx.removeStorageSync('isLogin');
          wx.redirectTo({
            url: '/pages/login/login',
          })
        }
      }
    });
  },
  login: function () {
    var that = this;
    wx.login({
      success: res => {
        if (res.code) {
          wx.request({
            url: config.loginUrl,
            method: 'POST',
            header: {
              'content-type': 'application/json'
              //'content-type': 'application/x-www-form-urlencoded'
            },
            data: {
              action: 'openId',
              js_code: res.code
            },
            success: res => {
              that.globalData.openId = res.data;
              that.getUserInfo();
            }
          })
        } else {
          wx.showToast({
            title: '登录失败！' + login.errMsg,
            icon: "none"
          })
        }
      }
    })
  },
  getUserInfo: function () {
    let that = this;
    wx.getUserInfo({
      success: res => {
        that.globalData.userInfo = res.userInfo;
        that.dataLogin(res.userInfo);
        if (that.userInfoReadyCallback) {
          that.userInfoReadyCallback(res)
        }
      },
      fail: res => {
        wx.showToast({
          title: '未授权',
          icon: "none"
        })
      }
    })
  },
  dataLogin: function (post) {
    let that = this;
    post['openId'] = this.globalData.openId;
    wx.request({
      url: config.loginUrl,
      method: 'POST',
      header: {
        'content-type': 'application/json'
        //'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        action: 'userInfo',
        post: post
      },
      success: res => {
        wx.setStorageSync('isLogin', true);
      }
    });
  },
  onLaunch: function () {
    let that = this;
    this.redirectTo();
    this.login();
  },
  onShow: function () {

  },
  globalData: {
    userInfo: null,
    openId: null,
  },
   // 下拉刷新
  onPullDownRefresh: function () {
    // 显示顶部刷新图标
    wx.showNavigationBarLoading();
    var that = this;
    wx.request({
      url: 'https://aa.zdcom.net.cn/',
      method: "GET",
      header: {
        'content-type': 'application/text'
      },
      success: function (res) {
        that.setData({
          moment: res.data.data
        });
        // 设置数组元素
        that.setData({
          moment: that.data.moment
        });
        console.log(that.data.moment);
        // 隐藏导航栏加载框
        wx.hideNavigationBarLoading();
        // 停止下拉动作
        wx.stopPullDownRefresh();
      }
    })
  },

  /**
     * 页面上拉触底事件的处理函数
     */
  onReachBottom: function () {
    var that = this;
    // 显示加载图标
    wx.showLoading({
      title: '玩命加载中',
    })
    // 页数+1
    page = page + 1;
    wx.request({
      url: 'https://aa.zdcom.net.cn/' + page,
      method: "GET",
      // 请求头部
      header: {
        'content-type': 'application/text'
      },
      success: function (res) {
        // 回调函数
        var moment_list = that.data.moment;

        for (var i = 0; i < res.data.data.length; i++) {
          moment_list.push(res.data.data[i]);
        }
        // 设置数据
        that.setData({
          moment: that.data.moment
        })
        // 隐藏加载框
        wx.hideLoading();
      }
    })

  }
})