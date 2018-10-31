const config = require('../../config/config.js');
const configCol = require("../../config/collect.js");
const common = require("../../js/common.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: {},
    history_list: {},
    allList: {},
    currentData: 0,
  },
  getList: function () {
    let dataObjList = [
      {
        name: 'collectList',
        url: configCol.collectUrl,
        data: {
          action: 'list',
          post: {
            openId: app.globalData.openId
          }
        }
      },
      {
        name: 'historyList',
        url: configCol.collectUrl,
        data: {
          action: 'history',
          post: {
            openId: app.globalData.openId
          }
        }
      }
    ]
    let that = this;
    //let dataObjList = this.data.dataObjList;
    let promiseArr = [];
    for (let i = 0; i < dataObjList.length; i++) {
      let promise = common.indexListFun(dataObjList[i]);
      promiseArr.push(promise)
    }
    Promise.all(promiseArr).then(function (res) {
      let allList = {};
      for (let i = 0; i < res.length; i++) {
        allList[res[i].name] = res[i].data
      }
      that.setData({
        allList: allList
      });
      that.stopRefresh();
      console.log(allList);
    });
  },
  stopRefresh: function () {
    this.setData({
      loading: 1,
    })
    wx.hideLoading();
    // 隐藏导航栏加载框
    wx.hideNavigationBarLoading();
    // 停止下拉动作
    wx.stopPullDownRefresh();
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载...',
    })
    this.getList();
  },

  onShow: function (options) {
    
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
