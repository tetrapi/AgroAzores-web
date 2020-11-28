import moment from 'moment-timezone'
import Config from '../config';

const formatEU = 'DD/MM/YYYY HH:mm';
const formatUS = 'YYYY-MM-DD HH:mm';

export const removeElem = (array, key, value) => {
    return [...array.filter((v) => {
        return find(v, key) !== value
    })]

};

export const updateElemByIndex = (array, elem, index) => {
    const newArray = [...array];
    newArray[index] = elem;
    return newArray;
};

export const addElem = (array, elem) => {
    return [...array, elem];
};

export const removeAt = (array, index) => {
    return [...array.filter((item, i) => i !== index)]
};

export const find = (obj = null, key = null, maxDepth = 2) => {
    if (!obj || !key) return null;

    if(key.includes(".")) {
        const keys = key.split(".")
        let value = obj;
        keys.forEach((v) => {
            value = find(value, v, maxDepth)
        });
        return value;
    }

    let keys = Object.keys(obj).filter(value => value === key);

    if (keys.length > 0) return obj[key];

    if(maxDepth) {
        maxDepth--;
    }

    if (maxDepth === null || maxDepth >= 1) {

        keys = Object.keys(obj).filter(value => typeof obj[value] === 'object');
        if (keys.length > 0) {
            const ks = keys.map(value => {
                return find(obj[value], key, maxDepth);
            }).filter(value => {
                return value !== null;
            });

            if(ks.length > 0) {
               return ks.reduce(value => {
                   return value
               })
            }
        }
    }
    return undefined;
};

export const isFieldInArray = (array, key) => {
    if(!array) return false;
    return array.some((value) => {
        return find(value, key) !== undefined
    })
};

export const removeObjectWithFieldInArray = (array, key) => {
    if(!array) return false;
    return array.filter((value) => {
        return find(value, key) === undefined
    })
};

export const formatDateTimeUSToEU = (dateTime) => {
    return moment(dateTime, formatUS).format(formatEU)
};

export const formatDateTimeEUtoUS = (dateTime, dashes = false) => {
    return moment(dateTime, formatEU).format(formatUS)
};

export const nowDateTimeToUs = () => {
    return new Date(moment().tz("Atlantic/Azores").format(formatUS))
};

export function debug(){
    if(Config.debug) console.log(...arguments)
};
