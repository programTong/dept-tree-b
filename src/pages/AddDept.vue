<template>
  <div>
    <el-form ref="form" :model="formData" label-width="80px">
      <el-form-item label="部门编号">
        <el-input v-model="formData.deptId"></el-input>
      </el-form-item>
      <el-form-item label="部门名">
        <el-input v-model="formData.deptName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button @click="$router.back()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {add} from '@/api/deptActions.js'

export default {
  name: "AddDept",
  inject: ["reload"],
  data() {
    return {
      formData: {
        deptName: "",
        deptId: ""
      }
    }
  },
  methods: {
    onSubmit: function () {
      let vm = this;
      add(this.formData).then(res => {
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
  }
}
</script>

<style scoped>

</style>