import fetch from "isomorphic-fetch";

export async function getUsers() {
    let page = 0;
    let size = 25;
    console.log("Get Users")
    return fetch(`/api/user?page=${page}&size=${size}`, {
        credentials: 'same-origin'
    })
        .then(response => {
            if (response.ok) {
                return Promise.resolve(response.json())
            } else {
                return Promise.reject(Error('HTTP error when trying to list users'))
            }
        })
        .then(data => {
            return data
        })
        .catch(() => Promise.reject(Error('Error trying to list users')))
}
