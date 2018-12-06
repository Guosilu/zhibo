const config = require("../../config/config.js");
const uploadFile = require("../../js/upload.js");
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    lock: false,
    openId:"",
    roomName:"",//直播间名
    roomIntroduce:"",//直播间简介
    anchorName:"",//主播名
    anchorIntroduce:"",//主播简介
    //画质
    mode: [
      { name: 'SD', value: 'SD（标清）：', checked: ''},
      { name: 'HD', value: 'HD（高清）：', checked: ''},
      { name: 'FHD', value: 'FHD（超清）：', checked: ''},
      { name: 'RTC', value: 'RTC（实时通话）：', checked: ''}
    ],
    autopush: '',   //自动推流
    muted: '',     //是否静音
    camera: "",     //开启摄像头
    focus: "",       //自动聚集 
    orientation: [    //方向 vertical=>垂直 horizontal=>水平
      { name: 'vertical', value: '垂直', checked: ''},
      { name: 'horizontal', value: '水平', checked: ''}
    ],
    beauty: "",     //美颜
    whiteness: "", //美白
    aspect: [    //宽高比  9:16  3:4
      { name: '3:4', value: '3:4', checked: '' },
      { name: '9:16', value: '9:16', checked: '' }
    ],
    min_bitrate: "", //最小码率
    max_bitrate: "", //最大码率
    // waiting_image: "",//进入后台时推流的等待画面
    // waiting_image_hash: "",//等待画面资源的MD5值
    zoom: "",           //调整焦距
    device_position: [ //前置或后置，值为front, back
      { name: 'front', value: '前置', checked: '' },
      { name: 'back', value: '后置', checked: '' }
    ],
    background_mute: "",//进入后台时是否静音
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.showLoading('正在加载...');
    var openId = app.globalData.openId ? app.globalData.openId :""
    this.query(openId);
  },
  query: function (openId){
    var that = this;
    wx.request({
      url: config.coreUrl + 'getRoom.php',
      method: 'post',
      dataType: "JSON",
      data: {
        action: "show",
        openId: openId
      },
      success: function (res) {
        var value = JSON.parse(res.data);
        console.log(value);
        var thumbPath = [];
        var thumb = value.thumb;//封面图片
        var roomName = value.roomName;//直播间名
        var roomIntroduce = value.roomIntroduce;//直播间简介
        var anchorName = value.anchorName;//主播名
        var anchorIntroduce = value.anchorIntroduce;//主播简介
        var mode = that.setSth('mode', value.mode);//画质
        var autopush = Boolean(parseInt(value.autopush));//自动推流
        var muted = Boolean(parseInt(value.muted));//是否静音
        var camera = Boolean(parseInt(value.camera));//开启摄像头
        var focus = Boolean(parseInt(value.focus)); //自动聚集
        var orientation = that.setSth('orientation', value.orientation);//方向
        var beauty = value.beauty;//美颜
        var whiteness = value.whiteness;//美白
        var aspect = that.setSth('aspect', value.aspect);//宽高比
        var min_bitrate = 200;//最小码率
        var max_bitrate = 1000;//最大码率
        // var waiting_image = '';//进去后台时推流的等待画面
        // var waiting_image_hash = '';//等待画面资源的MD5值
        var zoom = Boolean(parseInt(value.zoom));//调整焦距
        var device_position = that.setSth('device_position', value.device_position);//前置或后置 device_position
        var background_mute = Boolean(parseInt(value.background_mute));//进入后台时是否静音

        that.setData({
          thumbPath: thumbPath.concat(thumb),
          roomName: roomName,//直播间名
          roomIntroduce: roomIntroduce,//直播间简介
          anchorName: anchorName,//主播名
          anchorIntroduce: anchorIntroduce,//主播简介
          mode: mode,    //画质
          autopush: 0,   //自动推流
          muted: muted,     //是否静音
          camera: camera,     //开启摄像头
          focus: focus,       //自动聚集 
          orientation: orientation,  //方向 vertical=>垂直 horizontal=>水平
          beauty: beauty,     //美颜
          whiteness: whiteness, //美白
          aspect: aspect,  //宽高比  9:16  3:4
          min_bitrate: min_bitrate, //最小码率
          max_bitrate: max_bitrate, //最大码率
          // waiting_image: waiting_image,//进入后台时推流的等待画面
          // waiting_image_hash: waiting_image_hash,//等待画面资源的MD5值
          zoom: zoom,           //调整焦距
          device_position: device_position, //前置或后置，值为front, back
          background_mute: background_mute,//进入后台时是否静音
          lock: true
        })
        wx.hideLoading();
      }
    })
  },

  /**
   * 自定义方法区域
   */
  // 表单提交
  formSubmit: function (e) {
    var that = this;
    var result = e.detail.value;
    let fileObjList = this.fileParamConfig();
    if ((!result.roomName.trim()) || (!result.roomIntroduce.trim()) || (!result.anchorName.trim()) |(!result.anchorIntroduce.trim())){
      wx.showToast({
        title:"请全部填写完毕后提交",
        icon:"none"
      })
    }
    this.showLoading('正在上传文件...');
    console.log(fileObjList);
    uploadFile.upload({
      fileObjList: fileObjList,
      onExec: (res) => {
        if (res.length < 1) return;
        console.log(res);
        let thumb = res[0].fileUrl;
        that.showLoading('正在提交数据...');
        wx.request({
          url: config.coreUrl + 'setRoom.php',
          method: 'post',
          dataType: "JSON",
          header: {
            // 'content-type': 'application/json'
            'content-type': 'application/x-www-form-urlencoded'
          },
          data: {
            thumb: thumb,
            openId: app.globalData.openId,
            roomName: result.roomName.trim(),//直播间名
            roomIntroduce: result.roomIntroduce.trim(),//直播间简介
            anchorName: result.anchorName.trim(),//主播名
            anchorIntroduce: result.anchorIntroduce.trim(),//主播简介
            mode: result.mode,//画质
            autopush: result.autopush ? 1 : 0,//自动推流
            muted: result.muted ? 1 : 0,//是否静音
            camera: result.camera ? 1 : 0,//开启摄像头
            focus: result.focus ? 1 : 0,//自动聚集
            orientation: result.orientation,//方向
            beauty: result.beauty,//美颜
            whiteness: result.whiteness,//美白
            aspect: result.aspect,//宽高比
            min_bitrate: result.min_bitrate,//最小码率
            max_bitrate: result.max_bitrate,//最大码率
            zoom: result.zoom ? 1 : 0,//调整焦距
            device_position: result.device_position,//前置或后置
            background_mute: result.background_mute ? 1 : 0//进入后台时是否静音
          },
          success: function (data) {
            let result = data.data;
            console.log(result);
            if (result) {
              wx.showToast({
                title: '添加成功'
              })
              //that.query(app.globalData.openId);
              setTimeout(function () {
                wx.navigateBack({
                  delta: 1
                })
              }, 1500)
              wx.hideLoading();
            } else {
              wx.showToast({
                title: '添加异常,请稍后重试1',
                icon: 'none'
              })
            }
          },
          fail: function () {
            wx.showToast({
              title: '添加异常,请稍后重试',
              icon: 'none'
            })
          }
        })
      }
    })
    return;
  },

  //上传文件参数配置
  fileParamConfig: function () {
    var fileObjList = [];
    fileObjList.push({
      filePath: this.data.thumbPath[0],
      columnName: 'thumb',
    });
    return fileObjList;
  },
  /**
   * 设置单选
   */
  setSth: function (datas,param){
    var that = this;
    var data = that.data[datas];
    for (let b = 0; b < data.length; b++) {
      if (data[b]['name'] == param) {
        data[b]['checked'] = 'true';
      } else {
        data[b]['checked'] = '';
      }
    }
    return data;
  },

  //选择图片
  chooseImage: function () {
    var that = this;
    var thumbPath = [];
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        that.setData({
          thumbPath: thumbPath.concat(res.tempFiles[0].path),
          thumbSize: res.tempFiles[0].size,
        });
      }
    })
  },

  //删除图片
  deleteImage: function () {
    this.setData({
      thumbPath: '',
      thumbSize: '',
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

  //提示方法
  showTip: function (msg) {
    wx.showToast({
      icon: 'none',
      title: msg,
    })
  },

  //加载方法
  showLoading: function (msg, mask) {
    var mask = mask || true;
    wx.showLoading({
      mask: mask,
      title: msg,
    })
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