const config = require("../../config/config.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
    var that = this;
    wx.getStorage({
      key: 'openId',
      success: function (res) {
        if (res.data != '') {
          that.setData({
            openId: res.data
          })
        } else {
          wx.showToast({
            title: "请返回登录",
            icon: "none"
          })
          return
        }
      }
    });


    var roomName = '';//直播间名
    var roomIntroduce = '';//直播间简介
    var anchorName = '';//主播名
    var anchorIntroduce = '';//主播简介
    var mode = that.setSth('mode', 'RTC');//画质
    var autopush = true;//自动推流
    var muted = true;//是否静音
    var camera = true;//开启摄像头
    var focus = true; //自动聚集
    var orientation = that.setSth('orientation', 'vertical');//方向
    var beauty = 2;//美颜
    var whiteness = 3;//美白
    var aspect = that.setSth('aspect', '3:4');//宽高比
    var min_bitrate = 200;//最小码率
    var max_bitrate = 1000;//最大码率
    // var waiting_image = '';//进去后台时推流的等待画面
    // var waiting_image_hash = '';//等待画面资源的MD5值
    var zoom = true;//调整焦距
    var device_position = that.setSth('device_position', 'back');//前置或后置 device_position
    var background_mute = true;//进入后台时是否静音

    that.setData({
      roomName: "1",//直播间名
      roomIntroduce: "",//直播间简介
      anchorName: "",//主播名
      anchorIntroduce: "",//主播简介
      mode: mode,    //画质
      autopush: autopush,   //自动推流
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
    })
  },
  /**
   * 自定义方法区域
   */
  // 表单提交
  formSubmit: function (e) {
    var that = this;
    var result = e.detail.value;
    if ((!result.roomName.trim()) || (!result.roomIntroduce.trim()) || (!result.anchorName.trim()) |(!result.anchorIntroduce.trim())){
      wx.showToast({
        title:"请全部填写完毕后提交",
        icon:"none"
      })
      return;
    }
    wx.request({
      url: config.coreUrl+'setRoom.php',
      method:'post',
      dataType:"JSON",
      header: {
        // 'content-type': 'application/json'
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        openId:that.data.openId,
        roomName: result.roomName.trim(),//直播间名
        roomIntroduce: result.roomIntroduce.trim(),//直播间简介
        anchorName: result.anchorName.trim(),//主播名
        anchorIntroduce: result.anchorIntroduce.trim(),//主播简介
        mode: result.mode,//画质
        autopush: result.autopush,//自动推流
        muted: result.muted,//是否静音
        camera: result.camera,//开启摄像头
        focus: result.focus,//自动聚集
        orientation: result.orientation,//方向
        beauty: result.beauty,//美颜
        whiteness: result.whiteness,//美白
        aspect: result.aspect,//宽高比
        min_bitrate: result.min_bitrate,//最小码率
        max_bitrate: result.max_bitrate,//最大码率
        zoom: result.zoom,//调整焦距
        device_position: result.device_position,//前置或后置
        background_mute: result.background_mute//进入后台时是否静音
      },
      success:function(data){
        let result = data.data;
        console.log(result);
        if (result =='success'){
          wx.showToast({
            title: '添加成功'
          })
          setTimeout(function(){
            wx.navigateBack({
              delta: 1
            })
          },1500)
        }else{
          wx.showToast({
            title: '添加异常,请稍后重试',
            icon: 'none'
          })
        }
      },
      fail:function(){
        wx.showToast({
          title: '添加异常,请稍后重试',
          icon:'none'
        })
      }
    })
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