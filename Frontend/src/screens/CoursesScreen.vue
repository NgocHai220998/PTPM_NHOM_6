<template>
  <CoursesComponent :socket="socket" />
</template>

<script>

import CoursesComponent from '../components/contents/courses/Courses'

export default {
  name: 'CoursesScreen',
  data () {
    return {
    }
  },
  props: ['socket'],
  components: {
    CoursesComponent
  }
}
</script>

<style lang="scss" scoped>
</style>
