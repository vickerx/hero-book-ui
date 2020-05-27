<template>
  <div id="signUpModal">
    <el-button round @click="shouldShowModal = true">注册</el-button>

    <el-dialog custom-class="modal" center title="注册"
               :visible.sync="shouldShowModal" append-to-body>
      <el-form class="sign-up-form" label-width="auto"
               :model="signUpForm" :rules="rules" ref="signUpForm">
        <el-form-item prop="username">
          <el-input v-model="signUpForm.username"
                    prefix-icon="el-icon-user-solid" placeholder="昵称"/>
        </el-form-item>
        <el-form-item prop="email">
          <el-input v-model="signUpForm.email"
                    prefix-icon="el-icon-message" placeholder="邮箱"/>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="signUpForm.password" show-password @keyup.native="onPassword()"
                    type="password" prefix-icon="el-icon-lock" placeholder="密码"/>
        </el-form-item>
        <el-form-item prop="checkPassword">
          <el-input v-model="signUpForm.checkPassword"
                    type="password" prefix-icon="el-icon-lock" placeholder="确认密码"/>
        </el-form-item>
        <el-form-item class="btn-group">
          <el-button type="primary" class="btn">注册</el-button>
          <el-button class="btn">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'SignUpModal',
  data() {
    const validatePassword = (rule, value, callback) => {
      const { checkPassword, password } = this.signUpForm;
      if (checkPassword !== '' && password !== '' && checkPassword !== password) {
        callback(new Error('两次输入密码不一致!'));
      }
      callback();
    };

    const requiredNotEmptyRule = {
      type: 'string', required: true, transform: (value) => value.trim(),
    };

    return {
      shouldShowModal: false,
      signUpForm: {
        password: '',
        email: '',
        username: '',
        checkPassword: '',
      },
      rules: {
        username: [
          { ...requiredNotEmptyRule, message: '请输入昵称' },
          { min: 1, max: 20, message: '昵称长度为 1 到 20 字符' },
        ],
        email: [
          { ...requiredNotEmptyRule, message: '请输入邮箱地址' },
          { type: 'email', message: '请输入正确的邮箱地址' },
        ],
        password: [
          { required: true, message: '请输入密码' },
          { min: 8, max: 30, message: '密码长度为 8 到 30 个字符' },
        ],
        checkPassword: [
          { required: true, message: '请再次输入密码' },
          { validator: validatePassword, trigger: 'blur' },
        ],
      },
    };
  },
  methods: {
    onPassword() {
      this.signUpForm.password = this.signUpForm.password.replace(/[^(\x21-\x7f)]+/g, '');
    },
  },
};
</script>

<style scoped lang="scss">
  /deep/ .modal {
    width: 400px;
    padding: 0 20px;
  }

  .btn-group {
    /deep/ .el-form-item__content {
      display: flex;
    }

    .btn {
      flex: 1;
    }
  }
</style>
