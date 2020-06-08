export const ERROR_MASSAGE = { SYSTEM_ERROR: '系统或网络异常，请稍后重试' };

export const ERROR_CODE = {
  DUPLICATE_EMAIL: {
    code: 'not_unique_error',
    massage: '邮箱已被注册',
  },
  ACTIVATED_ACCOUNT: {
    code: 'account_has_been_activated',
    message: '帐户已激活，请登录',
  },
  EXPIRED_CODE: {
    code: 'code_has_expired',
    message: '激活码已失效',
  },
  CODE_NOT_FOUND: {
    code: 'resource_not_found',
    message: '无效的激活码',
  },
};
