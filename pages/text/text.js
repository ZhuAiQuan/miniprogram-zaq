const app = getApp();

Page({
  data: {},
  getData() {
    app.request('GET', 'https://api.wangpinpin.com/unAuth/getEveryDayText', 'nokey').then(res => {
      if (!res.code) {
        const { author, content, title, id } = res.data
        this.setData({
          author,
          content,
          title,
          id
        })
      }
    })
  },
  onLoad() {
    this.getData()
  }
})