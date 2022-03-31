<template>
  <div class="deptTreeTop">

    <el-row class="actions" :gutter="80">
      <el-col :span="1">
            <span>
              <i class="el-icon-d-arrow-right" v-show="actionShowed" @click="actionShowed = !actionShowed"></i>
              <i class="el-icon-d-arrow-left" v-show="!actionShowed" @click="actionShowed = !actionShowed"></i>
            </span>
      </el-col>
      <transition name="el-zoom-in-top">
        <el-button v-show="actionShowed" class="transition-box" type="primary" round
                   @click="$router.replace('/home/add_dept')">增加部门
        </el-button>
      </transition>
      <transition name="el-zoom-in-bottom">
        <el-button v-show="actionShowed" class="transition-box" type="primary" round @click="removeDeptBatch">
          批量删除部门
        </el-button>
      </transition>
      <transition name="el-zoom-in-top">
        <el-button v-show="actionShowed" class="transition-box" type="primary" round @click="removeEmpBatch">
          批量删除员工
        </el-button>
      </transition>
    </el-row>
    <br/>
    <el-container>
      <el-aside width="300px">
        <DeptTreeBase :menus="menus" :depth="depth" @selectItem="selectItem" :actId="actId" @checkItem="checkItem"
                      :dept="dept"/>
      </el-aside>
      <el-main class="viewBody">
        <router-view :empId="actId" :dept="dept" :deptName="dept.deptName" :deptId="dept.deptId"></router-view>
      </el-main>
    </el-container>

  </div>
</template>

<script>
import DeptTreeBase from "../components/DeptTreeBase.vue";
import axios from "axios";
import {removeBatch} from "@/api/deptActions.js"
import {removeEmpBatch} from "@/api/empActions.js"

export default {
  name: "DeptTree",
  components: {DeptTreeBase},
  inject: ["reload"],
  data() {
    return {
      depth: 0,
      menus: [],
      actId: 156,
      actionShowed: true,
      dept: {
        deptId: 0,
        deptName: ""
      }
    }
  },
  methods: {
    removeEmpBatch: function () {
      let ids = [];
      this.addSelectedEmp(this.menus, ids);
      console.log(ids);
      let vm = this;
      removeEmpBatch(ids).then(res => {
        if (res === true) {
          vm.reload();
          vm.$message({
            showClose: true,
            message: '删除成功',
            type: 'success'
          })
        } else {
          vm.$message({
            showClose: true,
            message: '删除失败',
            type: 'error'
          })
        }
        console.log(res);
      })
    },
    addSelectedEmp: function (node, ids) {
      for (let i = 0; i < node.length; i++) {
        this.addSelectedEmp(node[i], ids);
      }
      if (!node.userList && node.checked) {
        ids.push(node.id);
      }
      if (node.userList && node.userList.length > 0) {
        this.addSelectedEmp(node.userList, ids);
      }
    },
    removeDeptBatch: function () {
      let ids = [];
      this.addSelectedDept(this.menus, ids);
      console.log(ids);
      let vm = this;
      removeBatch(ids).then(res => {
        if (res === true) {
          vm.reload();
          vm.$message({
            showClose: true,
            message: '删除成功',
            type: 'success'
          })
        } else {
          vm.$message({
            showClose: true,
            message: '删除失败',
            type: 'error'
          })
        }
        console.log(res);
      })
    },
    addSelectedDept(node, ids) {
      for (let i = 0; i < node.length; i++) {
        this.addSelectedDept(node[i], ids);
      }
      if (node.userList && node.checked) {
        ids.push(node.id);
      }
      if (node.userList && node.userList.length > 0) {
        this.addSelectedDept(node.userList, ids);
      }
    },
    //递归函数在每一项中添加selectArr和show
    addShow(arr) {
      for (var i = 0; i < arr.length; i++) {
        this.$set(arr[i], "show", true);
        this.$set(arr[i], "selectArr", []);
        this.$set(arr[i], "checked", false);
        if (arr[i].userList && arr[i].userList.length > 0) {
          this.addShow(arr[i].userList)
        }
      }
    },
    getDeptInfo: function () {
      let vm = this;
      axios.get("http://localhost:9000/emp/department").then(response => {
        if (response.data.code == 200) {
          console.log("获取部门信息成功");
          vm.menus = response.data.data;
          this.addShow(vm.menus)
        } else {
          console.log("获取部门信息失败");
        }
      })
    },
    //点击箭头使树展开收缩
    selectItem(data) {
      console.log("selectItem:" + data.id);
      if (data.userList && data.userList.length > 0) {
        //如果此项下有userList且length大于0，则切换展开与折叠状态
        data.show = !data.show;
        this.dept.deptId = data.id;
        this.dept.deptName = data.name;
        console.log(this.$route);
        if (this.$route.path !== '/home/dept_view') {
          this.$router.push('/home/dept_view')
        }
      } else {
        //如果此项下没有userList或length等于0，则将选中的id赋值给actId
        this.actId = data.id;
        if (this.$route.path !== '/home/emp_view') {
          this.$router.push('/home/emp_view')
        }
      }
    },
    //进行多选勾选
    checkItem(data) {
      console.log("checkItem:" + data.checked);
      if (data.selectArr.length > 0) {
        //如果这一项的selectArr有值，说明是被勾选状态，要把selectArr清空，清空勾选
        data.selectArr = [];
        data.checked = false;
        //如果此选项清空勾选后，如果下面有userList的话，那么也同时要清空
        if (data.userList && data.userList.length > 0) {
          this.clearChild(data.userList);
        }
        //如果此选项清空勾选后，要把所有的父元素，也全部清空勾选，因为它不勾选了，所有父元素的状态不可能还处于勾选状态，不管它勾选不勾选，我们都要清除一遍，以防万一
        this.clearFather(this.menus, data);
      } else {//如果这一项的selectArr为[]，说明是未被勾选状态，在selectArr里加id值，添加勾选
        data.selectArr.push(data.id);
        data.checked = true;
        //如果此选项清空勾选后，如果下面有userList的话，那么也同时勾选下面所有的孩子
        if (data.userList && data.userList.length > 0) {
          this.addChild(data.userList);
        }
        //如果此选项勾选后，要判断所有的上级元素是不是应该全部打勾
        this.selectFather(this.menus, data);
      }
    },
    //定义函数清空所有孩子的勾选
    clearChild(arr) {
      for (var i = 0; i < arr.length; i++) {
        arr[i].selectArr = [];
        arr[i].checked = false;
        if (arr[i].userList && arr[i].userList.length > 0) {
          this.clearChild(arr[i].userList);
        }
      }
    },
    //定义函数添加所有孩子的勾选
    addChild(arr) {
      for (var i = 0; i < arr.length; i++) {
        arr[i].selectArr.push(arr[i].id);
        arr[i].checked = true;
        if (arr[i].userList && arr[i].userList.length > 0) {
          this.addChild(arr[i].userList);
        }
      }
    },
    //定义函数一层一层的往上寻找父元素的userList
    clearFather(father, data) {
      for (var i = 0; i < father.length; i++) {
        if (father[i].id == data.id) {
          //找到data所在的userList为father，然后再通过这个userList找到拥有这个userList的父元素
          this.clearRealFather(this.menus, father);
        } else if (father[i].userList && father[i].userList.length > 0) {
          this.clearFather(father[i].userList, data);
        }
      }
    },
    //定义函数根据找到的上层父元素的userList来寻找父元素，并将他们清除勾选
    clearRealFather(menus, arr) {
      for (var i = 0; i < menus.length; i++) {
        if (menus[i].userList == arr) {
          //找到这个拥有userList的父元素后，将此selectArr清空
          menus[i].selectArr = [];
          menus[i].checked = false;
          //找到这个拥有userList的父元素后，再调用clearFather，再进行向上寻找父元素，知道没有父元素为止
          this.clearFather(this.menus, menus[i]);
        } else if (menus[i].userList && menus[i].userList.length > 0) {
          this.clearRealFather(menus[i].userList, arr);
        }
      }
    },
    //定义函数一层一层的往上寻找父元素的userList
    selectFather(father, data) {
      for (var i = 0; i < father.length; i++) {
        if (father[i].id == data.id) {
          var arr = [];
          for (var j = 0; j < father.length; j++) {
            if (father[j].selectArr.length > 0) {
              arr.push(father[i]);
            }
          }
          //判断此数组中是不是所有的selectArr都有值，如果有值，就执行selectRealFather，将上层父元素也勾选
          if (arr.length == father.length) {
            this.selectRealFather(this.menus, father);
          }
        } else if (father[i].userList && father[i].userList.length > 0) {
          this.selectFather(father[i].userList, data);
        }
      }
    },
    //定义函数根据找到的上层父元素的userList来寻找父元素，并将他们清除勾选
    selectRealFather(menus, arr) {
      for (var i = 0; i < menus.length; i++) {
        if (menus[i].userList == arr) {
          //找到这个拥有userList的父元素后，给selectArr赋值，使其勾选
          menus[i].selectArr.push(menus[i].id);
          menus[i].checked = true;
          //找到这个拥有userList的父元素后，再调用clearFather，再进行向上寻找父元素，知道没有父元素为止
          this.selectFather(this.menus, menus[i]);
        } else if (menus[i].userList && menus[i].userList.length > 0) {
          this.selectRealFather(menus[i].userList, arr);
        }
      }
    }
  },
  mounted() {
    this.getDeptInfo();
  }
}
</script>

<style scoped>
.actions {
  position: fixed;
  z-index: 99999;
}
.viewBody{
  position: fixed;
  z-index: 99998;
  margin-left: 400px;
  margin-top: 50px;
}
.deptTreeTop{
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
}


</style>