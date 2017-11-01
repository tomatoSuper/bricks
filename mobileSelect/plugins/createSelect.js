window.MSelect = function (opt) {
    var self = this;
    this.selectors = opt.selector;
    this.map(self.selectors);
    // var mobileSelect = new MobileSelect({
    //     trigger: opt.selector,
    //     title: opt.title,
    //     wheels: [
    //         {data: opt.data?opt.data:[{value:''}]}
    //     ],
    //     position:[opt.initIdx?opt.initIdx:0], //初始化定位 打开时默认选中的哪个 如果不填默认为0
    //     transitionEnd:function(indexArr, data){
    //         opt.transitionEnd(indexArr[0],data)
    //     },
    //     callback:function(indexArr, data){
    //         opt.callback(indexArr[0],data)
    //     }
    // });
};
MSelect.prototype = {
    map:function (obj) {
        var self=this;
        obj.map(function (ele) {
            [].push.call(self,ele);
        })
    },
};

var ms = new MSelect({
    selector: ["#lv1","#lv2","#lv3"]
});
console.log(ms);