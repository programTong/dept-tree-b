package com.lx.emp.tree;

import com.lx.emp.dao.EmployeeMapper;
import com.lx.emp.pojo.Department;
import com.lx.emp.pojo.Employee;
import com.lx.emp.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@RestController
@CrossOrigin
public class TreeTestController {

    private static final Random RANDOM = new Random();

    @Autowired
    private DepartmentService departmentService;

    @Autowired
    private EmployeeMapper employeeMapper;

    @GetMapping("/department")
    public Response<List<DepartmentA>> tree(
                           ){
        Response<List<DepartmentA>> response = new Response<>();
        response.setCode(200);
        List<DepartmentA> departmentAList = new ArrayList<>();
        List<Department> dl = departmentService.findAll(null);
        for (Department department : dl) {
            DepartmentA departmentA = new DepartmentA();
            departmentA.setId(department.getDeptId());
            departmentA.setName(department.getDeptName());
            List<EmployeeA> ual = new ArrayList<>();
            List<Employee> el = employeeMapper.findAll("", "", department.getDeptId());
            for (Employee employee : el) {
                EmployeeA employeeA = new EmployeeA();
                employeeA.setId(employee.getEmpId());
                employeeA.setUsername(employee.getEmpName());
                ual.add(employeeA);
            }
            departmentA.setUserList(ual);
            departmentAList.add(departmentA);
        }
        response.setData(departmentAList);
        return response;
    }




}
