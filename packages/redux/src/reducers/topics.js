import types from '../constants/action-types'
import pagination from '../utils/pagination'

// lodash
import concat from 'lodash/concat'
import get from 'lodash/get'
import map from 'lodash/map'
import merge from 'lodash/merge'
import set from 'lodash/set'

const _ = {
  concat,
  get,
  map,
  merge,
  set,
}
const { offsetToPage } = pagination

export function topic(state = {}, action = {}) {
  switch (action.type) {
    case types.selectedTopic.read.success:
    case types.selectedTopic.read.alreadyExists: {
      return _.merge({}, state, {
        slug: _.get(action, 'payload.topic.slug'),
        error: null,
        isFetching: false,
      })
    }

    case types.selectedTopic.read.request:
      return _.merge({}, state, {
        slug: _.get(action, 'payload.slug'),
        error: null,
        isFetching: true,
      })

    case types.selectedTopic.read.failure:
      return _.merge({}, state, {
        slug: _.get(action, 'payload.slug'),
        error: _.get(action, 'payload.error'),
        isFetching: false,
      })
    default:
      return state
  }
}

export function topics(state = {}, action = {}) {
  switch (action.type) {
    case types.topics.read.success: {
      const { payload } = action
      const total = _.get(payload, 'total')
      const offset = _.get(payload, 'offset')
      const limit = _.get(payload, 'limit')
      const { page, nPerPage, totalPages } = offsetToPage({
        limit,
        offset,
        total,
      })
      const pageItems = _.map(_.get(payload, 'items'), item => item.id)
      /* If nPerPage changed, overwrite the items in state, otherwise merge items with which in state */
      const items =
        nPerPage !== state.nPerPage
          ? { [page]: pageItems }
          : _.merge({}, state.items, { [page]: pageItems })
      return _.merge({}, state, {
        items,
        totalPages,
        page,
        nPerPage,
        error: null,
        isFetching: false,
      })
    }

    case types.topics.read.request:
      return _.merge({}, state, {
        // page: action.page,
        // nPerPage: action.nPerPage,
        error: null,
        isFetching: true,
      })

    case types.topics.read.failure:
      return _.merge({}, state, {
        error: _.get(action, 'payload.error'),
        isFetching: false,
      })

    default:
      return state
  }
}
