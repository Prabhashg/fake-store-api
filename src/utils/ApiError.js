class ApiError extends Error{
    constructor(
            statusCode, 
            error, 
            message="Something went wrong"
            )
        {
            super(message),
            this.statusCode = statusCode,
            this.data = null,
            this.error = error
        }
}