# 是否全选了，全选，不选，反选
```
const SelectAll = require('zhf.select-all');

const selectAll = new SelectAll({
    items: '.input-checkbox', // 所有的被选项
    isOpenEventDelegate: false, // 是否开启事件委托
    callback: {
        click: function (data) {
            console.log(data);
        },
    },
});
```
* 后续新增元素或者删除元素事件丢失
    - 解决方案1、重新调用一下selectAll.init()即可。
    - 解决方案2、开启事件委托，参数isOpenEventDelegate设置为true。
