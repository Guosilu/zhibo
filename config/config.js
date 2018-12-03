
// 定义常量
const appid = 'wxd3a3d4ee9ea470d4';
const secret = '6a797e94a40bbb286594c461f621ae62';
const jscode2session = 'https://api.weixin.qq.com/sns/jscode2session';
const baseUrl = 'https://aa.zdcom.net.cn/';
const loginUrl = baseUrl + 'wechatProgram/api/loginApi.php';
const coreUrl = baseUrl +"wechatProgram/core/";
const img = baseUrl +"wechatProgram/images/";
const playerUrl = baseUrl + 'wechatProgram/api/playerApi.php';
const collectUrl = baseUrl + 'wechatProgram/api/collectApi.php';
const videoUrl = baseUrl + 'wechatProgram/api/videoApi.php';
const uploadUrl = baseUrl + 'wechatProgram/api/uploadApi.php';
const myUrl = baseUrl + 'wechatProgram/api/myApi.php';
const payApi = baseUrl + 'wechatProgram/pay/GetSth.php';

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
  loginUrl: loginUrl,
  coreUrl:coreUrl,
  img: img,
  videoUrl: videoUrl,
  uploadUrl: uploadUrl,
  playerUrl: playerUrl,
  collectUrl: collectUrl,
  payApi: payApi,
  myUrl: myUrl,

  // 页面
  pusher: pusher,
  player: player,
  category: category,
  collect: collect,
  index: index,
  list: list,
  my: my,
  log: log,
  setRoom: setRoom,


}