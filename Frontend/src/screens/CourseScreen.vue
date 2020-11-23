<template>
  <CourseComponent :socket="socket" />
</template>

<script>

import CourseComponent from '../components/contents/course/Course'

export default {
  name: 'CourseScreen',
  data () {
    return {
    }
  },
  props: ['socket'],
  components: {
    CourseComponent
  }
}
</script>

<style lang="scss" scoped>
</style>
