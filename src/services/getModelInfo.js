/**
 * @param {Object} modelName
 * @param {Object} arguments
 * @param {String} methodType
 * @returns {Promise<Object>}
 */

const getModelInfo = async ({ modelName, methodType, args }) => {
  let data = null;
  if (Array.isArray(args)) {
    data = await modelName[methodType](...args);
  } else {
    data = await modelName[methodType](args);
  }
  return data;
};

module.exports = getModelInfo;
 