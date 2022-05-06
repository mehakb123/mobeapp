import React, { useState, useEffect } from "react";
import axios from "axios"

//let token = `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjYyNTdiYmY0MjRmMGY3M2M4YzA2MzUyYiIsInR5cGUiOiJBRE1JTiIsImlhdCI6MTY1MTQ3MDIxMn0.OKgBNdVEBZwwLB55yVsG9QIqIr-2w4p2L20Pp9abKno`;
let token = localStorage.getItem("user-info")
const baseUrl = 'https://mobe-backend.herokuapp.com/api';
// const baseUrl = 'http://192.168.1.108:8003/api';

export const llogin = (email, password) => {
    let item = { email, password, web: '0' }
    console.warn(item)
    return fetch(`${baseUrl}/BranchManager/login?accessToken=${token}`, {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json'
        },
        body: JSON.stringify(item)
    })
}

//admin login api
export const logAdmin = (email, password) => {

    let item1 = { email, password }
    console.warn(item1)
    return fetch(`${baseUrl}/admin/login`, {
        method: 'POST',
        body: JSON.stringify(item1),
        headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json'
        },
        body: JSON.stringify(item1)
    })
}



export const forgotPasswordApi = async ({ email }) => {
    return fetch(`http://192.168.1.108:8003/api/BranchManager/forgetPassword?email=${email}`, {
        method: 'GET',
        headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json'
        }
    })
};



//get categories
export const GetCategoryApi = async (skip) => {
    return fetch(`${baseUrl}/admin/getCategorie?accessToken=${token}&limit=5&skip=${skip}`, {
        method: 'GET',
        headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json'
        }
    }
    )
};



//get subCategory
export const GetSubCategoryApi = async (skip) => {
    let id = '625d67a9b740833de07629df'
    return fetch(`${baseUrl}/admin/getSubCategorie?accessToken=${token}&categories=${id}&limit=4&skip=${skip}`, {
        method: 'GET',
        headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json'
        }
    }
    )
};

//get subCategory 1
export const GetSubCategoryApi1 = async (id) => {
    return fetch(`${baseUrl}/admin/getSubCategorie?accessToken=${token}&categories=${id}`, {
        method: 'GET',
        headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json'
        }
    }
    )
};

//get Bars
export const GetBarsApi = async (skip) => {
    return fetch(`${baseUrl}/admin/getBars?accessToken=${token}&skip=${skip}`, {
        method: 'GET',
        headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json'
        }
    }
    )
};

//get branch
export const GetBranchApi = async (skip) => {
    return fetch(`${baseUrl}/admin/getBranch?accessToken=${token}&limit=5&skip=${skip}`, {
        method: 'GET',
        headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json'
        }
    }
    )
};

//get dataCount
export const GetDataCount = async () => {
    return fetch(`${baseUrl}/admin/dataCount?accessToken=${token}`, {
        method: 'GET',
        headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json'
        }
    }
    )
};

//get totalOrderCount
export const GetTotalOrderCount = async () => {
    return fetch(`${baseUrl}/admin/totalOrderCount?accessToken=${token}`, {
        method: 'GET',
        headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json'
        }
    }
    )
};


//create category
export const CategoriesApiData = async (name, priority) => {
    let formData = new FormData();
    formData.append("name", name);
    formData.append("priority", priority);
    formData.append("accessToken", token)
    formData.append("profilePic", "cdscscd")
    return axios.post(`${baseUrl}/admin/createCategories`, formData)
};

//create subCategories
export const SubCategoriesApiData = async (name, values) => {
    let formData = new FormData();
    formData.append("name", name);
    formData.append("accessToken", token)
    formData.append("categorie", values)
    return axios.post(`${baseUrl}/admin/createSubCategories`, formData)
};

//create branch
export const BranchApiData = async (managerName, city, email, phoneNo, latitude, longitude, branchName, bars, crashItem) => {
    let formData = new FormData();
    formData.append("accessToken", token)
    formData.append("managerName", managerName);
    formData.append("city", city);
    formData.append("email", email);
    formData.append("phoneNo", phoneNo);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("branchName", branchName);
    formData.append("bars", values);
    formData.append("crashMarket", crashItem);
    return axios.post(`${baseUrl}/admin/createBranch`, formData)
};

//create bars
export const BarsApiData = async (name, city, lat, long) => {
    let formData = new FormData();
    formData.append("name", name);
    formData.append("city", city);
    formData.append("lat", lat);
    formData.append("long", long);
    formData.append("accessToken", token)
    return axios.post(`${baseUrl}/admin/createBar`, formData)
};

//delete category
export const DeleteCategoryApiData = async (id) => {
    let formData = new FormData();
    formData.append("categorieId", id);
    formData.append("accessToken", token)
    return axios.post(`${baseUrl}/admin/deleteCategorie`, formData)
};

//delete subCategory
export const DeleteSubCategoryApiData = async (id) => {
    let formData = new FormData();
    formData.append("subCategorieId", id);
    formData.append("accessToken", token)
    return axios.post(`${baseUrl}/admin/deleteSubCategorie`, formData)
};

//delete bar
export const DeleteBarApiData = async (id) => {
    let formData = new FormData();
    formData.append("barId", id);
    formData.append("accessToken", token)
    return axios.post(`${baseUrl}/admin/deleteBar`, formData)
};

//delete branch
export const DeleteBranchApiData = async (id) => {
    let formData = new FormData();
    formData.append("branchId", id);
    formData.append("accessToken", token)
    return axios.post(`${baseUrl}/admin/deleteBranch`, formData)
};

//update bar
export const UpdateBarsApiData = async (name, city, lat, long, id, isBlocked) => {
    let formData = new FormData();
    formData.append("name", name);
    formData.append("city", city);
    formData.append("lat", lat);
    formData.append("long", long);
    formData.append("isBlocked", isBlocked);
    formData.append("barId", id);
    formData.append("accessToken", token)
    return axios.put(`${baseUrl}/admin/updateBar`, formData)
};

//update branch
export const UpdateBranchApiData = async (managerName, city, email, phoneNo, latitude, longitude, branchName, branchId, bars, crashItem, isBlocked) => {
    //let token = localStorage.getItem("user-info")
    let formData = new FormData();
    formData.append("accessToken", token)
    formData.append("managerName", managerName);
    formData.append("city", city);
    formData.append("phoneNo", phoneNo);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);
    formData.append("branchName", branchName);
    formData.append("branchId", branchId);
    formData.append("bars", values);
    formData.append("crashMarket", crashItem);
    formData.append("isBlocked", isBlocked);
    axios.put(`${baseUrl}/admin/updateBranch`, formData)
};




//update subcategories
export const updateSubCategoriesApiData = async (name, values, subCategorieId, isBlocked) => {
    let formData = new FormData();
    formData.append("name", name);
    formData.append("accessToken", token)
    formData.append("categorie", values)
    formData.append("subCategorieId", subCategorieId)
    formData.append("isBlocked", isBlocked);
    return axios.put(`${baseUrl}/admin/updateSubCategories`, formData)
};

//update categories
export const UpdateCategoriesApiData = async (name, priority, id, isBlocked) => {
    let formData = new FormData();
    formData.append("name", name);
    formData.append("priority", priority);
    formData.append("catId", id);
    formData.append("accessToken", token)
    formData.append("isBlocked", isBlocked);
    formData.append("profilePic", "cdscscd")
    return axios.post(`${baseUrl}/admin/updateCategories`, formData)
};