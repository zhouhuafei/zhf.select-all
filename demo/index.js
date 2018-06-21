const SelectAll = require('../dist/index.min');

const selectAll = new SelectAll({
    items: '.input-checkbox', // 所有的被选项
    callback: {
        click: function (data) {
            console.log(data);
        },
    },
});

window.selectAll = selectAll; // 后续新增元素或者删除元素只需要调用一下selectAll.init()即可。
