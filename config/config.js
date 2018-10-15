
// 定义常量
const baseUrl = 'https://aa.zdcom.net.cn/';
const loginUrl = baseUrl + 'wechatProgram/api/loginApi.php';
const coreUrl = baseUrl + "wechatProgram/core/";
const img = baseUrl + "wechatProgram/images/";


// 页面常量
const pusher = '../pusher/pusher';
const player = '../player/player';
const category = '../category/category';
const collect = '../collect/collect';
const index = '../index/index';
const list = '../list/list';
const my = '../my/my';
const setRoom = '../setRoom/setRoom';
const log = '../log/log';

// 对外接口
module.exports = {
  loginUrl: loginUrl,
  coreUrl: coreUrl,
  img: img,


  // 页面
  pusher: pusher,
  player: player,
  category: category,
  collect: collect,
  index: index,
  list: list,
  my: my,
  setRoom: setRoom,
  log: log


}