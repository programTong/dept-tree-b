import request from "@/utils/request"


export function add(department) {
    return request({
        url: "/department/save",
        method: "post",
        data: department
    })
}

export function remove(id) {
    return request({
        url: "/department/remove/" + id,
        method: "delete",
    })
}

export function removeBatch(ids) {
    return request({
        url: "/department/remove_batch",
        method: "delete",
        headers: {
            'Content-Type': 'application/json'
        },
        data: JSON.stringify(ids)
    })
}

export function update(department) {
    return request({
        url: "/department/update",
        method: "put",
        data: department
    })
}

export function getAll(departmentName) {
    return request({
        url: "/department/list",
        method: "get",
        params: {
            departmentName: departmentName
        }
    })
}

export function getOneDept(id) {
    return request({
        url: "/department/get/"+id,
        method: "get"
    })
}
