<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="部门名">
        <el-input v-model="form.deptName"></el-input>
      </el-form-item>
      <el-form-item label="员工编号">
        <el-input v-model="form.empNo"></el-input>
      </el-form-item>
      <el-form-item label="员工姓名">
        <el-input v-model="form.empName"></el-input>
      </el-form-item>
      <el-form-item label="手机号">
        <el-input v-model="form.empPhone"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="$router.back()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {add} from "@/api/empActions";

export default {
  name: "AddEmp",
  inject: ["reload"],
  props: ["deptName", "deptId"],
  data() {
    return {
      form: {
        deptName: "",
        empName: "",
        empPhone: "",
        deptId: "",
        empNo: ""
      }
    }
  },
  methods: {
    onSubmit: function () {
      let vm = this;
      add(this.form).then(res => {
        console.log(res);
        if (res===true){
          vm.$message({
            showClose: true,
            message: '添加成功',
            type: 'success'
          });
          vm.reload();
        } else {
          vm.$message({
            showClose: true,
            message: '添加失败',
            type: 'error'
          });
        }
      })
    }
  },
  watch: {
    deptId: function (newV, oldV){
      this.form.deptId = newV;
      console.log(oldV);
    },
    deptName: function (newV, oldV){
      this.form.deptName = newV;
      console.log(oldV);
    },
  },
  mounted() {
    this.form.deptId = this.deptId;
    this.form.deptName = this.deptName;
  }
}
</script>

<style scoped>

</style>