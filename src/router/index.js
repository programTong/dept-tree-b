import Router from 'vue-router'
import Vue from 'vue'
Vue.use(Router)

import Login from "../pages/DeptLogin.vue";
import DeptTree from "../pages/DeptTree.vue";
import EmpView from "@/pages/EmpView";
import DeptView from "@/pages/DeptView";
import addDept from "@/pages/AddDept";
import addEmp from "@/pages/AddEmp";
const routes = [
    {
        path: '/login',
        component: Login
    },
    {
        path : '/home',
        component: DeptTree,
        children: [
            {
                path: 'emp_view',
                component: EmpView
            },
            {
                path: 'dept_view',
                component: DeptView
            },
            {
                path: 'add_dept',
                component: addDept
            },
            {
                path: 'add_emp',
                component: addEmp
            }
        ]
    },

]



const router = new Router({
    routes,
    mode: 'history'
})

export default router
