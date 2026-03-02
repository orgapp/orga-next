/** @type {import('next').NextConfig} */
const nextConfig = {
	pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'org'],
}

const withOrg = require('@orgajs/next')()
module.exports = withOrg(nextConfig)
