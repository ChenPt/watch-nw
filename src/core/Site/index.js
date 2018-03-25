const { EventEmitter } = require("events")
    , rp = require('request-promise')
    , Url = require('url')
// Symbol 
const box = Symbol('Site-box'); 

// Exports 
module.exports = class Site extends EventEmitter {
    /**
     * @description 构造函数 
     * @param { String } entry 第一页入口
     */
    constructor(entry) {
        super(); 

        this.url = Url.parse(entry); 
        this[box] = null; 
    }

    get host() {
        return this.url.host; 
    }
    
    get entry() {
        return Url.format(this.url); 
    }

    /**
     * @description 从缓存里获取 data 如果没有则创建缓存 
     * @returns { Promise<String> } 对应 this.entry 返回的 response 字符串
     */
    fetch() {
        if (this[box]) {
            return Promise.resolve(this[box]); 
        } else {
            return rp.get(this.entry).then(res => {
                this[box] = res; 
                return res; 
            }); 
        }
    }

    /**
     * @description 清空 box 里的东西 
     * @returns { Site } 支持链式调用 
     */
    clearBox() {
        this[box] = null; 

        return this; 
    }

    /**
     * @description 清空缓存 然后再请求 （变相直接请求）
     */
    fetchDir() {
        return this.clearBox().fetch(); 
    }
}
