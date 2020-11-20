<template>
  <RecruitComponent :socket="socket" />
</template>

<script>

import RecruitComponent from '../components/contents/recruit/Recruit'

export default {
  name: 'RecruitScreen',
  data () {
    return {
    }
  },
  props: ['socket'],
  components: {
    RecruitComponent
  }
}
</script>

<style lang="scss" scoped>
</style>
