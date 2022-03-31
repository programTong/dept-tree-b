<template>
  <ul class = "treeMoudel">
    <li v-for = "(item,index) in menus" :key = "index">
      <!-- 遍历menus，如果传过来的depth等于0，就添加topNode的class，如果不等于0，就添加noTopNode的class -->
      <div :class = "{'itemTree':true,'topNode':depth == 0,'noTopNode':depth != 0,'active':actId == item.id}">
        <!-- 判断如果含有name字段就显示name字段 -->
        <span :style = "transform" v-if = "item.name" :class = "{'topSpan':depth == 0,'noTopSpan':depth != 0}">
          <!-- 如果item有孩子且item.show为false,那么图标为折叠图标 -->
          <i class = "el-icon-caret-right" v-if = "item.userList && item.userList.length > 0 && !item.show" @click = "selectItem(item)"></i>
          <!-- 如果item有孩子且item.show为true,那么图标为展开图标 -->
          <i class = "el-icon-caret-bottom" v-if = "item.userList && item.userList.length > 0 && item.show" @click = "selectItem(item)"></i>
          <i class = "selectBox" @click = "checkItem(item)">
            <!-- 如果item的selectArr.length是大于0的，也就是里面有值的话就是勾选状态，否则就是不勾选状态 -->
            <i :class = "{'checkName iconfont':true, 'gouxuan5':item.selectArr.length > 0}" ></i>
          </i>
          {{item.name}}
        </span>
        <!-- 判断如果含有username字段就显示username字段 -->
        <span :style = "transform" v-if = "item.username" :class = "{'topSpan':depth == 0,'noTopSpan':depth != 0}">
          <!-- 如果item有孩子且item.show为false,那么图标为折叠图标 -->
          <i class = "el-icon-caret-right" v-if = "item.userList && item.userList.length > 0 && !item.show" @click = "selectItem(item)"></i>
          <!-- 如果item有孩子且item.show为true,那么图标为展开图标 -->
          <i class = "el-icon-caret-bottom" v-if = "item.userList && item.userList.length > 0 && item.show" @click = "selectItem(item)"></i>
          <i class = "selectBox" @click = "checkItem(item)">
            <!-- 如果item的selectArr.length是大于0的，也就是里面有值的话就是勾选状态，否则就是不勾选状态 -->
            <i :class = "{'checkUsername iconfont':true, 'gouxuan5':item.selectArr.length > 0}"></i>
          </i>
          {{item.username}}
        </span>
      </div>
      <el-collapse-transition>
        <!-- 递归组件就是自己调用自己，这里是在自己的组件内再次调用自己，但是务必要和pages中的tree页面中使用的一模一样才可以，否则树不会生效 -->
        <Tree v-if = "item.userList && item.userList.length > 0 && item.show" :menus = "item.userList" :depth = "depth+4" @selectItem = "selectItem" :actId = "actId" @checkItem = "checkItem"></Tree>
      </el-collapse-transition>
    </li>
  </ul>
</template>

<script>
export default{
  name:"Tree",
  props:["menus","depth","actId"],
  data(){
    return{
      msg:"这是二级菜单树",
    }
  },
  methods:{
    // 将selectItem方法暴露出去
    selectItem(item){
      this.$emit("selectItem",item);
    },
    // 将checkItem方法暴露出去
    checkItem(item){
      this.$emit("checkItem",item);
    }
  },
  computed:{
    //通过传过来的depth计算下级目录的偏移量，这里我用的transform
    transform(){
      return 'transform:translateX(' + this.depth*10 + 'px)';
    }
  }
}
</script>

<style scoped>

</style>