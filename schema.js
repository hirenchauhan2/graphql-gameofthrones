const {
  GraphQLSchema,
  GraphQLBoolean,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = require('graphql')

const DataLoader = require('dataloader')

const {
  getSeasons,
  getFeaturedCharacters,
  getCharacter,
  getCharactersList
} = require('./got-api')

const { stripHTMLTags } = require('./util')

const seasonsLoader = new DataLoader(keys => getSeasons)
<<<<<<< HEAD
const featuredCharsLoader = new DataLoader(keys =>
  Promise.all(keys.map(getFeaturedCharacters))
)
const characterLoader = new DataLoader(keys =>
  Promise.all(keys.map(getCharacter))
)
=======
const featuredCharsLoader = new DataLoader(keys => Promise.all(keys.map(getFeaturedCharacters)))
const characterLoader = new DataLoader(keys => Promise.all(keys.map(getCharacter)))
>>>>>>> 3f05693834cd92b5f17e4c7482b6a8c697b1f330
const characterListLoader = new DataLoader(keys => getCharactersList)

// Season Type
const SeasonType = new GraphQLObjectType({
  name: 'Season',
  description: '',
  fields: () => ({
    id: { type: GraphQLInt },
    season_number: { type: GraphQLInt },
    episodes: { type: new GraphQLList(EpisodeType) }
  })
})

// Episode Type
const EpisodeType = new GraphQLObjectType({
  name: 'Episode',
  description: 'Episode data',
  fields: () => ({
    id: { type: GraphQLInt },
    season_id: { type: GraphQLInt },
    season_color: { type: GraphQLString },
    season_number: { type: GraphQLInt },
    episode_number: { type: GraphQLInt },
    excerpt: { type: GraphQLString },
    locked: { type: GraphQLString },
    title: { type: GraphQLString },
    img: { type: GraphQLString },
    tunein_title: { type: GraphQLString },
    tunein_subtitle: { type: GraphQLString },
    featuredCharacters: {
      type: new GraphQLList(FeaturedCharacterType),
<<<<<<< HEAD
      resolve: async data => await featuredCharsLoader.load(data.id)
=======
      resolve: async data => {
        return await featuredCharsLoader.load(data.id)
      }
>>>>>>> 3f05693834cd92b5f17e4c7482b6a8c697b1f330
    }
  })
})

// character short info
const CharacterShortInfoType = new GraphQLObjectType({
  name: 'CharacterShortInfo',
  description: 'Short info of a character',
  fields: () => ({
    id: { type: GraphQLInt },
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString },
    img: { type: GraphQLString }
  })
})

// Featured Character type
const FeaturedCharacterType = new GraphQLObjectType({
  name: 'FeaturedCharacter',
  description: 'Featured character',
  fields: () => ({
    id: { type: GraphQLInt },
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString },
    img: { type: GraphQLString },
    takeover: { type: GraphQLString }
  })
})

const CharacterIntroType = new GraphQLObjectType({
  name: 'CharacterIntro',
  fields: () => ({
    sub_title: { type: GraphQLString },
    quote: { type: GraphQLString },
    by: { type: GraphQLString }
  })
})

// Character full info
const CharacterType = new GraphQLObjectType({
  name: 'Character',
  description: 'Character details',
  fields: () => ({
    id: { type: GraphQLInt },
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString },
<<<<<<< HEAD
    intro: { type: CharacterIntroType },
=======
    intro: {
      type: CharacterIntroType
    },
>>>>>>> 3f05693834cd92b5f17e4c7482b6a8c697b1f330
    bio: { type: GraphQLString },
    img: { type: GraphQLString },
    houses: { type: new GraphQLList(HouseShortType) }
  })
})
// House short info
const HouseShortType = new GraphQLObjectType({
  name: 'HouseShort',
  description: 'House short info',
  fields: () => ({
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    shortName: { type: GraphQLString },
    img: { type: GraphQLString },
    sigil_only: { type: GraphQLBoolean }
  })
})

module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'Query',
    description: 'Game of Thrones Viewer\'s guide GraphQL API',
    fields: () => ({
      allSeasons: {
        type: new GraphQLList(SeasonType),
        resolve: async () => await getSeasons()
      },
      season: {
        type: SeasonType,
        args: {
          id: { type: GraphQLInt }
        },
        async resolve(root, { id }) {
          if (!id) {
            return await getSeasons()[0]
          }
          return await seasonsLoader.load(id)
        }
      },
      characterList: {
        type: new GraphQLList(CharacterShortInfoType),
        resolve: async () => await getCharactersList()
      },
      character: {
        type: CharacterType,
        args: {
          id: { type: GraphQLInt }
        },
        resolve: async (root, { id }) => await characterLoader.load(id)
      }
    })
  })
})
