export const ERROR_MESSAGE = { SYSTEM_ERROR: '系统或网络异常，请稍后重试' };

export const ERROR_CODE = {
  DUPLICATE_EMAIL: {
    code: 'not_unique_error',
    message: '邮箱已被注册',
  },
  NOT_ACTIVATED_ACCOUNT: {
    code: 'account_has_not_been_activated',
    message: '邮箱未激活，请前往邮箱激活帐户或重新发送激活邮件',
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
  EMAIL_NOT_FOUND: {
    code: 'resource_not_found',
    message: '邮箱未注册，请先注册',
  },
};
