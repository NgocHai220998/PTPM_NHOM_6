<template>
  <section class="kanji-container">
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
      <div class="spell-kanji">
        <div class="on"><span>ON: たて</span></div>
        <div class="kun"><span>Kun: もとめるもとめるもとめる</span></div>
      </div>
      <div class="text-kanji">
        <span>語</span>
      </div>
      <div class="example-kanji">
        <div v-for="n in 2" :key="n" class="on"><span>たてたてたて</span></div>
      </div>
    </div>
    <div class="bottom">
      <a-button-group style="display: flex;">
        <a-button type="primary"> <a-icon type="left" /></a-button>
        <a-button type="primary"><a-icon type="right" /></a-button>
      </a-button-group>
      <a-button class="btn" @click="isRandom = !isRandom" :type="isRandom ? 'primary' : 'danger'">Ngẫu nhiên</a-button>
      <a-button class="btn" @click="isAuto = !isAuto" :type="isAuto ? 'primary' : 'danger'">Tự động</a-button>
    </div>
  </section>
</template>

<script>

import ButtonAdd from './ButtonAdd'
import ButtonEdit from './ButtonEdit'

export default {
  name: 'Kanji',
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
  .kanji-container {
    position: relative;
    .content {
      position: absolute;
      top: 50%;
      right: 50%;
      margin: 0 auto;
      transform: translate(50%, -50%);
      .text-kanji {
        text-align: center;
        span {
          font-size: 90px;
          color: white;
        }
      }
      display: flex;
      .spell-kanji {
        position: absolute;
        left: -75px;
        top: 30px;
        max-width: 80px;
        .on, .kun {
          span {
            color: white;
          }
        }
      }
      .example-kanji {
        position: absolute;
        max-width: 80px;
        min-width: 80px;
        left: 95px;
        top: 30px;
        div {
          span {
            color: white;
          }
        }
      }
    }
    .bottom {
      display: flex;
      position: absolute;
      bottom: 0px;
      .btn {
        max-width: 80px;
        margin-left: 5px;
      }
    }
  }
</style>
