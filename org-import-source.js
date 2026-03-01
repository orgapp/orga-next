function interopDefault(mod) {
  return mod && mod.default ? mod.default : mod
}

function loadProvider() {
  const candidates = [
    'private-next-root-dir/src/org-components',
    'private-next-root-dir/org-components',
    '@orgajs/react',
    './org-components.js',
  ]

  for (const id of candidates) {
    try {
      // eslint-disable-next-line import/no-dynamic-require, global-require
      const mod = interopDefault(require(id))
      if (mod && typeof mod.useOrgComponents === 'function') {
        return mod.useOrgComponents
      }
    } catch (_) {
      // Ignore missing providers and try the next fallback.
    }
  }

  return function useOrgComponents() {
    return {}
  }
}

const useOrgComponents = loadProvider()

exports.useOrgComponents = useOrgComponents
