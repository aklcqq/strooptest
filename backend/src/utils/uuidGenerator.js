const { v4: uuidv4 } = require('uuid');

function genUUID() {
    return uuidv4();
}

module.exports = { genUUID };