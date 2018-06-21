# 是否全选了，全选，不选，反选
```
const SelectAll = require('zhf.select-all');

const selectAll = new SelectAll({
    items: '.input-checkbox', // 所有的被选项
    callback: {
        click: function (data) {
            console.log(data);
        },
    },
});
```
* 后续新增元素或者删除元素只需要调用一下selectAll.init()即可。
