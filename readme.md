# 是否全选了，全选，不选，反选
```
const SelectAll = require('zhf.select-all');
new SelectAll({
    items: '.input-checkbox', // 所有的被选项
    callback: {
        click: function (data) {
            console.log(data);
        },
    },
});
```
