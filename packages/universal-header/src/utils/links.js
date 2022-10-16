import { servicePathnames } from '../constants/services'
import { ACTION_KEY } from '../constants/actions'
import { FOOTER_KEY, FOOTER_PATH } from '../constants/footer'
import { SOCIAL_MEDIA_KEY } from '../constants/social-media'
import { CHANNEL_KEY, CHANNEL_PATH } from '../constants/channels'
import externalLinks from '../constants/external-links'
// @twreporter
import origins from '@twreporter/core/lib/constants/request-origins'
import releaseBranchConsts from '@twreporter/core/lib/constants/release-branch'
// lodash
import forEach from 'lodash/forEach'
import reduce from 'lodash/reduce'
const _ = {
  forEach,
  reduce,
}

const originsForClient = origins.forClientSideRendering

/**
 * @param {string} domain - one of 'account', 'main', 'support', or 'api'
 * @returns {Object}
 */
function getOriginsByType(domain) {
  const baseURL = {}
  _.forEach(releaseBranchConsts, branch => {
    baseURL[branch] = originsForClient[branch][domain]
  })
  return baseURL
}

const accountsBaseURL = getOriginsByType('accounts')
const apiBaseURL = getOriginsByType('api')
const mainBaseURL = getOriginsByType('main')
// const support = getOriginsByType('support')

const defaultReleaseBranch = releaseBranchConsts.master
const defaultIsExternal = false

function __getLink(isExternal, releaseBranch, baseURL, path) {
  if (isExternal) {
    if (baseURL.hasOwnProperty(releaseBranch)) {
      return {
        to: baseURL[releaseBranch] + path,
        isExternal,
      }
    }
  }

  return {
    to: path,
    isExternal,
  }
}

function __getExternalLinks() {
  return Object.assign({}, externalLinks)
}

const __composeExternalLink = link => ({ to: link, isExternal: true })

export const getCategoryLink = (
  isExternal = defaultIsExternal,
  releaseBranch = defaultReleaseBranch,
  path = ''
) => {
  return __getLink(isExternal, releaseBranch, mainBaseURL, path)
}

export function getLogoutLink(releaseBranch = defaultReleaseBranch) {
  return {
    to: apiBaseURL[releaseBranch] + servicePathnames.logout,
    isExternal: true,
  }
}

export function getLoginLink(releaseBranch = defaultReleaseBranch) {
  return {
    to: accountsBaseURL[releaseBranch] + servicePathnames.login,
    isExternal: true,
  }
}

export function getBookmarksLink(
  isExternal = defaultIsExternal,
  releaseBranch = defaultReleaseBranch
) {
  return __getLink(
    isExternal,
    releaseBranch,
    mainBaseURL,
    servicePathnames.bookmarks
  )
}

export function getSearchLink(
  isExternal = defaultIsExternal,
  releaseBranch = defaultReleaseBranch
) {
  return __getLink(
    isExternal,
    releaseBranch,
    mainBaseURL,
    servicePathnames.search
  )
}

export function getLogoLink(
  isExternal = defaultIsExternal,
  releaseBranch = defaultReleaseBranch
) {
  return __getLink(isExternal, releaseBranch, mainBaseURL, '')
}

export function getActionLinks() {
  return {
    [ACTION_KEY.support]: {
      to: __getExternalLinks().monthlyDonation,
      isExternal: true,
    },
    [ACTION_KEY.newsLetter]: {
      to: __getExternalLinks().newsLetter,
      isExternal: true,
    },
  }
}

export function getFooterLinks(
  isExternal = defaultIsExternal,
  releaseBranch = defaultReleaseBranch
) {
  return {
    [FOOTER_KEY.aboutUs]: __getLink(
      isExternal,
      releaseBranch,
      mainBaseURL,
      FOOTER_PATH.aboutUs
    ),
    [FOOTER_KEY.influenceReport]: __getLink(
      isExternal,
      releaseBranch,
      mainBaseURL,
      FOOTER_PATH.influenceReport
    ),
    [FOOTER_KEY.openLab]: __composeExternalLink(__getExternalLinks().openLab),
  }
}

export function getSocialMediaLinks() {
  const externalLinks = __getExternalLinks()
  return _.reduce(
    SOCIAL_MEDIA_KEY,
    (res, key) => {
      const link = externalLinks[key]
      if (link) {
        res[key] = __composeExternalLink(link)
      }
      return res
    },
    {}
  )
}

export function getChannelLinks(
  isExternal = defaultIsExternal,
  releaseBranch = defaultReleaseBranch
) {
  const links = _.reduce(
    CHANNEL_PATH,
    (res, path, key) => {
      const link = __getLink(isExternal, releaseBranch, mainBaseURL, path)
      res[key] = link
      return res
    },
    {}
  )
  links[CHANNEL_KEY.kidsReporter] = __composeExternalLink(
    __getExternalLinks().kidsReporter
  )

  return links
}
