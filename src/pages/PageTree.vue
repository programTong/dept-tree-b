<template>
  <div class = "loginModuel">
    <Tree :menus = "menus" :depth = "depth" @selectItem = "selectItem" :actId = "actId" @checkItem = "checkItem"></Tree>
  </div>
</template>

<script>
import Tree from '../components/Tree.vue'
import axios from 'axios';
export default{
  name: "PageTree",
  data(){
    return{
      msg:"这是登录页面",
      depth:0,
      menus:[],
      actId:"",
    }
  },
  components:{
    Tree
  },
  methods:{
    //用ajax获取数据
    getData(){
      return axios.get('http://localhost:9000/emp/tree');
    },
    // 调用ajax函数
    async getTree(){
      var last = await this.getData();
      if(last.data.code == 1){
        this.menus = last.data.data;
        //在每一项中添加selectArr和show
        this.addShow(this.menus);
      }
    },
    //递归函数在每一项中添加selectArr和show
    addShow(arr){
      for(var i = 0; i < arr.length;i++){
        this.$set(arr[i],"show",true);
        this.$set(arr[i],"selectArr",[]);
        if(arr[i].userList && arr[i].userList.length > 0){
          this.addShow(arr[i].userList)
        }
      }
    },
    //点击箭头使树展开收缩
    selectItem(data){
      if(data.userList && data.userList.length > 0){
        //如果此项下有userList且length大于0，则切换展开与折叠状态
        data.show = !data.show;
      }else{
        //如果此项下没有userList或length等于0，则将选中的id赋值给actId
        this.actId = data.id;
      }
    },
    //进行多选勾选
    checkItem(data){
      if(data.selectArr.length > 0){
        //如果这一项的selectArr有值，说明是被勾选状态，要把selectArr清空，清空勾选
        data.selectArr = [];
        //如果此选项清空勾选后，如果下面有userList的话，那么也同时要清空
        if(data.userList && data.userList.length > 0){
          this.clearChild(data.userList);
        }
        //如果此选项清空勾选后，要把所有的父元素，也全部清空勾选，因为它不勾选了，所有父元素的状态不可能还处于勾选状态，不管它勾选不勾选，我们都要清除一遍，以防万一
        this.clearFather(this.menus,data);
      }else{//如果这一项的selectArr为[]，说明是未被勾选状态，在selectArr里加id值，添加勾选
        data.selectArr.push(data.id);
        //如果此选项清空勾选后，如果下面有userList的话，那么也同时勾选下面所有的孩子
        if(data.userList && data.userList.length > 0){
          this.addChild(data.userList);
        }
        //如果此选项勾选后，要判断所有的上级元素是不是应该全部打勾
        this.selectFather(this.menus,data);
      }
    },
    //定义函数清空所有孩子的勾选
    clearChild(arr){
      for(var i = 0; i < arr.length;i++){
        arr[i].selectArr = [];
        if(arr[i].userList && arr[i].userList.length > 0){
          this.clearChild(arr[i].userList);
        }
      }
    },
    //定义函数添加所有孩子的勾选
    addChild(arr){
      for(var i = 0; i < arr.length;i++){
        arr[i].selectArr.push(arr[i].id);
        if(arr[i].userList && arr[i].userList.length > 0){
          this.addChild(arr[i].userList);
        }
      }
    },
    //定义函数一层一层的往上寻找父元素的userList
    clearFather(father,data){
      for(var i = 0; i < father.length;i++){
        if(father[i].id == data.id){
          //找到data所在的userList为father，然后再通过这个userList找到拥有这个userList的父元素
          this.clearRealFather(this.menus,father);
        }else if(father[i].userList && father[i].userList.length > 0){
          this.clearFather(father[i].userList,data);
        }
      }
    },
    //定义函数根据找到的上层父元素的userList来寻找父元素，并将他们清除勾选
    clearRealFather(menus,arr){
      for(var i = 0; i < menus.length;i++){
        if(menus[i].userList == arr){
          //找到这个拥有userList的父元素后，将此selectArr清空
          menus[i].selectArr = [];
          //找到这个拥有userList的父元素后，再调用clearFather，再进行向上寻找父元素，知道没有父元素为止
          this.clearFather(this.menus,menus[i]);
        }else if(menus[i].userList && menus[i].userList.length > 0){
          this.clearRealFather(menus[i].userList,arr);
        }
      }
    },
    //定义函数一层一层的往上寻找父元素的userList
    selectFather(father,data){
      for(var i = 0; i < father.length;i++){
        if(father[i].id == data.id){
          var arr = [];
          for(var j = 0; j < father.length;j++){
            if(father[j].selectArr.length > 0){
              arr.push(father[i]);
            }
          }
          //判断此数组中是不是所有的selectArr都有值，如果有值，就执行selectRealFather，将上层父元素也勾选
          if(arr.length == father.length){
            this.selectRealFather(this.menus,father);
          }
        }else if(father[i].userList && father[i].userList.length > 0){
          this.selectFather(father[i].userList,data);
        }
      }
    },
    //定义函数根据找到的上层父元素的userList来寻找父元素，并将他们清除勾选
    selectRealFather(menus,arr){
      for(var i = 0; i < menus.length;i++){
        if(menus[i].userList == arr){
          //找到这个拥有userList的父元素后，给selectArr赋值，使其勾选
          menus[i].selectArr.push(menus[i].id);
          //找到这个拥有userList的父元素后，再调用clearFather，再进行向上寻找父元素，知道没有父元素为止
          this.clearFather(this.menus,menus[i]);
        }else if(menus[i].userList && menus[i].userList.length > 0){
          this.selectRealFather(menus[i].userList,arr);
        }
      }
    }
  },
  mounted(){
    this.getTree();
  }
}
</script>

<style scoped>

</style>
