const bcrypt = require('bcrypt')

function hashPassword(password) {
    return bcrypt.hashSync(password, 15)
}

function comparePassword(password, passwordDB) {
    return bcrypt.compareSync(password, passwordDB)
}

module.exports = { hashPassword, comparePassword}