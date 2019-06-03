### react diff
* tree diff
  * 只比较同级节点。当不再存在时，把其及子节点全部删除
* component diff
  * 同类组件，过渡到 DOM tree diff
  * 不同组件，所有子节点全部替换
* element diff
  * 通用方法：插入、移动、删除
  * 若每次进行节点的单一比对，发现不同后对该位置的节点进行删除和插入替换，操作繁琐冗余，故采用节点位移的方法进行优化，同层节点用唯一key值进行区分。

### React.cloneElement (ref, key ...)
* 当原始组件与克隆组件都被渲染时，ref会指向被克隆的组件