<template>
  <ul class = "treeMoudel">
    <li v-for = "(item,index) in menus" :key = "index">
      <!-- 遍历menus，如果传过来的depth等于0，就添加topNode的class，如果不等于0，就添加noTopNode的class -->
      <div :class = "{'itemTree':true,'topNode':depth == 0,'noTopNode':depth != 0,'active':actId == item.id}">
        <!-- 判断如果含有name字段就显示name字段 -->
        <span :style = "transform" v-if = "item.name" :class = "{'topSpan':depth == 0,'noTopSpan':depth != 0}"
             >
          <!-- 如果item有孩子且item.show为false,那么图标为折叠图标 -->
          <i class = "el-icon-caret-right" v-if = "item.userList && item.userList.length > 0 && !item.show"  @click="selectItem(item)"></i>
          <!-- 如果item有孩子且item.show为true,那么图标为展开图标 -->
          <i class = "el-icon-caret-bottom" v-if = "item.userList && item.userList.length > 0 && item.show"  @click="selectItem(item)"></i>
          <el-checkbox v-model="item.checked" @change="checkItem(item)"/>
          <i @click="selectItem(item)">{{item.name}} </i>
          <i class="el-icon-circle-plus" @click="addEmpPage(item)"></i>
        </span>
        <!-- 判断如果含有username字段就显示username字段 -->
        <span :style = "transform" v-if = "item.username" :class = "{'topSpan':depth == 0,'noTopSpan':depth != 0}"
          @click="selectItem(item)">
          <el-checkbox v-model="item.checked" @change="checkItem(item)"/>
          {{item.username}}
        </span>
      </div>
      <el-collapse-transition>
        <!-- 递归组件就是自己调用自己，这里是在自己的组件内再次调用自己，但是务必要和pages中的tree页面中使用的一模一样才可以，否则树不会生效 -->
        <DeptTreeBase v-if = "item.userList && item.userList.length > 0 && item.show" :menus = "item.userList" :depth = "depth+4" @selectItem = "selectItem" :actId = "actId" @checkItem = "checkItem"></DeptTreeBase>
      </el-collapse-transition>
    </li>
  </ul>
</template>

<script>
export default {
  name: "DeptTreeBase",
  props:["menus","depth","actId","dept"],
  methods: {
    selectItem: function (item){
      this.$emit("selectItem",item);
    },
    // 将checkItem方法暴露出去
    checkItem(item){
      this.$emit("checkItem",item);
    },
    addEmpPage: function (item){
      this.selectItem(item)
      if (this.$route.path!=='/home/add_emp'){
        this.$router.replace('/home/add_emp')
      }
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

<style lang="scss" scoped >
i {
  font:15px arial,sans-serif;
}
.treeMoudel{
  li{
    list-style: none;
    .itemTree{
      width: 100%;
      padding-left:30px;
      position: relative;
      &:hover{
        background:#2B9EEE;
        color:#fff;
      }
      .selectBox{
        display: inline-block;
        width: 16px;
        height:16px;
        border:1px solid #ccc;
        border-radius: 3px;
        position: relative;
        background: #fff;
        top:2px;
        .checkName{
          position: absolute;
          top:-16px;
          left:0px;
          color:#333;
        }
        .checkUsername{
          position: absolute;
          top:-12px;
          left:0px;
          color:#333;
        }
      }
      span{
        display: inline-block;
        position: absolute;
        font-size:14px;
      }
      .topSpan{
        font-size:16px;
      }
      .noTopSpan{
        font-size:14px;
      }
    }
    .topNode{
      height:55px;
      line-height: 55px;
      font-size:16px;
      cursor: pointer;
    }
    .active{
      background:#2B9EEE;
      color:#fff;
    }
    .noTopNode{
      height:45px;
      line-height:45px;
      &:hover{
        background:#2B9EEE;
        cursor: pointer;
        color:#fff;
      }
    }
  }
}
</style>