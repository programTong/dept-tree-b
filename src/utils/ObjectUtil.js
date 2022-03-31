
export function deepClone(source) {
    // 判断目标是数组还是对象
    const targetObj = source.constructor === Array ? [] : {};
    for (let key in source) {
        // eslint-disable-next-line no-prototype-builtins
        if (source.hasOwnProperty(key)) {
            //   如果是对象就递归
            if (source[key] && typeof source[key] === 'object') {
                targetObj[key] = source[key].constructor === Array ? [] : {}
                targetObj[key] = deepClone(source[key])
            } else {
                targetObj[key] = source[key]
            }
        }
    }
    return targetObj
}