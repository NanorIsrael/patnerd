class CustomError extends Error {
    status: number

    constructor(message: string, status: number) {
        super(message)
        this.status = status
        // Set the prototype explicitly to avoid issues with instanceof
        Object.setPrototypeOf(this, CustomError.prototype)
    }
}

export default CustomError
