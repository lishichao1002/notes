# tabs
```js
addTab(component?: Component);
removeTab();
selectTab(index: number);

addComponent(component: Component);
removeComponent(component: Component);
replaceComponent(component: Component);
```

```js

<router-tabs>
  <router-tab [component]="" [tabid]="" [current]=""></router-tab>
  <router-tab></router-tab>
</router-tabs>

class Test(){
  constructor(private router: Router){
      
      router.selectTab(tabId);
      
      router.pushRouterTab(routerTab)
      
      router.addTab(tabId);
      
      router.deleteTab(tabId);
  
  }
}


```


# url

http://bbs.gamebean.net/index/!/tabid/router
