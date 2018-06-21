'use strict';

var extend = require('zhf.extend');
var getDomArray = require('zhf.get-dom-array');
var eventDelegate = require('zhf.event-delegate');

// 全选,不选,反选
function SelectAll(json) {
    this.opts = extend({
        items: null, // 所有的被选项
        isOpenEventDelegate: false, // 是否开启事件委托
        callback: {
            click: function click() {}
        }
    }, json);
    this.init();
}

// 初始化
SelectAll.prototype.init = function () {
    this.itemsDom = getDomArray(this.opts.items); // 获取原生的dom节点并转换成数组
    this.power();
};

// 不选
SelectAll.prototype.selectNothing = function () {
    if (this.opts.isOpenEventDelegate) {
        this.itemsDom = getDomArray(this.opts.items); // 获取原生的dom节点并转换成数组
    }
    this.itemsDom.forEach(function (v) {
        v.checked = false;
    });
};

// 全选
SelectAll.prototype.selectAll = function () {
    if (this.opts.isOpenEventDelegate) {
        this.itemsDom = getDomArray(this.opts.items); // 获取原生的dom节点并转换成数组
    }
    this.itemsDom.forEach(function (v) {
        v.checked = true;
    });
};

// 反选
SelectAll.prototype.selectReverse = function () {
    if (this.opts.isOpenEventDelegate) {
        this.itemsDom = getDomArray(this.opts.items); // 获取原生的dom节点并转换成数组
    }
    this.itemsDom.forEach(function (v) {
        v.checked = !v.checked;
    });
};

SelectAll.prototype.isSelectAll = function () {
    if (this.opts.isOpenEventDelegate) {
        this.itemsDom = getDomArray(this.opts.items); // 获取原生的dom节点并转换成数组
    }
    var isCheckedAll = true; // 是否全部的选项都被选中了(假设全部选中)
    this.itemsDom.forEach(function (v2) {
        if (v2.checked === false) {
            isCheckedAll = false;
        }
    });
    return isCheckedAll;
};

// 当某一项被选中时,是否全部选项都被选中了
SelectAll.prototype.power = function () {
    var self = this;
    if (self.opts.isOpenEventDelegate) {
        eventDelegate.on(document, 'click', self.opts.items, function () {
            self.opts.callback.click({ element: this, isCheckedAll: self.isSelectAll() });
        });
    } else {
        this.itemsDom.forEach(function (v1) {
            if (v1.isBindSelectAllClick) {
                return;
            }
            v1.addEventListener('click', function () {
                v1.isBindSelectAllClick = true;
                self.opts.callback.click({ element: this, isCheckedAll: self.isSelectAll() });
            });
        });
    }
};

module.exports = SelectAll;