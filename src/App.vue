<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="2">      <router-link to="/home">Go to home</router-link></el-col>
      <el-col :span="2">      <router-link to="/login">login</router-link></el-col>
    </el-row>
    <br/>
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {

  },
  provide(){
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      isRouterAlive: true
    }
  },
  mounted() {

  },
  methods: {
    reload: function (){
      this.isRouterAlive = false;
      this.$nextTick(function (){
        this.isRouterAlive = true;
      })
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
