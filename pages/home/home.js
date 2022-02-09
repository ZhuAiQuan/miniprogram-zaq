// 获取应用实例
const app = getApp();

Page({
  data: {
    form: {
      account: '',
      password: ''
    },
    localtion: {
      latitude: 0,
      longitude: 0
    },
    now: {
      cloud: '',
      dew: '',
      feelsLike: '',
      humidity: '',
      icon: '',
      obsTime: '',
      precip: '',
      pressure: '',
      temp: '',
      text: '',
      vis: '',
      wind360: '',
      windDir: '',
      windScale: '',
      windSpeed: ''
    },
    address: {
      adm2: '',
      name: ''
    }
  },
  onSubmit() {
    
  },
  onLoad() {
    this.getNowWeather();
    this.getGeolation()
  },
  // 获取当前实时天气
  getNowWeather() {
    app.request('GET', `https://devapi.qweather.com/v7/weather/now?location=${app.globalData.longitude},${app.globalData.latitude}`).then((res) => {
      const now = {};
      for (const item in res.now) {
        now[item] = res.now[item]
      }
      
      const time = new Date(now.obsTime)
      const y = time.getFullYear();
      const m = time.getMonth() + 1 > 9 ? time.getMonth() + 1 : `0${time.getMonth() + 1}`;
      const d = time.getDate() > 9 ? time.getDate() : `0${time.getDate()}`;
      const h = time.getHours() > 9 ? time.getHours() : `0${time.getHours()}`;
      const M = time.getMinutes() > 9 ? time.getMinutes() : `0${time.getMinutes()}`;
      const s = time.getSeconds() > 9 ? time.getSeconds() : `0${time.getSeconds()}`;
      now.obsTime = `${y}-${m}-${d} ${h}:${M}:${s}`;
      this.setData({
        now,
      });
    }).catch(err => {
      console.log(err)
    })
  },
  // 获取定位信息
  getGeolation() {
    app.request('GET', `https://geoapi.qweather.com/v2/city/lookup?location=${app.globalData.longitude},${app.globalData.latitude}`).then(res => {
      if (+res.code !== 200) return
      const { adm2, name } = res.location[0];
      const address = {
        adm2, name
      };
      this.setData({
        address
      })
    })
  }
})