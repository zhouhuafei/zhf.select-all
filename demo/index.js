const SelectAll = require('../dist/index.min');
new SelectAll({
    items: '.input-checkbox', // 所有的被选项
    callback: {
        click: function (data) {
            console.log(data);
        },
    },
});
