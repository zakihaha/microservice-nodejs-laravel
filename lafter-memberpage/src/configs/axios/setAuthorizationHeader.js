import instance from "./index"

export default (token = null) => {
    instance.defaults.headers.common.authorization = `${token}`
    // else delete instance.defaults.headers.common.authorization
}