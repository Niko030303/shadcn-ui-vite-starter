import { Model } from '@minimalpack/react-model'
import Common from './common'

const models = { Common }

export const {
  getInitialState,
  useStore,
  getState,
  actions,
  subscribe,
  unsubscribe
} = Model(models)
