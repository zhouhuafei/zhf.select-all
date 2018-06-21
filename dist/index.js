'use strict';

var extend = require('zhf.extend');
var getDomArray = require('zhf.get-dom-array');

// 全选,不选,反选
function SelectAll(json) {
    this.opts = extend({
        items: null, // 所有的被选项
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
    this.itemsDom.forEach(function (v) {
        v.checked = false;
    });
};

// 全选
SelectAll.prototype.selectAll = function () {
    this.itemsDom.forEach(function (v) {
        v.checked = true;
    });
};

// 反选
SelectAll.prototype.selectReverse = function () {
    this.itemsDom.forEach(function (v) {
        v.checked = !v.checked;
    });
};

// 当某一项被选中时,是否全部选项都被选中了
SelectAll.prototype.power = function () {
    var self = this;
    this.itemsDom.forEach(function (v1) {
        if (v1.isBindSelectAllClick) {
            return;
        }
        v1.addEventListener('click', function () {
            v1.isBindSelectAllClick = true;
            var isCheckedAll = true; // 是否全部的选项都被选中了(假设全部选中)
            self.itemsDom.forEach(function (v2) {
                if (v2.checked === false) {
                    isCheckedAll = false;
                }
            });
            self.opts.callback.click({ element: this, isCheckedAll: isCheckedAll });
        });
    });
};

module.exports = SelectAll;