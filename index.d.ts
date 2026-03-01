import type { NextConfig } from 'next'
import type { RuleSetConditionAbsolute } from 'webpack'

type WithOrg = (config: NextConfig) => NextConfig

declare namespace nextOrg {
  interface NextOrgOptions {
    /**
     * A webpack rule test to match files to treat as Org.
     *
     * @default /\\.org$/
     */
    extension?: RuleSetConditionAbsolute

    /**
     * The options to pass to the Org loader.
     */
    options?: Record<string, unknown>
  }
}

/**
 * Use OrgX with Next.js.
 */
declare function nextOrg(options?: nextOrg.NextOrgOptions): WithOrg

export = nextOrg
