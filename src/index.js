const extend = require('zhf.extend');
const getDomArray = require('zhf.get-dom-array');
const eventDelegate = require('zhf.event-delegate');

// 全选,不选,反选
function SelectAll(json) {
    this.opts = extend({
        items: null, // 所有的被选项
        isOpenEventDelegate: false, // 是否开启事件委托
        isFilterDisabled: true, // 是否过滤被禁用的
        isUseCheckboxBtnSelectAll: false, // 是否使用checkbox进行全选和不选操作
        checkboxBtn: null, // 如果使用checkbox进行全选和不选操作，请传入对应的checkbox元素。
        callback: {
            click: function () {
            },
        },
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
    const self = this;
    const opts = self.opts;
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
    const self = this;
    const opts = self.opts;
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
    const self = this;
    const opts = self.opts;
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
    const self = this;
    const opts = self.opts;
    if (opts.isOpenEventDelegate) {
        self.itemsDom = getDomArray(opts.items); // 获取原生的dom节点并转换成数组
    }
    let isCheckedAll = true; // 是否全部的选项都被选中了(假设全部选中)
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
    const self = this;
    const opts = self.opts;
    const isUseCheckboxBtnSelectAll = opts.isUseCheckboxBtnSelectAll;
    const checkboxBtnDom = document.querySelector(opts.checkboxBtn);
    const isCheckbox = checkboxBtnDom ? checkboxBtnDom.type === 'checkbox' : false;
    if (isUseCheckboxBtnSelectAll && isCheckbox) { // 如果使用checkbox进行全选和不选操作
        if (!checkboxBtnDom.isBindSelectAllClick) { // 防止多次绑定事件
            checkboxBtnDom.isBindSelectAllClick = true;
            checkboxBtnDom.addEventListener('click', function () {
                if (this.checked) {
                    self.selectAll();
                } else {
                    self.selectNothing();
                }
            });
        }
    }
    if (opts.isOpenEventDelegate) {
        if (!document.isBindSelectAllClick) { // 防止多次绑定事件
            document.isBindSelectAllClick = true;
            eventDelegate.on(document, 'click', opts.items, function () {
                const isCheckedAll = self.isSelectAll();
                if (isUseCheckboxBtnSelectAll && isCheckbox) {
                    checkboxBtnDom.checked = isCheckedAll;
                }
                opts.callback.click({element: this, isCheckedAll: isCheckedAll});
            });
        }
    } else {
        self.itemsDom.forEach(function (v) {
            if (!v.isBindSelectAllClick) { // 防止多次绑定事件
                v.isBindSelectAllClick = true;
                v.addEventListener('click', function () {
                    const isCheckedAll = self.isSelectAll();
                    if (isUseCheckboxBtnSelectAll && isCheckbox) {
                        checkboxBtnDom.checked = isCheckedAll;
                    }
                    opts.callback.click({element: this, isCheckedAll: isCheckedAll});
                });
            }
        });
    }
};

module.exports = SelectAll;
