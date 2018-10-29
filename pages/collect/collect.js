const config = require('../../config/config.js');
const configCol = require("../../config/collect.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: {},
    currentData: 0,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //this.getList();
  },

  onShow: function (options) {
    this.getList();
  },
  
  getList: function(){
    var that = this;
    var param = {
      action: 'list',
      post: {
        openId: app.globalData.openId
      }
    }
    configCol.requestFun(configCol.collectUrl, param).then(function (data) {
      console.log(data);
    });
  },
  player:function(){
    wx.navigateTo({
      url: config.player,
    })
  },
  //获取当前滑块的index
  bindchange: function (e) {
    const that = this;
    that.setData({
      currentData: e.detail.current
    })
  },
  //点击切换，滑块index赋值
  checkCurrent: function (e) {
    const that = this;
    if (that.data.currentData === e.target.dataset.current) {
      return false;
    } else {

      that.setData({
        currentData: e.target.dataset.current
      })
    }
  }
})
