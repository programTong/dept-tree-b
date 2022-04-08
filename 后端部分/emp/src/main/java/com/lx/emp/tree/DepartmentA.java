package com.lx.emp.tree;

import lombok.Data;

import java.util.List;

@Data
public class DepartmentA {
    private String id;
    private String name;
    private List<EmployeeA> userList;

}
