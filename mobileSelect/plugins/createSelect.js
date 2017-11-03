window.MSelect = function (opts) {
    // 构造函数的设计方式用来解决私有属性的问题。构造出的示例参考jquery的选择器方式，用来绑定扩展属性，使围绕该元素的所有操作都基于扩展属性进行。
    var self = this;
    // 获取选择器序列，可以是单个也可以是数组
    this.selectors = opts.selector;
    // 获取滚动下拉列表的标题序列
    this.titles = opts.title || '';
    // 根据选择器构造出对应的滚动列表
    this.selectorsMap(self.selectors);
};
MSelect.prototype = {
    selectorsMap:function (obj) {
        var self=this;
        //通过函数调用获取滚动下拉列表的实例
        function createSelect(opt) {
            var mobileSelect = new MobileSelect({
                trigger: opt.selector,
                title: opt.title || '',
                wheels: [
                    {data: opt.data?opt.data:[{value:''}]}
                ],
                // keyMap:{id:'id', value:'value', childs:'childs'},
                position:[0], //初始化定位 打开时默认选中的哪个 如果不填默认为0
                transitionEnd:function(indexArr, data){
                    var transEnd=opt.transitionEnd;
                    typeof transEnd ===
                    'function'? transEnd(indexArr,data) : null
                },
                callback:function(indexArr, data){
                    var ms = this;
                    if(ms.checked){
                        if(ms.checked.value === data[0].value){
                            return false;
                        }else {
                            ms.checked = data[0];
                        }
                    } else {
                        ms.checked = data[0];
                    }
                    opt.callback.call(mobileSelect,indexArr,data)
                }
            });
            return mobileSelect;
        }
        obj.map(function (ele,index) {
            var select = createSelect({
                selector: ele,
                title: self.titles?self.titles[index]:'',
                callback: function (idxArr,data) {
                    console.log(123);
                    var subList = data[0].subList;
                    if(subList && subList.length){
                        var sonSelect = self[index+1];
                        sonSelect.updateWheel(0, subList);
                        sonSelect.locatePostion(0,0);
                        obj.map(function (e,i) {
                            if(i>index){
                                self[i].trigger.innerHTML = self.titles[i];
                            }
                        });
                    }
                }
            });
            select.trigger.innerHTML = self.titles[index];
            [].push.call(self,select);
        })
    },
    createSelect:function (opt) {
        var mobileSelect = new MobileSelect({
            trigger: opt.selector,
            title: opt.title || '',
            wheels: [
                {data: opt.data?opt.data:[{value:''}]}
            ],
            position:opt.initIdx?opt.initIdx:[0], //初始化定位 打开时默认选中的哪个 如果不填默认为0
            transitionEnd:function(indexArr, data){
                var transEnd=opt.transitionEnd;
                typeof transEnd === 'function'? transEnd(indexArr,data) : null
            },
            callback:function(indexArr, data){
                opt.callback(indexArr,data)
            }
        });
        return mobileSelect;
    }
};
window.mSelect=function (opt) {
    var checked = opt.checked;
    var checkedKey = opt.checkedKey || 'value';
    var dataList = opt.data;
    var ms = new MSelect({
        selector: opt.selector,
        title: opt.title
    });
    if(!!checked && checked instanceof Array && checked.length) {
        initChecked(0,dataList);
    } else {
        ms[0].updateWheel(0,dataList);
    }
    function initChecked(index,data) {
        ms[index].updateWheel(0,data);
        ms[index].wheelsData[0].data.map(function (obj,i) {
            if(obj.value === checked[index]) {
                ms[index].trigger.innerHTML = checked[index];
                ms[index].checked = obj;
                ms[index].locatePostion(0,i);
                if(index+1 < checked.length){
                    initChecked(index+1,obj.subList);
                }
            }
        })
    }
};