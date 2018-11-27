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
    this.unifiedOrder()
      .then(this.getSign)
      .then(this.requestPayment)
      .then(this.AddData)
      .then(this.onExec);
  }

  unifiedOrder() {
    let randa = new Date().getTime().toString();
    let randb = Math.round(Math.random() * 10000).toString();
    let body = this.body;
    let out_trade_no = randa + randb;
    let total_fee = this.total_fee;
    let openId = this.openId;
    return new Promise((resolve, reject) => {
      wx.request({
        url: config.payApi,
        dataType: "json",
        method: "post",
        data: {
          action: "unifiedOrder",
          body: body, //商品描述
          out_trade_no: randa + randb, //商户订单号
          total_fee: total_fee, //金额 单位:分
          trade_type: "JSAPI", //交易类型
          openId: openId
        },
        success: function (res) {
          resolve(res.data);
        }
      })
    })
  }

  getSign(a) {
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        console.log(a);
        resolve("getSign");
      }, 1000);
    })
  }

  requestPayment(b) {
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        console.log(b);
        resolve("requestPayment");
      }, 1000);
    })
  }

  AddData(c) {
    return new Promise((resolve, reject) => {
      setTimeout(function () {
        console.log(c);
        resolve("success");
      }, 1000);
    })
  }
}

var doPay = (opt) => {
  return new pay(opt).exec();
}
module.exports = {
  pay: doPay
}