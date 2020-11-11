<template>
  <section class="center">
    <div v-if="example !== ''">
        <div class="text-example">
            <span>日本で働きたい理由とは何ですか？</span>
        </div>
        <div class="text-mean">
            <span v-show="isHidenMean">Lý do bạn muốn làm việc ở Nhật là gì?</span>
            <a-button @click="isHidenMean = !isHidenMean" class="btn-hiden">
                {{ isHidenMean ? 'Ẩn' : 'Hiện Nghĩa' }}
            </a-button>
        </div>
    </div>
    <div v-else class="commingsoon">
        <span>Comming Soon</span>
    </div>
  </section>
</template>

<script>
export default {
  name: 'FooterCenter',
  data () {
    return {
      isHidenMean: true,
      example: 's'
    }
  }
}
</script>

<style lang="scss" scoped>
    .center {
        text-align: center;
        .text-example {
            span {
                font-size: 24px;
                font-weight: bold;
                color: white;
            }
        }
        .text-mean {
            span {
                font-size: 18px;
                color: white;
            }
            .btn-hiden {
                height: 20px;
            }
        }
        .commingsoon {
            span {
                font-size: 35px;
                color: white;
            }
        }
    }
</style>
