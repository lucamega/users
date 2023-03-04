const PROXY_CONFIG = [
    {
        context: [
            "/user",
        ],
        target: "http://localhost:5057",
        secure: false
    }
]

module.exports = PROXY_CONFIG;
