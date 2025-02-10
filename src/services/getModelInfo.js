/**
 * @param {Object} modelName
 * @param {Object} arguments
 * @param {String} methodType
 * @returns {Promise<Object>}
 */

const { sequelize } = require("../models");

const getModelInfo = async ({ modelName, methodType, args }) => {
  const getModel = sequelize.models[modelName];
  if (Array.isArray(args)) {
    args[1]['returning'] = true;
    args[1].where['is_deleted'] = false;
    return await getModel[methodType](...args);
  } else if (args == undefined) {
    return await getModel[methodType]();
  } else {
    if (methodType != 'create' || methodType != 'findOrCreate' || !args?.where?.is_deleted) {
      args.where ? args.where['is_deleted'] = false : "";
    }
    console.log("MethodType:", methodType, modelName, args);
    const result = await getModel[methodType](args);
    console.log("23::", result);
    return await getModel[methodType](args);
  }
};

module.exports = getModelInfo;