import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-CN');
console.log(moment().startOf('day').fromNow());