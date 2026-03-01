module.exports =
  (pluginOptions = {}) =>
  (inputConfig = {}) => {
    const extension = pluginOptions.extension || /\.org$/
    const userProvidedOrgOptions = pluginOptions.options

    const loader = {
      loader: require.resolve('./org-js-loader'),
      options: {
        providerImportSource: 'next-org-import-source-file',
        ...userProvidedOrgOptions,
      },
    }

    /**
     * @type {import('next').NextConfig}
     */
    const nextConfig = {
      ...inputConfig,
      webpack(config, options) {
        config.resolve.alias['next-org-import-source-file'] = [
          'private-next-root-dir/src/org-components',
          'private-next-root-dir/org-components',
          '@orgajs/react',
          require.resolve('./org-components.js'),
        ]
        config.module.rules.push({
          test: extension,
          use: [options.defaultLoaders.babel, loader],
        })

        if (typeof inputConfig.webpack === 'function') {
          return inputConfig.webpack(config, options)
        }

        return config
      },
    }

    if (process.env.TURBOPACK) {
      const orgRule = {
        loaders: [loader],
        as: '*.tsx',
        condition: {
          path: extension,
        },
      }

      // Keep a unique glob key to reduce accidental rule ordering collisions.
      let wildcardGlob = '{*,next-org-rule}'
      let wildcardRule = inputConfig.turbopack?.rules?.[wildcardGlob] ?? []
      wildcardRule = [
        ...(Array.isArray(wildcardRule) ? wildcardRule : [wildcardRule]),
        orgRule,
      ]

      nextConfig.turbopack = {
        ...inputConfig?.turbopack,
        rules: {
          ...inputConfig?.turbopack?.rules,
          [wildcardGlob]: wildcardRule,
        },
        resolveAlias: {
          ...inputConfig?.turbopack?.resolveAlias,
          'next-org-import-source-file': '@orgajs/next/org-import-source',
        },
      }
    }

    return nextConfig
  }
