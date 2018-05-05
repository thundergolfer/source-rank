import prodConfig from './config.prod';
import devConfig from './config.dev';

const isProd = process.env.NODE_ENV === 'production';

export default isProd
  ? prodConfig
  : devConfig;
