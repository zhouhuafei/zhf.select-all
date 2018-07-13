'use strict';

var extend = require('zhf.extend');
var getDomArray = require('zhf.get-dom-array');
var eventDelegate = require('zhf.event-delegate');

// 全选,不选,反选
function SelectAll(json) {
    this.opts = extend({
        items: null, // 所有的被选项
        isOpenEventDelegate: false, // 是否开启事件委托
        isFilterDisabled: true, // 是否过滤被禁用的
        isUseCheckboxSelectAll: false, // 是否使用checkbox进行全选和不选操作
        checkboxSelectAll: null, // 如果使用checkbox进行全选和不选操作，请传入对应的checkbox元素。
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
    var self = this;
    var opts = self.opts;
    if (opts.isOpenEventDelegate) {
        self.itemsDom = getDomArray(opts.items); // 获取原生的dom节点并转换成数组
    }
    self.itemsDom.forEach(function (v) {
        if (opts.isFilterDisabled && v.disabled) {
            return;
        }
        v.checked = false;
    });
};

// 全选
SelectAll.prototype.selectAll = function () {
    var self = this;
    var opts = self.opts;
    if (opts.isOpenEventDelegate) {
        self.itemsDom = getDomArray(opts.items); // 获取原生的dom节点并转换成数组
    }
    self.itemsDom.forEach(function (v) {
        if (opts.isFilterDisabled && v.disabled) {
            return;
        }
        v.checked = true;
    });
};

// 反选
SelectAll.prototype.selectReverse = function () {
    var self = this;
    var opts = self.opts;
    if (opts.isOpenEventDelegate) {
        self.itemsDom = getDomArray(opts.items); // 获取原生的dom节点并转换成数组
    }
    self.itemsDom.forEach(function (v) {
        if (opts.isFilterDisabled && v.disabled) {
            return;
        }
        v.checked = !v.checked;
    });
};

// 是否全部选中了
SelectAll.prototype.isSelectAll = function () {
    var self = this;
    var opts = self.opts;
    if (opts.isOpenEventDelegate) {
        self.itemsDom = getDomArray(opts.items); // 获取原生的dom节点并转换成数组
    }
    var isCheckedAll = true; // 是否全部的选项都被选中了(假设全部选中)
    self.itemsDom.forEach(function (v) {
        if (opts.isFilterDisabled && v.disabled) {
            return;
        }
        if (v.checked === false) {
            isCheckedAll = false;
        }
    });
    return isCheckedAll;
};

// 当某一项被选中时,是否全部选项都被选中了
SelectAll.prototype.power = function () {
    var self = this;
    var opts = self.opts;
    var isUseCheckboxSelectAll = opts.isUseCheckboxSelectAll;
    var checkboxSelectAllDom = document.querySelector(opts.checkboxSelectAll);
    var isCheckbox = checkboxSelectAllDom.type === 'checkbox';
    if (isUseCheckboxSelectAll && isCheckbox) {
        // 如果使用checkbox进行全选和不选操作
        if (!checkboxSelectAllDom.isBindSelectAllClick) {
            // 防止多次绑定事件
            checkboxSelectAllDom.isBindSelectAllClick = true;
            checkboxSelectAllDom.addEventListener('click', function () {
                if (this.checked) {
                    self.selectAll();
                } else {
                    self.selectNothing();
                }
            });
        }
    }
    if (opts.isOpenEventDelegate) {
        if (!document.isBindSelectAllClick) {
            // 防止多次绑定事件
            document.isBindSelectAllClick = true;
            eventDelegate.on(document, 'click', opts.items, function () {
                var isCheckedAll = self.isSelectAll();
                if (isUseCheckboxSelectAll && isCheckbox) {
                    checkboxSelectAllDom.checked = isCheckedAll;
                }
                opts.callback.click({ element: this, isCheckedAll: isCheckedAll });
            });
        }
    } else {
        self.itemsDom.forEach(function (v) {
            if (!v.isBindSelectAllClick) {
                // 防止多次绑定事件
                v.isBindSelectAllClick = true;
                v.addEventListener('click', function () {
                    var isCheckedAll = self.isSelectAll();
                    if (isUseCheckboxSelectAll && isCheckbox) {
                        checkboxSelectAllDom.checked = isCheckedAll;
                    }
                    opts.callback.click({ element: this, isCheckedAll: isCheckedAll });
                });
            }
        });
    }
};

module.exports = SelectAll;