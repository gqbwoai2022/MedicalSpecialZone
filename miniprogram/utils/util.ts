type LoginResult = {
  code: string;
  userInfo: any;
}


// 使用独立函数代替对象方法
export const silentLogin = async (): Promise<string> => {
  const res = await wxLogin()
  return res.code
}

export const fullLogin = async (): Promise<LoginResult> => {
  try {
    // 先获取用户信息（必须在点击事件同步上下文中）
    const userInfo = await getUserProfile();
    // 再静默获取code
    const code = await silentLogin()

    return { code, userInfo }
  } catch (error) {
    throw new Error(`登录失败：${error.errMsg}`)
  }
}

const wxLogin = () => {
  return new Promise((resolve, reject) => {
    wx.login({
      success: resolve,
      fail: reject
    })
  })
}

const getUserProfile = () => {
  return new Promise((resolve, reject) => {
    wx.getUserProfile({
      desc: '用于完善会员信息',
      success: (res) => resolve(res.userInfo),
      fail: (err) => reject(err)
    })
  })
}
