function getUserInfo(value, param) {
    const arguments = {
        modelName: 'User',
        methodType: "findOne",
        args: { where: { [param]: value, is_deleted: false } }
    }
    return arguments;
}

module.exports = { getUserInfo }