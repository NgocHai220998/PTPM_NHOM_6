<template>
  <section class="voca-container">
    <div style="display: flex; justify-content: space-between;">
      <ButtonAdd />
      <ButtonEdit />
      <div>
        <a-popconfirm
          title="Bạn chắc chắn muốn xóa chứ？"
          okText="Xóa luôn"
          cancelText="Thôi"
          @confirm="confirmDelete"
          @cancel="cancelDelete"
        >
          <a-button type="danger"><a-icon type="delete" />Xóa</a-button>
        </a-popconfirm>
      </div>
    </div>
    <div class="content">
      <div class="text-voca">
        <span>Hello</span>
      </div>
      <div class="text-spell">
        <span>/hə'lou/</span>
      </div>
    </div>
    <div class="bottom">
      <a-button-group style="display: flex;">
        <a-button type="primary"> <a-icon type="left" /></a-button>
        <a-button type="primary"><a-icon type="right" /></a-button>
      </a-button-group>
      <a-button class="btn" @click="isRandom = !isRandom" :type="isRandom ? 'primary' : ''">Ngẫu nhiên</a-button>
      <a-button class="btn" @click="isAuto = !isAuto" :type="isAuto ? 'primary' : ''">Tự động</a-button>
    </div>
  </section>
</template>

<script>

import ButtonAdd from './ButtonAdd'
import ButtonEdit from './ButtonEdit'

export default {
  name: 'voca',
  data () {
    return {
      isRandom: false,
      isAuto: false
    }
  },
  components: {
    ButtonAdd,
    ButtonEdit
  },
  methods: {
    confirmDelete () {
      this.$message.success('Okie')
    },
    cancelDelete () {
      this.$message.success('Cancel')
    }
  }
}
</script>

<style lang="scss" scoped>
  .voca-container {
    position: relative;
    .content {
      position: absolute;
      top: 50%;
      right: 50%;
      margin: 0 auto;
      transform: translate(50%, -50%);
      .text-voca {
        span {
          font-size: 40px;
          color: white;
        }
      }
      .text-spell {
        span {
          font-size: 20px;
          color: white;
        }
      }
    }
    .bottom {
      display: flex;
      position: absolute;
      bottom: 0px;
      .btn {
        max-width: 80px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-left: 5px;
      }
    }
  }
</style>
