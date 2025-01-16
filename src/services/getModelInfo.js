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
    args[1]['returning'] = true
    return await getModel[methodType](...args);
  } else if (!args) {
    return await getModel[methodType]();
  } else {
    return await getModel[methodType](args);
  }
};

module.exports = getModelInfo;
