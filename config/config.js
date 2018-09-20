
// 定义常量
const appid = 'wxd3a3d4ee9ea470d4';
const secret = '6a797e94a40bbb286594c461f621ae62';
const jscode2session = 'https://api.weixin.qq.com/sns/jscode2session';
const baseUrl = 'http://aa.zdcom.net.cn/';
const unionIdUrl = baseUrl + 'wechatProgram/user/unionId/unionIdApi.php';
const coreUrl = baseUrl +"wechatProgram/core/";
const img = baseUrl +"wechatProgram/images/";


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
  appid: appid,
  secret: secret,
  jscode2session: jscode2session,
  unionIdUrl: unionIdUrl,
  coreUrl:coreUrl,
  img: img,


  // 页面
  pusher: pusher,
  player: player,
  category: category,
  collect: collect,
  index: index,
  list: list,
  my: my,
  log: log


}