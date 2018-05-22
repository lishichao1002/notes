class PubSub {

    private topics: { [key: string]: Function[] } = {};

    subscribe(topic: string, callback: Function): () => void {
        if (!this.topics[topic]) {
            this.topics[topic] = [];
        }
        this.topics[topic].push(callback);
        return () => {
            this.topics[topic] = this.topics[topic].filter((_callback) => _callback !== callback);
        }
    }

    publish(topic: string, args: any) {
        if (this.topics[topic]) {
            this.topics[topic].forEach((callback) => callback(args));
        }
    }

}

interface VueOptions {
    el: any;
    data?: { [key: string]: any }
}

class Vue {

    public pubsub: PubSub;

    constructor(public options: VueOptions) {
        this.pubsub = new PubSub();

        if (this.options.data) {
            Object.keys(this.options.data).forEach((key: string) => {
                let val;
                Object.defineProperty(this, key, {
                    enumerable: true,
                    configurable: true,
                    get: () => {
                        return val;
                    },
                    set: (_val) => {
                        this.val = _val;
                        this.pubsub.publish(key, _val);
                    }
                })
            });
        }

        new Compile(this);

        Object.assign(this, this.options.data || {});
    }

}

class Compile {


    constructor(private vue: Vue) {
        let fragment = this.nodeToFragment(this.vue.options.el);
        this.compileElement(fragment);
        this.vue.options.el.appendChild(fragment);
    }

    private nodeToFragment(el: HTMLElement): DocumentFragment {
        let fragment = document.createDocumentFragment();
        let child = el.firstChild;
        while (child) {
            fragment.appendChild(child);
            child = el.firstChild;
        }
        console.log(fragment);
        return fragment;
    }

    private compileElement(el: DocumentFragment) {
        if (el.childNodes) {
            el.childNodes.forEach((node: Node) => {
                let reg = /\{\{(.*)\}\}/;
                let text = node.textContent;
                if (this.isTextNode(node) && reg.test(text)) {  // 判断是否是符合这种形式{{}}的指令
                    this.compileText(node, reg.exec(text)[1]);
                }

                if (node.childNodes && node.childNodes.length) {
                    this.compileElement(node);  // 继续递归遍历子节点
                }
            });
        }
    }

    private compileText(node, exp) {
        let initText = this.vue[exp];
        this.updateText(node, initText);  // 将初始化的数据初始化到视图中
        this.vue.pubsub.subscribe(exp, (val) => { // 生成订阅器并绑定更新函数
            this.updateText(node, val);
        });
    }

    private updateText(node, value) {
        node.textContent = typeof value == 'undefined' ? '' : value;
    }

    private isTextNode(node) {
        return node.nodeType == 3;
    }

}