/**
 * 根据url判断所处的环境，修改环境变量
 */

let url = 'http://106.14.133.84:8000';

const EnvConfig = {
  // api 接口变量
  BASE_API_PATH: url,
  // 当前域名变量
  BASE_URL: 'http://net0.accucarbon.com/',
};

export default EnvConfig;
