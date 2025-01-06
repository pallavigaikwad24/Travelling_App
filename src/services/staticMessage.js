const requiredErrorMessage = (value) => `Please enter ${value}!`;
const validErrorMessage = (value) => `Please enter valid ${value}!`;
const existErrorMessage = (value, redirect) => `${value} is already exist , please ${redirect}`;
const notExistErrorMessage = (value, redirect) => `${value} is does not exist , please ${redirect}`;
const passwordErrorMessage = (value) => `${value} should 8 character long and contain at least one capital, 
one small character, one digit and one symbol!`;
const confirmMatchErrorMessage = (value) => `${value} should match with Password!`;
const notAvailableErrorMessage = (value, service) => `For ${value} ${service} are not available!`;
const availableErrorMessage = (value, service) => `Only ${value} ${service} are availble!`;
const expireTokenErrorMessage = () => `Your Reset Password token has been expired, Please try again!!`;
const emailverficationMessage = (value, service) => `${value} is send for verification, Please verify for your confirm ${service}`;
const logErrorMessage = (value) => `Error during ${value}!`;

module.exports = {
    requiredErrorMessage, validErrorMessage, existErrorMessage, passwordErrorMessage, confirmMatchErrorMessage,
    notExistErrorMessage, notAvailableErrorMessage, availableErrorMessage, expireTokenErrorMessage, emailverficationMessage,
    logErrorMessage
};