package com.lx.emp.tree;

import lombok.Data;

@Data
public class Response<T>{
    private Integer code;
    private T data;
}
