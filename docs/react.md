### react diff
* tree diff
  * 只比较同级节点。当不再存在时，把其及子节点全部删除
* component diff
  * 同类组件，过渡到 DOM tree diff
  * 不同组件，所有子节点全部替换
* element diff
  * 通用方法：插入、移动、删除
  * 

### React.cloneElement (ref, key ...)
<!-- TODO -->