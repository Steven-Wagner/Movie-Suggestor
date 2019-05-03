module.exports = {
    PORT: process.env.PORT || 3000,
    API_BASE_URL: 
        process.env.REACT_APP_BASE_URL || 
        "http://localhost:8000/api",
    TOKEN_KEY: 'authToken'
}