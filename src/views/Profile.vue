<template lang="pug">
  div(id="content")
    div(class="container")
      user-side-bar(:user="user")
      div(id="user-tweets")
        template(v-for="tweet in tweets")
          tweet(:tweet="tweet" :user="user" :account="account")

</template>

<script>
import Tweet from '@/components/Tweet.vue'
import UserSideBar from '@/components/UserSideBar.vue'
import { mapState } from 'vuex'

export default {
  name: 'Profile',
  components: {
    Tweet,
    UserSideBar
  },
  computed: {
    ...mapState('user', {
      user: state => state.user
    }),
    ...mapState('account', {
      account: state => state
    }),
    tweets () {
      return this.user.Tweets.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }
  },
  watch: {
    '$route' () {
      console.log('go')
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
    }

    > div:nth-child(2) {
      display: grid;
      grid-template-rows: 25px 25px 25px 25px;
      grid-row-gap: 10px;
      justify-items: flex-start;
    }
  }
  #user-tweets {
    height: 650px;
    display: grid;
    justify-content: center;
    grid-auto-rows: 150px;
    grid-row-gap: 30px;
    overflow-y: scroll;
  }
}
</style>
