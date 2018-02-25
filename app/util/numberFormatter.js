import string from '../localization/string';

export const numberFormatter = (int) => {
    if (int < 1000) {
        return int;
    } else if (int >= 1000 && int < 1000000) {
        if (int%1000 === 0) {
            return (int/1000) + string.Thousand;
        }
        return Math.floor((int/1000) * 10)/10 + string.Thousand;
    } else if ( int >= 1000000 && int < 1000000000 ) {
        if (int%1000000 === 0) {
            return (int/1000000) + string.Million;
        }
        return Math.floor((int/1000000) * 10)/10 + string.Million;
    } else {
        if (int%1000000000) {
            return (int/1000000000) + string.Billion;            
        }
        return Math.floor((int/1000000000) * 10)/10 + string.Million;
    }
}