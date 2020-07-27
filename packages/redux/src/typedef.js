/**
 *  Mongodb ObjectID type definition
 *  @typedef {string} ObjectID
 */

/**
 *  Slug type defintion
 *  @typedef {string} Slug
 */

/**
 * ResizedTarget type definition
 * @typedef {Object} ResizedTarget
 * @property {string} url
 * @property {number} height
 * @property {number} width
 */

/**
 *  Image type definition
 *  @typedef {Object} Image
 *  @property {string} id
 *  @property {string} description
 *  @property {string} filetype
 *  @property {Object} resized_targets
 *  @property {ResizedTarget} resized_targets.tiny
 *  @property {ResizedTarget} resized_targets.w400
 *  @property {ResizedTarget} resized_targets.mobile
 *  @property {ResizedTarget} resized_targets.tablet
 *  @property {ResizedTarget} resized_targets.desktop
 */

/**
 *  Tag type definition
 *  @typedef {Object} Tag
 *  @property {string} id
 *  @property {string} name
 */

/**
 *  Category type definition
 *  @typedef {Object} Category
 *  @property {string} id
 *  @property {string} name
 *  @property {number} sort_order
 */

/**
 *  Author type definition
 *  @typedef {Object} Author
 *  @property {string} id
 *  @property {string} name
 *  @property {string} job_title
 */

/**
 *  Post type definition
 *  @typedef {Object} Post
 *  @property {Category[]} categories
 *  @property {Image} hero_image
 *  @property {Image} leading_image_portrait
 *  @property {Image} og_image
 *  @property {Slug} slug
 *  @property {Tag[]} tags
 *  @property {bool} full
 *  @property {bool} is_external
 *  @property {string} id
 *  @property {string} og_description
 *  @property {string} published_date
 *  @property {string} style
 *  @property {string} subtitle
 *  @property {string} title
 */

/**
 *  Topic type definition
 *  @typedef {Object} Topic
 *  @property {Image} leading_image
 *  @property {Image} leading_image_portrait
 *  @property {Image} og_image
 *  @property {ObjectID[]} relateds - ObjectIDs of related posts
 *  @property {Slug} slug
 *  @property {bool} full
 *  @property {string} id
 *  @property {string} og_description
 *  @property {string} title
 *  @property {string} short_title
 *  @property {string} updated_at
 */

/**
 *  FullTopic type definition
 *  @typedef {Object} FullTopic
 *  @property {Image} leading_image
 *  @property {Image} og_image
 *  @property {Slug} slug
 *  @property {bool} full
 *  @property {string} id
 *  @property {string} og_description
 *  @property {string} title
 *  @property {string} short_title
 *  @property {string} updated_at
 *
 *  @property {Object} description
 *  @property {Object[]} description.api_data
 *  @property {Object} team_description
 *  @property {Object[]} team_description.api_data
 *  @property {Object} leading_video
 *  @property {string} headline
 *  @property {string} og_title
 *  @property {string} published_date
 *  @property {string} relateds_background
 *  @property {string} relateds_format
 *  @property {string} subtitle
 *  @property {string} title_position
 */

/**
 *  FullPost type definition
 *  @typedef {Object} FullPost
 *  @property {Category[]} categories
 *  @property {Image} hero_image
 *  @property {Image} leading_image_portrait
 *  @property {Image} og_image
 *  @property {Slug} slug
 *  @property {Tag[]} tags
 *  @property {bool} full
 *  @property {bool} is_external
 *  @property {string} id
 *  @property {string} og_description
 *  @property {string} published_date
 *  @property {string} style
 *  @property {string} subtitle
 *  @property {string} title
 *
 *  @property {Author[]} designers
 *  @property {Author[]} engineers
 *  @property {Author[]} photographers
 *  @property {Author[]} writers
 *  @property {Object} topic
 *  @property {ObjectID[]} topic.relateds
 *  @property {string} topic.slug
 *  @property {string} topic.title
 *  @property {string} topic.short_title
 *  @property {Object} brief
 *  @property {Object[]} brief.api_data
 *  @property {Object} content
 *  @property {Object[]} content.api_data
 *  @property {ObjectID[]} relateds - array of post id
 *  @property {string} copyright
 *  @property {string} extend_byline
 *  @property {string} hero_image_size
 *  @property {string} leading_image_description
 *  @property {string} og_title
 *  @property {string} updated_at
 */

/**
 *  PostList type definition
 *  @typedef {Object} PostList
 *  @property {Object.<number, number[]>} pages - Page to item positions. Ex: `1: [0, 9]`, which means items[0] - items[9] are for page 1
 *  @property {ObjectID[]} items
 *  @property {Object} error
 *  @property {bool} isFetching
 *  @property {number} total
 */

/**
 *  TopicList type definition
 *  @typedef {Object} TopicList
 *  @property {bool} isFetching
 *  @property {Object.<number, ObjectID[]>} items - Page to objectID. Ex: `1: ['id_1', 'id_2']`, which means page 1 having 'id_1' and 'id_2' entities
 *  @property {Object} error
 *  @property {number} totalPages
 *  @property {number} page
 *  @property {number} nPerPage
 */

/**
 *  PostEntities type definition
 *  @typedef {Object} PostEnitity
 *  @property {Object.<ObjectID, Post|FullPost>} byId
 *  @property {ObjectID[]} allIds
 *  @property {Object.<Slug, ObjectID>} slugToId
 */

/**
 *  TopicEntities type definition
 *  @typedef {Object} TopicEntities
 *  @property {Object.<ObjectID, Topic|FullTopic>} byId
 *  @property {ObjectID[]} allIds
 *  @property {Object.<Slug, ObjectID>} slugToId
 */

/**
 *  RelatedPostsOfAnEntity type definition
 *  @typedef {Object} RelatedPostsOfAnEntity
 *  @property {bool} isFetching
 *  @property {Object} error
 *  @property {ObjectID[]} more - Enitites not loaded, but indicate what we can load next
 *  @property {ObjectID[]} items- Entities already loaded and ready for rendering
 */

/**
 *  ReduxState type definition
 *  @typedef {Object} ReduxState
 *
 *  @property {Object} entities
 *  @property {PostEntities} entities.posts
 *  @property {TopicEntities} entities.topics
 *
 *  @property {Object} index_page
 *  @property {Object} index_page.error
 *  @property {bool} index_page.isFetching
 *  @property {ObjectID[]} index_page.culture_and_art
 *  @property {ObjectID[]} index_page.editor_picks_section
 *  @property {ObjectID[]} index_page.environment_and_education
 *  @property {ObjectID[]} index_page.human_rights_and_society
 *  @property {ObjectID[]} index_page.infgraphics_section
 *  @property {ObjectID[]} index_page.international
 *  @property {ObjectID[]} index_page.latest_section
 *  @property {ObjectID[]} index_page.latest_topic_section
 *  @property {ObjectID[]} index_page.living_and_medical_care
 *  @property {ObjectID[]} index_page.photos_section
 *  @property {ObjectID[]} index_page.politics_and_economy
 *  @property {ObjectID[]} index_page.reviews_section
 *  @property {ObjectID[]} index_page.topics_section
 *
 *  @property {Object} selected_post
 *  @property {Object} selected_post.error
 *  @property {Slug} selected_post.slug
 *  @property {bool} selected_post.isFetching
 *
 *  @property {Object} selected_topic
 *  @property {Object} selected_topic.error
 *  @property {Slug} selected_topic.slug
 *  @property {bool} selected_topic.isFetching
 *
 *  @property {Object} lists
 *  @property {Object.<ObjectID, PostList>}
 *
 *  @property {TopicList} topic_list
 *
 *  @property {Object} relatedPostsOf
 *  @property {Object.<ObjectID, RelatedPostsOfAnEntity>} relatedPostsOf.byId
 *  @property {ObjectID[]} relatedPostsOf.allIds - ids of entities
 *
 *  @property {Object} featureTopic
 *  @property {bool} isFetching
 *  @property {string} id - topic id
 *  @property {Object} error
 *  @property {ObjectID[]} lastThreeRelatedPostIds - three related posts, sort by published_date in descending order, of topic
 *
 *  @property {Object} articlesByAuthor
 *  @property {Object} auth
 *  @property {Object} authorsList
 *  @property {Object} bookmarkWidget
 *  @property {Object} bookmarks
 *  @property {Object} enititiesForAuthors
 *  @property {Object} origins
 *  @property {Object} searchedAuthorsList
 *  @property {number} nextNotifyPopupTS
 */

/**
 *  Description of async action creator
 *  @name Thunk
 *  @function
 *  @param {Function} dispatch - Redux store dispatch function
 *  @param {Function} getState - Redux store getState function
 *  @return {Promise} resolve with success action or reject with fail action
 */
