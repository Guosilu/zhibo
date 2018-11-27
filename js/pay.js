const config = require('../config/config.js');
class pay {
  constructor({body, total_fee, openId, onExec}) {
    this.body = body || "未填";
    this.total_fee = total_fee || 0;
    this.openId = openId || "";
    this.onExec = onExec;
  }
  
  exec() {
    console.log(this.body);
    console.log(this.total_fee);
    console.log(this.openId);
    this.getSign()
      .catch(function (error) {
        console.log('error: ' + error);
      })
      .then(this.requestPayment)
      .catch(function (error) {
        console.log('error: ' + error);
      })
      .then(this.onExec);//支付成功回调函数
  }

  //获取paySign
  getSign() {
    this.showLoading({title: "正在调起支付..."});
    let randa = new Date().getTime().toString();
    let randb = Math.round(Math.random() * 10000).toString();
    let body = this.body;
    let out_trade_no = randa + randb;
    let total_fee = this.total_fee;
    let openId = this.openId;
    console.log(openId);
    return new Promise((resolve, reject) => {
      wx.request({
        url: config.payApi,
        dataType: "json",
        method: "post",
        data: {
          action: "getSign",
          body: body, //商品描述
          out_trade_no: randa + randb, //商户订单号
          total_fee: total_fee, //金额 单位:分
          trade_type: "JSAPI", //交易类型
          openId: openId
        },
        success: (res) => {
          wx.hideLoading();
          resolve(res.data);
        }
      })
    })
  }

  //调起支付
  requestPayment(data) {
    console.log(data);
    return new Promise((resolve, reject) => {
      wx.requestPayment({
        'timeStamp': data.timeStamp,
        'nonceStr': data.nonceStr,
        'package': data.package,
        'signType': data.signType,
        'paySign': data.sign,
        success: (res) => {
          resolve(res);
        }
      })
    })
  }

  showLoading ({title, mark}) {
    mark = mark || true;
    wx.showLoading({
      mark: mark,
      title: title
    })
  }
}

var doPay = (opt) => {
  return new pay(opt).exec();
}
module.exports = {
  pay: doPay
}