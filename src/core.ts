/**
 * Created by Jaron Long on 2021/1/5
 */
import Analytics, { AnalyticsInstance } from 'analytics'
import snowplowPlugin from '@analytics/snowplow'
import { TrackerOptions } from './interface'

export function initAnalytics(options: Partial<TrackerOptions>) {
  const config: TrackerOptions = {
    appId: 'smart-tracker',
    trackerHost: 'scrmv3.lctest.cn',
    collectorUrl: '',
    ...options
  }
  return Analytics({
    app: 'smart-marketing',
    plugins: [
      // Minimal recommended configuration
      snowplowPlugin({
        name: 'smart-marketing-sp',
        scriptSrc: `//${config.trackerHost}/smart-sp-2-15-0.js`,
        collectorUrl: config.collectorUrl,
        trackerSettings: {
          appId: config.appId,
          platform: 'web',
          cookieName: '_sm-sp_',
          contexts: {
            webPage: true
          }
        }
      })
    ]
  })
}

export function initPageTracker(analytics: AnalyticsInstance) {
  // Enable some automatic tracking before page event
  analytics.on('initialize:snowplow', ({ instance }) => {
    // Track snowplow('enableActivityTracking', minimumVisitLength, heartBeat);
    instance.plugins.snowplow.enableActivityTracking(10, 10)
    instance.plugins.snowplow.enableLinkClickTracking()
  })

  // Track page view with additional entities
  analytics.page({
    // @ts-ignore FIXME: ts-ignore.
    contexts: [
      {
        schema: 'iglu:com.acme/blog_post/jsonschema/1-0-0',
        data: {
          title: 'Re-thinking the structure of event data',
          category: 'Data Insights',
          author: 'Cara Baestlein',
          datePublished: '2020-01-24'
        }
      }
    ]
  })
}
