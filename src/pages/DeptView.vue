<template>
  <div v-if="deptId && deptId!==''">
    <input v-if="!edited" type="button" value="编辑" @click="edited=!edited;"/>
    <el-table v-if="!edited"
              :data="showData"
              style="width: 100%">
      <el-table-column
          prop="deptName"
          label="部门名"
          width="180">
      </el-table-column>
      <el-table-column
          prop="deptCreateTime"
          label="创建时间">
      </el-table-column>
    </el-table>
    <!--    编辑-->
    <el-form v-if="edited" ref="form" :model="editData" label-width="80px">
      <el-form-item label="部门名">
        <el-input v-model="editData.deptName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateDept">更新</el-button>
        <el-button @click="edited=!edited">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {getOneDept,update} from "@/api/deptActions.js";
import {deepClone} from "@/utils/ObjectUtil";

export default {
  name: "DeptView",
  props: ["deptId","dept"],
  inject: ['reload'],
  data() {
    return {
      showData: [],
      editData: null,
      edited: false
    }
  },
  methods: {
    updateDept: function (){
      let vm = this;
      update(this.editData).then(res => {
        if (res===true){
          vm.showData = [];
          vm.showData.push(deepClone(vm.editData));
          vm.dept.deptName = vm.editData.deptName;
          vm.edited = !vm.edited;
          vm.$message({
            showClose: true,
            message: '更新成功',
            type: 'success'
          });
          vm.reload();
          // vm.$router.replace('/blank_loading');
        } else {
          vm.$message({
            showClose: true,
            message: '更新失败',
            type: 'error'
          });
        }
        console.log(res);
      })
    },
    requestDept: function (id){
      console.log("请求部门信息:"+id);
      let vm = this;
      getOneDept(id).then(res => {
        console.log(res);
        vm.showData = [];
        vm.showData.push(res);
        vm.editData = deepClone(res);
        console.log(vm.editData);
      })
    }
  },
  watch: {
    deptId: function (newId, oldId){
      console.log("老部门id："+oldId);
      this.requestDept(newId);
    }
  },
  mounted() {
    this.requestDept(this.deptId);
  }
}
</script>

<style scoped>

</style>