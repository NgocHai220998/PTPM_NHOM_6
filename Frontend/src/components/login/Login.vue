<template>
  <section class="login">
    <div class="login-box">
      <a-form class="login-form"
        :form="form"
        @submit="handleSubmit"
      >
        <h2 style="padding-top: 0; text-align: center; text-transform: uppercase; font-weight: 500;">{{ $t('login.title-login') }}</h2>
        <p class="login-warning">
          <a-icon style="color: #faad14; font-size: 24px; position: absolute; top: 12px; left: 15px  " class="warning-icon" type="info-circle-o"/>
          <span style="">{{ $t('login.text-warning') }}</span>
          <span style="display: block">{{ homeUrl }}</span>
        </p>
        <a-form-item
        >
          <a-input
            v-decorator ="[
              'email',
              {
                rules: [
                  { required: true, message: $t('login.required-email') },
                  { type: 'email', message: $t('login.invalid-email') }
                ]
              }
            ]"
            :placeholder="$t('login.placeholder-email')"
          />
        </a-form-item>
        <a-form-item
        >
          <a-input
            v-decorator ="[
              'password',
              {
                rules: [
                  { required: true, message: $t('login.required-password') },
                  { min: 6, message: $t('login.err-length-password') }
                ]
              }
            ]"
            type='password'
            :placeholder="$t('login.placeholder-password')"
          />
        </a-form-item>
        <a-form-item class="btn-submit-login">
          <a-spin :spinning="loading" :delay="0" class="spin-button">
            <a-button class="login-button" type="primary" htmlType="submit"><a-icon type="login" />{{ $t('login.btn-login') }}</a-button>
          </a-spin>
        </a-form-item>
        <a-form-item class='login-bottom'>
          <div>
            <router-link :to="{ name: 'Register' }" class="signin-signup">{{ $t('login.btn-signup') }}</router-link>
          </div>
          <div>
            <router-link :to="{ name: 'ForgotPassword' }" class="signin-forgot">
            {{ $t('login.btn-forgot-password') }}?
            </router-link>
          </div>
        </a-form-item>
      </a-form>
    </div>
    <div>
      <a-modal
        title="Bạn muốn chọn nhân vật nào?"
        :visible="visibleMain"
        @ok="handleOkMain"
        :confirmLoading="confirmLoading"
        @cancel="handleCancelMain"
      >
        <a-radio-group name="radioGroup" v-model="valueMain" :defaultValue="'attack'">
          <a-radio title="Đấu sĩ: Chém và tỷ lệ chống đỡ cao!" :value="'attack'">
            <img width="100" src="/static/images/attack.png" alt="attack">
            <div style="text-align: center">
              <span>Đấu sĩ</span>
            </div>
          </a-radio>
          <a-radio title="Nhẫn giả: Chém và tỷ lệ né đòn cao!" :value="'ninja'">
            <img width="100" src="/static/images/ninja.png" alt="attack">
            <div style="text-align: center">
              <span>Nhẫn giả</span>
            </div>
          </a-radio>
          <a-radio title="Xạ thủ: Bùm :) và tỷ lệ chí mạng cao!" :value="'shoot'">
            <img width="140" src="/static/images/shoot.png" alt="attack">
            <div style="text-align: center">
              <span>Xạ thủ</span>
            </div>
          </a-radio>
        </a-radio-group>
        <div style="max-width: 300px; margin: 30px auto 5px auto;" class="name-main">
          <label>Tên nhân vật:</label>
          <a-input placeholder="Tên nhân vật" v-model="userName" ref="userNameInput">
            <a-icon slot="prefix" type="user" />
            <a-tooltip slot="suffix" title="Tên phải có ít nhất 3 ký tự và nhiều nhất là 14 ký tự">
              <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
            </a-tooltip>
          </a-input>
        </div>
        <span slot="okText"><a-icon type="enter" /> Chọn</span>
        <span slot="cancelText"><a-icon type="rollback" /> Thôi</span>
      </a-modal>
    </div>
  </section>
</template>

<script>
import { postMethod, jsonHeader } from '@/utils/fetchTool'
import userService from '@/utils/userServices'
import { hash256 } from '@/utils/common'
import { API } from '@/constants/api'
import dataFg from '@/constants/dataFigure'

export default {
  name: 'LoginComponent',
  data () {
    return {
      loading: false,
      homeUrl: 'https://game-language.herokuapp.com',
      form: this.$form.createForm(this),
      visibleMain: false,
      valueMain: 'attack',
      confirmLoading: false,
      userName: '',
      isCreateMain: false,
      user: null
    }
  },
  methods: {
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true
          const hideLoading = this.$message.loading('Đang thực hiện yêu cầu..', 0)
          const password = (values.password.length > 1024) ? hash256(values.password.substring(0, 1024)) : hash256(values.password)
          fetch(API.LOGIN, {
            headers: jsonHeader.headers,
            method: postMethod.method,
            body: JSON.stringify({
              email: values.email,
              password: password
            })
          }).then((response) => response.json())
            .then((res) => {
              hideLoading()
              console.log(res)
              if (res.code === 200) {
                this.loading = false
                this.user = res.data.user
                const message = res.data.message ? res.data.message : 'Success!'
                this.$message.success(message)
                if (this.user.isCreateMain) {
                  localStorage.setItem('user', JSON.stringify(this.user))
                  this.$router.push({
                    name: 'HomeScreen'
                  })
                } else {
                  this.visibleMain = true
                }
                this.visibleServer = true
                this.loading = false
              } else if (res.code === 405) {
                const message = res.data.message ? res.data.message : 'Email is not registered!'
                this.$message.error(message)
              } else if (res.code === 411) {
                const message = res.data.message ? res.data.message : 'Incorrect password!'
                this.$message.error(message)
              } else if (res.code === 406) {
                const message = res.data.message ? res.data.message : 'Please! check your email to confirm!'
                this.$message.error(message)
              } else {
                this.$message.error('Something is not right!')
              }
              this.loading = false
            })
            .catch((err) => {
              console.log(err)
            })
        }
      })
    },
    handleOkMain () {
      if (this.userName.length < 3) {
        this.$message.error('Tên nhân vật phải lớn hơn 3 ký tự')
      } else if (this.userName.length > 14) {
        this.$message.error('Tên nhân vật phải nhỏ hơn 14 ký tự')
      } else {
        let kind = null
        if (this.valueMain === 'attack') {
          kind = dataFg.attack
        } else if (this.valueMain === 'shoot') {
          kind = dataFg.shoot
        } else {
          kind = dataFg.ninja
        }
        fetch(`${API.CREATE_MAIN}/${this.user.email}`, {
          headers: jsonHeader.headers,
          method: postMethod.method,
          body: JSON.stringify({
            token: this.user.token,
            main: {
              userName: this.userName,
              ...kind
            }
          })
        }).then((response) => response.json())
          .then((res) => {
            if (res.code === 200) {
              localStorage.setItem('user', JSON.stringify(res.data.user))
              const message = res.data.message ? res.data.message : 'Create the main successfully!'
              this.$message.success(message)
              this.$router.push({
                name: 'HomeScreen'
              })
            } else if (res.code === 400) {
              const message = res.data.message ? res.data.message : 'token is a required field!'
              this.$message.error(message)
            } else if (res.code === 410) {
              const message = res.data.message ? res.data.message : 'main is a required field!'
              this.$message.error(message)
            } else if (res.code === 404) {
              const message = res.data.message ? res.data.message : 'user not found!'
              this.$message.error(message)
            } else {
              this.$message.error('Unable to save user!')
            }
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    handleCancelMain () {
      this.visibleMain = false
    }
  },
  beforeMount () {
    const user = JSON.parse(localStorage.getItem('user'))
    const isLogin = userService.verify(user)
    localStorage.setItem('preRouterName', 'Login')
    if (isLogin) {
      this.$router.push({ name: 'HomeScreen' })
    }
  }
}
</script>

<style lang="scss" scoped>
  .login {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: 0 auto;
    transform: translate(-50%, -50%);
    .login-box {
      width: 468px;
      border-radius: 20px;
      background-color: white;
      padding: 50px;
      .login-form {
        .login-warning {
          position: relative;
          background-color: #fcf6d7;
          text-align: center;
          padding: 10px 0px 10px 0px;
          span {
            color: rgba(0,0,0,0.65)
          }
          border-radius: 5px;
        }
        .btn-submit-login {
          .spin-button {
            width: 100%;
            text-align: center;
            .login-button {
              width: 100%;
            }
          }
        }
      }
    }
  }

  @media screen and (max-width: 575px) {
    .login {
      width: 100%;
      .login-box{
        box-shadow: none;
        width: 100% !important;
        .login-warning {
          .warning-icon {
            display: none;
          }
          span {
            font-size: 12px;
          }
        }
        .login-form{
          width: 90%;
        }
      }
    }
  }
</style>
