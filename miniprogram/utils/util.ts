export const formatTime = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

const formatNumber = (n: number) => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}

export const login = () => {
  return new Promise(async (resolve, reject) => {
    try {
      // 1. 获取微信临时code
      const { code } = await wxLogin()

      // 2. 获取用户信息
      const userInfo = await getUserProfile()

      resolve({ code, userInfo })
    } catch (error) {
      reject(error)
    }
  })
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
