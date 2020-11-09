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
            <a-button class="login-button" type="primary" htmlType="submit">{{ $t('login.btn-login') }}</a-button>
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
  </section>
</template>

<script>
import { postMethod, jsonHeader } from '@/utils/fetchTool'
import userService from '@/utils/userServices'
import { hash256 } from '@/utils/common'
import { API } from '@/constants/api'

export default {
  name: 'LoginComponent',
  data () {
    return {
      loading: false,
      homeUrl: 'https://game-language.herokuapp.com',
      form: this.$form.createForm(this)
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
              if (res.code === 200) {
                // localStorage.setItem('user', JSON.stringify(res.data.user))
                const message = res.data.message ? res.data.message : 'Success!'
                this.$message.success(message)
                // setTimeout(() => {
                //   window.location.reload()
                // }, 0)
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
  .login {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: 0 auto;
    margin-top: 80px;
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
