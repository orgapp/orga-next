const orgLoader = require('@orgajs/loader')

module.exports = function nextOrgLoader(...args) {
	orgLoader.call(this, ...args)
}
