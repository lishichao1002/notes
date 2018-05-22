var PubSub = /** @class */ (function () {
    function PubSub() {
        this.topics = {};
    }
    PubSub.prototype.subscribe = function (topic, callback) {
        var _this = this;
        if (!this.topics[topic]) {
            this.topics[topic] = [];
        }
        this.topics[topic].push(callback);
        return function () {
            _this.topics[topic] = _this.topics[topic].filter(function (_callback) { return _callback !== callback; });
        };
    };
    PubSub.prototype.publish = function (topic, args) {
        if (this.topics[topic]) {
            this.topics[topic].forEach(function (callback) { return callback(args); });
        }
    };
    return PubSub;
}());
var Vue = /** @class */ (function () {
    function Vue(options) {
        var _this = this;
        this.options = options;
        this.pubsub = new PubSub();
        if (this.options.data) {
            Object.keys(this.options.data).forEach(function (key) {
                var val;
                Object.defineProperty(_this, key, {
                    enumerable: true,
                    configurable: true,
                    get: function () {
                        return val;
                    },
                    set: function (_val) {
                        _this.val = _val;
                        _this.pubsub.publish(key, _val);
                    }
                });
            });
        }
        new Compile(this);
        Object.assign(this, this.options.data || {});
    }
    return Vue;
}());
var Compile = /** @class */ (function () {
    function Compile(vue) {
        this.vue = vue;
        var fragment = this.nodeToFragment(this.vue.options.el);
        this.compileElement(fragment);
        this.vue.options.el.appendChild(fragment);
    }
    Compile.prototype.nodeToFragment = function (el) {
        var fragment = document.createDocumentFragment();
        var child = el.firstChild;
        while (child) {
            fragment.appendChild(child);
            child = el.firstChild;
        }
        console.log(fragment);
        return fragment;
    };
    Compile.prototype.compileElement = function (el) {
        var _this = this;
        if (el.childNodes) {
            el.childNodes.forEach(function (node) {
                var reg = /\{\{(.*)\}\}/;
                var text = node.textContent;
                if (_this.isTextNode(node) && reg.test(text)) {
                    _this.compileText(node, reg.exec(text)[1]);
                }
                if (node.childNodes && node.childNodes.length) {
                    _this.compileElement(node); // 继续递归遍历子节点
                }
            });
        }
    };
    Compile.prototype.compileText = function (node, exp) {
        var _this = this;
        var initText = this.vue[exp];
        this.updateText(node, initText); // 将初始化的数据初始化到视图中
        this.vue.pubsub.subscribe(exp, function (val) {
            _this.updateText(node, val);
        });
    };
    Compile.prototype.updateText = function (node, value) {
        node.textContent = typeof value == 'undefined' ? '' : value;
    };
    Compile.prototype.isTextNode = function (node) {
        return node.nodeType == 3;
    };
    return Compile;
}());
