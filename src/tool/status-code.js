const statusCode = {
    ERROR_401: (msg) => {
        return {
            code: 401,
            msg
        }
    },

    ERROR_403: (msg) => {
        return {
            code: 403,
            msg
        }
    },

    ERROR_404: (msg) => {
        return {
            code: 404,
            msg
        }
    },

    ERROR_10212: (msg) => {
        return {
            code: 10212,
            msg
        }
    },
    ERROR_412: (msg) => {
        return {
            code: 412,
            msg
        }
    },

    SUCCESS_200: (msg, data={}) => {
        return {
            code: 0,
            msg,
            data,
        }
    }
}

exports.statusCode = statusCode