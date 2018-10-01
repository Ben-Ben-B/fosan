const statusCode = {
    ERROR_401: (msg, data={}) => {
        return {
            code: 401,
            msg,
            data
        }
    },

    ERROR_403: (msg, data={}) => {
        return {
            code: 403,
            msg,
            data
        }
    },

    ERROR_404: (msg, data={}) => {
        return {
            code: 404,
            msg,
            data
        }
    },

    ERROR_120001: (msg, data={}) => {
        return {
            code: 120001,
            msg,
            data
        }
    },

    ERROR_120006: (msg, data={}) => {
        return {
            code: 120006,
            msg,
            data
        }
    },

    ERROR_120007: (msg, data={}) => {
        return {
            code: 120007,
            msg,
            data
        }
    },

    ERROR_10212: (msg, data={}) => {
        return {
            code: 10212,
            msg,
            data
        }
    },

    ERROR_412: (msg, data={}) => {
        return {
            code: 412,
            msg,
            data
        }
    },

    ERROR_503: (msg, data={}) => {
        return {
            code: 503,
            msg,
            data
        }
    },

    SUCCESS_200: (msg='success', data={}) => {
        return {
            code: 0,
            msg,
            data
        }
    }
}

exports.statusCode = statusCode