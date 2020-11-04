<template>
  <section class="course-card">
    <router-link :to="{ name: 'CourseScreen', params: { name: course.name }}">
      <a-card class="card" style="width: 330px">
        <a-card-meta :title="course.name" description="Một khóa học tốt sẽ giúp bạn tiết kiệm thời gian để tạo từ">
          <a-avatar
            slot="avatar"
            :src="user.main.srcImage"
          />
        </a-card-meta>
      </a-card>
    </router-link>
  </section>
</template>
<script>

export default {
  name: 'CardComponent',
  data () {
    return {
      user: null
    }
  },
  props: ['course'],
  methods: {
  },
  beforeMount () {
    this.user = JSON.parse(localStorage.getItem('user'))
  }
}
</script>

<style lang="scss" scoped>
  .course-card {
    padding-bottom: 30px;
    .card {
      &:hover {
        box-shadow: 1px 1px 1px green, 1px 1px 5px green, 1px 1px 25px red;
        cursor: pointer;
      }
    }
  }
</style>
