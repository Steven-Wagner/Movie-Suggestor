import {API_BASE_URL} from '../config'

// export function getListOfMovies(user_id, users, movieSuggestions) {
//     const userInfo = users.find(usr => {
//         return usr.user_id === user_id
//     })

//     const currentMovieSuggestions = getCurrentUsersMovieSuggestions(userInfo, movieSuggestions)
    
//     const avgSuggestions = getAvgSuggestions(currentMovieSuggestions)

//     const sortedAvgSuggestions = sortSuggestions(avgSuggestions)

//     return sortedAvgSuggestions
// }

// function getAvgSuggestions (movieSuggestions) {
//     return (
//         movieSuggestions.map(suggestion => {
//             const sum = (a, b) => parseInt(a) + parseInt(b)
//             const totalRating = suggestion.rating.reduce(sum)
            
//             const newAvg = totalRating/suggestion.rating.length

//             suggestion.rating = newAvg

//             return suggestion
//         })
//     )
// }

// function getCurrentUsersMovieSuggestions (userInfo, movieSuggestions) {
//     const suggestions = [];

//     userInfo.friends.forEach(friend => {
//         movieSuggestions[friend].reviews.forEach(review => {
//             if (suggestions.length === 0) {
//                 suggestions.push({
//                     title: review.title,
//                     releaseDate: review.releaseDate,
//                     img: review.img,
//                     rating: [review.rating],
//                 })
//             }
//             else {
//                 let done = false;
//                 let index = 0
//                 while (!done) {
//                     if (suggestions[index]) {
//                         if (suggestions[index].title === review.title) {
//                             suggestions[index].rating = [...suggestions[index].rating, review.rating]
//                             done = true
//                         }
//                     }
//                     if (index > suggestions.length-1) {
//                         suggestions.push({
//                             title: review.title,
//                             releaseDate: review.releaseDate,
//                             img: review.img,
//                             rating: [review.rating],
//                         })
//                         done = true
//                     }
//                     index += 1
//                 }
//             }
//         })
//     })
//     return suggestions
// }

// function sortSuggestions (avgSuggestions) {
//     var len = avgSuggestions.length;
//     for (var i = len-1; i>=0; i--){
//       for(var j = 1; j<=i; j++){
//         if(avgSuggestions[j-1].rating < avgSuggestions[j].rating){
//             var temp = avgSuggestions[j-1];
//             avgSuggestions[j-1] = avgSuggestions[j];
//             avgSuggestions[j] = temp;
//          }
//       }
//     }
//     return avgSuggestions;
// }

export function getListOfMovies(user_id) {
    fetch(`${API_BASE_URL}/moviesuggestions/${user_id}`, {
    })
    .then(res => {
        return res.json()
    })
}