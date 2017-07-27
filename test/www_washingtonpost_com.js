import test from 'ava'

import { getScrap } from '../lib'
import { getTests } from '../src/tests'

const TEST_URL = 'https://www.washingtonpost.com/news/energy-environment/wp/2017/02/15/its-official-the-oceans-are-losing-oxygen-posing-growing-threats-to-marine-life/?utm_term=.378195a54fc0'

test.serial('www.washingtonpost.com', async t => {
  const scrap = await getScrap(TEST_URL)
  t.deepEqual(
    getTests(scrap),
    [
      'Chris Mooney',
      'Washington Post',
      'Scientists have just detected a major change to the Earth’s oceans linked to a warming climate'
    ]
  )
})
