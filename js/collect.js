const config = require('../config/config.js');
const app = getApp();
class collect {
  constructor({ id, act, itemType, onExec }) {
    this.act = act || null;
    this.itemType = itemType || null;
    this.itemid = itemType == "video" ? id : "";
    this.room_openId = itemType == "live" ? id : "";
    this.collect_status = act == "add" ? 1 : 0;
    this.tipTitle = act == "add" ? '已关注！' : '已取消！';
    this.onExec = onExec;
    console.log(id);
    console.log(act);
    console.log(itemType);
    console.log(this.itemid);
  }

  exec() {
    this.request().catch(function (error) {console.log('error: ' + error);})
      //.then(this.request).catch(function (error) {console.log('error: ' + error);})
      .then(this.onExec);
  }

  //请求
  request() {
    let url = config.collectUrl;
    let openId = app.globalData.openId;
    let itemid = this.itemid;
    let room_openId = this.room_openId;
    let itemType = this.itemType;
    let act = this.act;
    return new Promise(function (resolve, reject) {
      wx.request({
        url: url,
        method: "POST",
        data: {
          action: 'collect_add_minus',
          post: {
            itemid: itemid,
            room_openId: room_openId,
            openId: openId,
            act: act,
            type: itemType
          }},
        success: function (res) {
          resolve(res.data);
        }
      });
    });
  }
}

var doCollect = (opt) => {
  return new collect(opt).exec();
}
module.exports = {
  collect: doCollect
}