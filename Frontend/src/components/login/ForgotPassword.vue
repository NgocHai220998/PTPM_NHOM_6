<template>
  <section class="forgot-password">
    <div class="forgot-password-box">
      <a-form class="forgot-password-form"
        :form="form"
        @submit="handleSubmit"
      >
        <h2 style="padding-top: 0; text-align: center; text-transform: uppercase; font-weight: 500;">{{ $t('login.title-forgot-password') }}</h2>
        <p class="forgot-password-warning">
          <a-icon style="color: #faad14; font-size: 24px; position: absolute; top: 12px; left: 15px  " class="warning-icon" type="info-circle-o"/>
          <span style="">{{ $t('login.text-warning') }}</span>
          <span style="display: block">{{ homeUrl }}</span>
        </p>
        <a-spin :spinning="loadingGetCode" :delay="0">
          <a-input-search v-model="email" placeholder="Email" @search="onSearch" size="large">
            <a-button style="background-color: #007ADD; color: white;" slot="enterButton">Get code</a-button>
          </a-input-search>
        </a-spin>
        <a-form-item
        >
          <a-input
            v-decorator ="[
              'email_code',
              {
                rules: [
                  { required: true, message: $t('login.required-email-code') }
                ]
              }
            ]"
            :placeholder="$t('login.placeholder-email-code')"
            class="email-code"
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
            :placeholder="$t('login.placeholder-password')"
            type='password'
          />
        </a-form-item>
        <a-form-item
        >
          <a-input
            v-decorator ="[
              'pwRepeat',
              {
                rules: [
                  { required: true, message: $t('login.required-repassword') },
                  { validator: compareToFirstPassword }
                ]
              }
            ]"
            :placeholder="$t('login.placeholder-repassword')"
            type='password'
          />
        </a-form-item>
        <a-form-item class="btn-submit-forgot-password">
          <a-spin :spinning="loading" :delay="0" class="spin-button">
            <a-button class="forgot-password-button" type="primary" htmlType="submit">{{ $t('login.btn-forgot-password') }}</a-button>
          </a-spin>
        </a-form-item>
        <a-form-item style="text-align: right;">
          <span style="padding-right: 10px;" class="signin-forgot">Bạn đã nhớ ra mật khẩu? </span>
          <router-link :to="{ name: 'Login' }" class="signin-forgot signup-already-member">
            {{ $t('login.btn-login') }}
          </router-link>
        </a-form-item>
      </a-form>
    </div>
  </section>
</template>

<script>

import userService from '@/utils/userServices'
import { postMethod, jsonHeader } from '@/utils/fetchTool'
import { hash256 } from '@/utils/common'
import { API } from '@/constants/api'

export default {
  name: 'ForgotPasswordComponent',
  data () {
    return {
      loading: false,
      email: '',
      homeUrl: 'https://game-language.herokuapp.com',
      form: this.$form.createForm(this),
      emailCode: 0,
      loadingGetCode: false
    }
  },
  methods: {
    compareToFirstPassword (rule, value, callback) {
      const form = this.form
      if (value && value !== form.getFieldValue('password')) {
        callback(new Error(this.$t('login.warning-check-repassword')))
      } else {
        callback()
      }
    },
    onSearch () {
      this.loadingGetCode = true
      fetch(API.GET_CODE, {
        headers: jsonHeader.headers,
        method: postMethod.method,
        body: JSON.stringify({
          email: this.email
        })
      }).then((response) => response.json())
        .then((res) => {
          if (res.code === 200) {
            const message = res.data.message ? res.data.message : 'Success!'
            this.$message.success(message)
          } else if (res.code === 430) {
            const message = res.data.message ? res.data.message : 'Email is a required field!'
            this.$message.error(message)
          } else if (res.code === 451) {
            const message = res.data.message ? res.data.message : 'Send mail fail!'
            this.$message.error(message)
          } else if (res.code === 401) {
            const message = res.data.message ? res.data.message : 'Email is not registered!'
            this.$message.error(message)
          } else {
            const message = res.data.message ? res.data.message : 'Email does not exist!'
            this.$message.error(message)
          }
          this.loadingGetCode = false
        })
        .catch((err) => {
          console.log(err)
        })
    },
    handleSubmit (e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          this.loading = true
          const hideLoading = this.$message.loading('Đang thực hiện yêu cầu..', 0)
          const password = (values.password.length > 1024) ? hash256(values.password.substring(0, 1024)) : hash256(values.password)
          fetch(API.FORGOT_PASSWORD, {
            headers: jsonHeader.headers,
            method: postMethod.method,
            body: JSON.stringify({
              email: this.email,
              password: password,
              emailCode: values.email_code
            })
          }).then((response) => response.json())
            .then((res) => {
              hideLoading()
              if (res.code === 200) {
                const message = res.data.message ? res.data.message : 'Success!'
                this.$message.success(message)
                this.$router.push({ name: 'Login' })
              } else if (res.code === 451) {
                const message = res.data.message ? res.data.message : 'Code does not match or has expired!'
                this.$message.error(message)
              } else if (res.code === 401) {
                const message = res.data.message ? res.data.message : 'Forgot password fail!'
                this.$message.error(message)
              } else {
                const message = res.data.message ? res.data.message : 'Something is not right'
                this.$message.error(message)
              }
              this.loading = false
            })
            .catch((err) => {
              console.log(err)
            })
        }
      })
    }
  },
  beforeMount () {
    const user = localStorage.getItem('user')
    const isLogin = userService.verify(JSON.parse(user))
    if (isLogin) {
      this.$router.push({ name: 'HomeScreen' })
    }
  }
}
</script>

<style lang="scss" scoped>
  .forgot-password {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: 0 auto;
    margin-top: 40px;
    transform: translate(-50%, -50%);
    .forgot-password-box {
      width: 468px;
      border-radius: 20px;
      background-color: white;
      padding: 50px;
      .forgot-password-form {
        .forgot-password-warning {
          position: relative;
          background-color: #fcf6d7;
          text-align: center;
          padding: 10px 0px 10px 0px;
          span {
            color: rgba(0,0,0,0.65)
          }
          border-radius: 5px;
        }
        .btn-submit-forgot-password {
          .spin-button {
            width: 100%;
            text-align: center;
            .forgot-password-button {
              width: 100%;
            }
          }
        }
      }
    }
  }
  @media screen and (max-width: 575px) {
    .forgot-password {
      width: 100%;
      .forgot-password-box{
        box-shadow: none;
        width: 100% !important;
        .forgot-password-warning {
          .warning-icon {
            display: none;
          }
          span {
            font-size: 12px;
          }
        }
        .forgot-password-form {
          width: 90%;
        }
      }
    }
  }
</style>
