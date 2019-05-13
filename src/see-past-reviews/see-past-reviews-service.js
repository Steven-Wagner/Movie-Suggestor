import {API_BASE_URL} from '../config';
import TokenService from'../services/token-services';

const PastReviewsService = {
    fetchPastReviews(user_id) {
        return new Promise((resolve, reject) => {
            try {
                fetch(`${API_BASE_URL}/pastreviews/${user_id}`, {
                    method: "GET",
                    headers: {
                        "Content-type": "application/json",
                        "authorization": `bearer ${TokenService.getAuthToken()}`
                    },
                })
                .then(res => {
                    return (!res.ok)
                    ? res.json().then(e => reject(e))
                    : resolve(res.json());
                })
                .catch(error => {
                    reject(error);
                })
            }
            catch(error) {
                reject(error);
            }
        });
    },

    fetchDeleteReview(user_id, review_id) {
        return new Promise((resolve, reject) => {
            try {
                fetch(`${API_BASE_URL}/pastreviews/${user_id}/${review_id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-type": "application/json",
                        "authorization": `bearer ${TokenService.getAuthToken()}`
                    }
                })
                .then(res => {
                    return (!res.ok)
                    ? res.json().then(e => reject(e))
                    : resolve(res.json());
                })
                .catch(error => {
                    reject(error);
                })
            }
            catch(error) {
                reject(error);
            }
        });
    }
}

export default PastReviewsService;