import axios from '../axios.js'

const state = {
  tweet: {
    id: 1,
    description: '今天天氣真好',
    UserId: 2,
    createdAt: '2019-06-30T13:18:31.000Z',
    updatedAt: '2019-06-30T13:18:31.000Z',
    User: {
      id: 2,
      name: 'user1',
      email: 'user1@example.com',
      avatar: null,
      introduction: 'Hello world',
      role: null,
      createdAt: '2019-06-30T13:17:40.000Z',
      updatedAt: '2019-06-30T13:17:40.000Z'
    },
    Replies: [
      {
        id: 1,
        UserId: 2,
        TweetId: 1,
        comment: '對啊！真的很熱',
        createdAt: '2019-06-30T19:06:26.000Z',
        updatedAt: '2019-06-30T19:06:26.000Z',
        User: {
          id: 2,
          name: 'user1',
          email: 'user1@example.com',
          avatar: null,
          introduction: 'Hello world',
          role: null,
          createdAt: '2019-06-30T13:17:40.000Z',
          updatedAt: '2019-06-30T13:17:40.000Z'
        }
      }
    ],
    LikedUsers: []
  },
  tweets: [
    {
      id: 1,
      description: '今天天氣真好',
      UserId: 2,
      createdAt: '2019-06-30T13:18:31.000Z',
      updatedAt: '2019-06-30T13:18:31.000Z',
      User: {
        id: 2,
        name: 'user1',
        email: 'user1@example.com',
        avatar: null,
        introduction: 'Hello world',
        role: null,
        createdAt: '2019-06-30T13:17:40.000Z',
        updatedAt: '2019-06-30T13:17:40.000Z'
      },
      Replies: [
        {
          id: 1,
          UserId: 2,
          TweetId: 1,
          comment: '對啊！真的很熱',
          createdAt: '2019-06-30T19:06:26.000Z',
          updatedAt: '2019-06-30T19:06:26.000Z',
          User: {
            id: 2,
            name: 'user1',
            email: 'user1@example.com',
            avatar: null,
            introduction: 'Hello world',
            role: null,
            createdAt: '2019-06-30T13:17:40.000Z',
            updatedAt: '2019-06-30T13:17:40.000Z'
          }
        }
      ],
      LikedUsers: []
    }
  ]
}

const getters = {}

const mutations = {
  SET_TWEETS (state, data) {
    state.tweets = data
  },
  SET_TWEET (state, data) {
    data.Replies.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    state.tweet = data
  },
  PUSH_TWEET (state, data) {
    state.tweets.unshift(data)
    console.log(state.tweets)
  },
  PUSH_REPLY (state, data) {
    state.tweet.Replies.unshift({
      ...data.reply,
      User: { ...data.account }
    })
  }
}
const actions = {
  async getTweets (context) {
    try {
      const result = await axios('/tweets', {
        method: 'get'
      })
      context.commit('SET_TWEETS', result.data)
    } catch (error) {
      throw error
    }
  },
  async getTweet (context, id) {
    try {
      const result = await axios(`/tweets/${id}/replies`)
      context.commit('SET_TWEET', result.data)
      return result.data.UserId
    } catch (error) {
      throw error
    }
  },
  async postTweet (context, params) {
    try {
      const result = await axios('/tweets', {
        method: 'post',
        data: JSON.stringify({ description: params.description })
      })
      console.log(result)
      context.commit('PUSH_TWEET', result.data)
    } catch (error) {
      throw error
    }
  },
  async postReply (context, params) {
    try {
      const result = await axios(`/tweets/${params.id}/replies`, {
        method: 'post',
        data: JSON.stringify({ comment: params.comment })
      })
      context.commit('PUSH_REPLY', { reply: result.data, account: params.account })
    } catch (error) {
      throw error
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
