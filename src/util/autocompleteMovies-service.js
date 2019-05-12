import {API_BASE_URL} from '../config';

const autoCompleteService = {   
    fetchAutoCompleteMovieSuggestions(userInput) {
        return new Promise((resolve, reject) => {
            try {
                fetch(`${API_BASE_URL}/movietitlesuggestions/${userInput}`, {
                    method: "GET",
                })
                .then(res => {
                    return (!res.ok)
                        ? res.json().then(e => reject(e))
                        : resolve(res.json())
                })
                .catch(error => {
                    reject(error)
                })
            }
            catch(error) {
                reject(error)
            }
        })
    }
}

export default autoCompleteService;