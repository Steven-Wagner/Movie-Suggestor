import {API_BASE_URL} from '../config'

export function getListOfMovies(user_id) {
    fetch(`${API_BASE_URL}/moviesuggestions/${user_id}`, {
    })
    .then(res => {
        return (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    })
    .catch(error => {
        return error
    })
}