/**
 * Created by Jaron Long on 2021/1/6
 */
import { initAnalytics, initPageTracker } from 'poc-tracker'

const plugin = (context, inject) => {
  const analytics = initAnalytics(<%= options.trackerOptions %>)
  initPageTracker(analytics)
  inject('tracker', analytics)
}

export default plugin
