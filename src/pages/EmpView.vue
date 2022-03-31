<template>
  <div v-if="empId && empId!==''">
    <input v-if="!edited" type="button" value="编辑" @click="edited=!edited;"/>
    <el-table v-if="!edited"
        :data="showData"
        style="width: 100%">
      <el-table-column
          prop="empNo"
          label="empNo"
          width="180">
      </el-table-column>
      <el-table-column
          prop="empName"
          label="姓名"
          width="180">
      </el-table-column>
      <el-table-column
          prop="empPhone"
          label="电话">
      </el-table-column>
    </el-table>
<!--    编辑-->
    <el-form v-if="edited" ref="form" :model="editData" label-width="80px">
      <el-form-item label="电话">
        <el-input v-model="editData.empPhone"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateEmp">更新</el-button>
        <el-button @click="edited=!edited">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {getById,update} from "@/api/empActions";
import {deepClone} from "@/utils/ObjectUtil";

export default {
  name: "EmpView",
  props: ["empId"],
  data() {
    return {
      showData: [],
      editData: null,
      edited: false
    }
  },
  methods: {
    updateEmp: function (){
      let vm= this;
      console.log(this.editData);
      update(this.editData).then(res => {
        if (res===true){
          vm.showData = [];
          vm.showData.push(deepClone(vm.editData));
          vm.edited = !vm.edited;
          vm.$message({
            showClose: true,
            message: '更新成功',
            type: 'success'
          });
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
    requestEmp: function (id){
      let vm = this;
      getById(id).then(res => {
        console.log(res);
        vm.showData = [];
        vm.showData.push(res);
        vm.editData = deepClone(res);
        // vm.editData.deptName = null;
        console.log(vm.editData);
      })
    }
  },
  watch: {
    empId: function (newId, oldId){
      console.log(oldId);
      this.requestEmp(newId);
    }
  },
  mounted() {
    this.requestEmp(this.empId);
  }
}
</script>

<style scoped>

</style>