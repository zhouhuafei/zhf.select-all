# 是否全选了，全选，不选，反选
```
const SelectAll = require('zhf.select-all');

const selectAll = new SelectAll({
    items: '.wrap .input-checkbox', // 所有的被选项
    isOpenEventDelegate: false, // 是否开启事件委托
    isFilterDisabled: true, // 是否过滤被禁用的
    isUseCheckboxSelectAll: true, // 是否使用checkbox进行全选和不选操作
    checkboxSelectAll: '.select-all .input-checkbox', // 如果使用checkbox进行全选和不选操作，请传入对应的checkbox元素。
    callback: {
        click: function (data) {
            console.log(data);
        },
    },
});
```
* 后续新增元素导致事件丢失，删除元素导致判断是否全部选中出现误差。
    - 解决方案1、新增或者删除元素之后，调用一下selectAll.init()。
    - 解决方案2、新增或者删除元素之后，重新new一下SelectAll({})方法。
    - 解决方案3、开启事件委托，参数isOpenEventDelegate设置为true。
