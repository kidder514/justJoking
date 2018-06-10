import LocalizedStrings from 'react-native-localization';
import enAU from './string-enAU';
import zhTW from './string-zhTW';
import zhCN from './string-zhCN';


// available language code
// 

const string = new LocalizedStrings({
	'en-AU': enAU,
	'zh-TW': zhTW,
	'zh-CN': zhCN,
});

export default string;
