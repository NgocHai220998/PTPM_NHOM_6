<template>
  <section :class="isHiden ? 'disabledBox' : ''" class="rank-right">
    <div class="top">
      <div class="info-rank">
        <span>
          <b>Bảng xếp hạng võ đài</b>
        </span>
      </div>
    </div>
    <div class="center">
      <a-table
        :columns="columns"
        :dataSource="listRank"
        :scroll="{ y: (windowHeight > 700) ? 280 : 187 }"
      >
        <a-popconfirm
          slot="action"
          title="Bạn chắc chắn muốn đấm chứ"
          @confirm="fight(record.key)"
          okText="Đấm luôn"
          cancelText="Thôi"
          slot-scope="record"
        >
          <!-- <a-button>TL</a-button> -->
          <a-button class="background"><a-icon type="scissor" /></a-button>
        </a-popconfirm>
        <a-button slot-scope="record" @click="showModal(record.key)" slot="info" style="width: 50%" type="primary"><a-icon type="question-circle" /></a-button>
      </a-table>
      <a-modal title="Thông tin" v-model="visible" @ok="handleOk">
        <a-spin :spinning="isLoadingInfo" tip="Loading...">
          <div style="display: flex" class="info">
            <div class="info-left">
              <div v-for="(value, name, index) in dataInfo" :key="index">
                <span style="font-size: 16px" v-if="name === 'userName'"><b>Tên:</b> {{ value }}</span>
                <span style="font-size: 16px" v-if="name === 'kind'"><b>Hệ:</b> {{ value }}</span>
                <span style="font-size: 16px" v-if="name === 'martialArt'"><b>Võ lực:</b> {{ value + (userByEmail.profile.technicalPoint.martialArt * 10) }}</span>
                <span style="font-size: 16px" v-if="name === 'avoid'"><b>Né tránh:</b> {{ value + (userByEmail.profile.technicalPoint.avoid * 1) }}</span>
                <span style="font-size: 16px" v-if="name === 'propUp'"><b>Chống đỡ:</b> {{ value + (userByEmail.profile.technicalPoint.propUp * 1) }}</span>
                <span style="font-size: 16px" v-if="name === 'critical'"><b>Chí mạng:</b> {{ value + (userByEmail.profile.technicalPoint.critical * 1) }}</span>
                <span style="font-size: 16px" v-if="name === 'armor'"><b>Giáp:</b> {{ value + (userByEmail.profile.technicalPoint.armor * 10) }}</span>
                <span style="font-size: 16px" v-if="name === 'hp'"><b>Máu:</b> {{ value + (userByEmail.profile.technicalPoint.hp * 20) }}</span>
              </div>
            </div>
            <div class="info-right">
              <img width="200" :src="dataInfo.srcImage" alt="">
            </div>
          </div>
        </a-spin>
      </a-modal>
    </div>
    <div class="bottom">
    </div>
  </section>
</template>
<script>
import { getMethod, jsonHeader } from '@/utils/fetchTool'
import { API } from '@/constants/api'
import { mapGetters, mapActions } from 'vuex'
const key = 'updatable'
const columns = [
  {
    title: 'Tên',
    dataIndex: 'userName',
    width: 150
  },
  {
    title: 'Hạng',
    dataIndex: 'rank',
    width: 100,
    align: 'center'
  },
  {
    title: '???',
    dataIndex: '',
    align: 'center',
    width: 120,
    scopedSlots: { customRender: 'info' }
  },
  {
    title: 'Đấm',
    dataIndex: '',
    key: 'x',
    scopedSlots: { customRender: 'action' },
    width: 150,
    align: 'center'
  }
]
export default {
  name: 'RankRight',
  data () {
    return {
      columns,
      windowHeight: null,
      user: null,
      visible: false,
      isHiden: false,
      isLoadingInfo: false,
      listRank: null,
      dataInfo: {
        srcImage: '/static/images/shoot.png'
      },
      infoFight: ''
    }
  },
  computed: {
    ...mapGetters(['userByEmail'])
  },
  props: ['socket'],
  methods: {
    ...mapActions(['getUserByEmail']),
    fight (email) {
      if (email === this.user.email) {
        this.$message.success('Tự hủy à =))')
      } else if (this.user.profile.otherInformation.maxFight < 1) {
        this.$message.warning('Đã hết lượt khiêu chiến rồi')
      } else {
        this.$router.push({
          name: 'FightScreen',
          params: {
            type: 'rank',
            email: this.user.email,
            emailReverse: email
          }
        })
      }
    },
    handleOk () {
      this.visible = false
    },
    getRanks () {
      this.isHiden = true
      this.$message.loading({ content: 'Vui lòng đợi, chúng tôi đang tải...', key })
      fetch(API.GET_RANKS, {
        headers: jsonHeader.headers,
        method: getMethod.method
      }).then((response) => response.json())
        .then((res) => {
          if (res.code === 200) {
            this.listRank = res.data.ranks.listRank
            this.setData()
            this.$message.success({ content: 'Xong :3', key, duration: 2 })
            this.isHiden = false
          } else {
            this.$message.error({ content: 'Toang :3', key, duration: 2 })
            this.isHiden = false
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    setData () {
      for (let i = 0; i < this.listRank.length; i++) {
        this.listRank[i].key = this.listRank[i].email
      }
    },
    showModal (email) {
      this.visible = true
      this.isLoadingInfo = true
      this.getUserByEmail({
        email
      })
      setTimeout(() => {
        this.dataInfo = this.userByEmail.main
        this.isLoadingInfo = false
      }, 1000)
    },
    connectSocket () {
      this.socket.on('serverUpdateRank', (data) => {
        if (data.code === 200) {
          this.listRank = data.rank.listRank
          this.setData()
          this.infoFight = data.info
        }
      })
    }
  },
  beforeMount () {
    this.user = JSON.parse(localStorage.getItem('user'))
    this.getUserByEmail({
      email: this.user.email
    })
    this.windowHeight = window.innerHeight
    this.getRanks()
    this.connectSocket()
  }
}
</script>

<style lang="scss" scoped>
  .rank-right {
    display: flex;
    flex-direction: column;
    .top {
      height: 60px;
      min-height: 60px;
      line-height: 60px;
      text-align: center;
      span {
        color: white;
        font-size: 16px;
      }
    }
    .center {
      flex-grow: 1;
      background-color: whitesmoke;
    }
  }
  .background {
    color: white;
  }
  .disabledbutton {
    pointer-events: none;
    opacity: 0.65;
  }
</style>
