<template lang="pug">
  div(id="content")
    div(class="container")
      user-side-bar#user-profile(:user="user")
      main
        h3 Like
        div(id="user-tweets")
          template(v-for="likedTweet in likedTweets")
            tweet(:tweet="likedTweet" :user="likedTweet.User" :account="account" :key="likedTweet.id")

</template>

<script>
import Tweet from '@/components/Tweet.vue'
import UserSideBar from '@/components/UserSideBar.vue'
import { mapState } from 'vuex'

export default {
  name: 'like',
  components: {
    Tweet,
    UserSideBar
  },
  // data () {
  //   return {
  //   }
  // },
  computed: {
    ...mapState('user', {
      user: state => state.user
    }),
    ...mapState('account', {
      account: state => state
    }),
    ...mapState('tweet', {
      tweets: state => state.tweets
    }),
    likedTweets () {
      const likedTweetId = this.user.LikedTweets.map(likedTweet => likedTweet.id)
      const likedTweets = []
      this.tweets.forEach(tweet => {
        if (likedTweetId.includes(tweet.id)) {
          const likedTweet = this.user.LikedTweets.find(item => item.id === tweet.id)
          likedTweet.Replies = tweet.Replies
          likedTweet.LikedUsers = tweet.LikedUsers
          likedTweets.push(likedTweet)
        }
      })
      return likedTweets.slice().sort((a, b) => new Date(b.Like.createdAt) - new Date(a.Like.createdAt))
    }
  }
}
</script>

<style lang="scss" scoped>
  #content {
    height: 100%;
    .container {
      width: 75%;
      display: grid;
      grid-template-columns: 150px 690px;
      grid-column-gap: 90px;
    }
    #user-profile {
      display: grid;
      grid-template-rows: 300px 130px 50px;
      grid-row-gap: 20px;

      > div:nth-child(1) {
        display: grid;
        grid-template-rows: 150px 30px 100px;
        grid-row-gap: 10px;
        justify-items: flex-start;
        > img {
          width: 100%;
        }
        > h3 {
          margin: 0;
          font-size: 22px;
          color:#1da1f2;
        }
        > p {
          margin: 0;
          line-height: 1;
          color: #719ECE;
          font-weight: 500;
          text-align: left;
        }
      }

      > div:nth-child(2) {
        display: grid;
        grid-template-rows: 25px 25px 25px 25px;
        grid-row-gap: 10px;
        justify-items: flex-start;
        > p {
          color: #4C4C4C;
          font-weight: 500;
          font-size: 18px;
          margin: 0;
        }
      }
      > button {
        width: 90%;
        font-size: 18px;
        color: #113743;
        background-color: #71a6d0;
        font-weight: 500;
        border: none;
        border-radius: 8px;
      }
    }
    main {
      h3 {
        padding-bottom: 15px;
        text-align: left;
        margin: 0;
        font-size: 22px;
        color:#1da1f2;
      }
      #user-tweets {

        height: 650px;
        display: grid;
        grid-auto-rows: 150px;
        grid-row-gap: 30px;
        overflow-y: scroll;
      }
    }

  }
</style>
