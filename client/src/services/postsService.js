import { API_URL } from "../constants";

async function fetchAllPosts() {
    const response = await fetch(API_URL);
    if(!response.ok){
        throw response;
    } 
    return response.json();
}

async function fetchPost(id){
    const response = await fetch(`${API_URL}/${id}`);
    if(!response.ok){
        throw response;
    }
    return response.json();
}

async function createPost(postData){
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        body: JSON.stringify(postData),
    });
    if(!response.ok){
        throw response;
    }
    return response.json();
}

async function deletePost(id){
    console.log("id", id);
    console.log(`${API_URL}/${id}`);
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
    });
    if(!response.ok){
        throw new Error(response.statusText);
    }

    if (response.status === 204) {
        return null;
    } 
    
    return response.json();
}

async function updatePost (id, postData) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(postData),
    });
    if(!response.ok){
        throw response;
    }
    return response.json();
}

export { fetchAllPosts, deletePost, fetchPost, createPost, updatePost };