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
  } else {
    if (methodType != 'create')
      args.where['is_deleted'] = false;
    return await getModel[methodType](args);
  }
};

module.exports = getModelInfo;