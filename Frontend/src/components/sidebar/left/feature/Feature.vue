<template>
  <section class="feature">
    <div class="feature-1">
      <router-link :to="{ name: '' }" class="link">
        Đi độ kiếp
      </router-link>
    </div>
    <div class="feature-2">
      <router-link :to="{ name: 'RecruitScreen' }" class="link">
        Thuyết phục đồng đội
      </router-link>
    </div>
    <TechnicalPoint :socket="socket" :user="user" class="feature-3" />
  </section>
</template>

<script>

import TechnicalPoint from './TechnicalPoint'

export default {
  name: 'FeatureComponent',
  data () {
    return {
      user: null
    }
  },
  components: {
    TechnicalPoint
  },
  props: ['socket'],
  beforeMount () {
    this.user = JSON.parse(localStorage.getItem('user'))
  }
}
</script>

<style lang="scss" scoped>
  .feature {
    padding: 30px 30px 30px 20px;
    &-1, &-2, &-3, &-4, &-5 {
      padding-bottom: 3px;
      .link {
        font-size: 16px;
        font-weight: 600;
        text-decoration: underline;
      }
    }
    &-technical-point {
      .input-number {
        span {
          font-weight: bold;
          font-size: 16px;
        }
      }
    }
  }
</style>
