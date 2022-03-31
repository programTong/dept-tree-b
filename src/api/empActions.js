import request from "@/utils/request"


export function add(employee) {
    return request({
        url: "/employee/save",
        method: "post",
        data: employee
    })
}

export function remove(id) {
    return request({
        url: "/employee/remove/" + id,
        method: "delete",
    })
}

export function removeEmpBatch(ids) {
    return request({
        url: "/employee/remove_batch/",
        method: "delete",
        data: JSON.stringify(ids)
    })
}

export function update(employee) {
    return request({
        url: "/employee/update",
        method: "put",
        data: employee
    })
}

export function getAll(query) {
    return request({
        url: "/employee/list",
        method: "get",
        params: query
    })
}


export function getById(id) {
    return request({
        url: "/employee/get/"+ id,
        method: "get"
    })
}
