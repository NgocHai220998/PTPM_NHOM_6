<template>
  <section class="feature">
    <div v-if="messages" class="feature-1 message">
      <a-button @click="showModal" class="btn" type="primary">Thông báo</a-button>
      <a-badge :count="messages.count">
      </a-badge>
    </div>
    <div class="feature-2">
      <router-link :to="{ name: 'RecruitScreen' }" class="link">
        Thuyết phục đồng đội
      </router-link>
    </div>
    <TechnicalPoint :socket="socket" :user="user" class="feature-3" />
    <a-modal
      title="Thông báo"
      :visible="visible"
      @ok="handleCancel"
      @cancel="handleCancel"
      v-if="messages"
    >
      <div style="background-color: rgba(0, 0, 0, 0.15); margin-top: 5px; padding: 5px;" v-for="(message, i) in messages.messages" :key="i" class="item-message">
        <h4 style="margin: 0; color: green;">{{ message.title }}</h4>
        <b>{{ message.time }}</b>-> <span>{{ message.content }}</span>
      </div>
    </a-modal>
  </section>
</template>

<script>

import TechnicalPoint from './TechnicalPoint'

export default {
  name: 'FeatureComponent',
  data () {
    return {
      user: null,
      visible: false,
      messages: null
    }
  },
  components: {
    TechnicalPoint
  },
  methods: {
    showModal () {
      this.visible = true
    },
    handleCancel () {
      this.visible = false
      this.socket.emit('clientClickMessage', {
        email: this.user.email
      })
    },
    connectSocket () {
      this.socket.on('serverRequestUpdateMessage', (data) => {
        this.messages = data.messages
      })
    }
  },
  props: ['socket'],
  beforeMount () {
    this.user = JSON.parse(localStorage.getItem('user'))
    this.connectSocket()
    this.socket.emit('clientRequestUpdateMessage', {
      email: this.user.email
    })
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
