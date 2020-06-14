const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  db: undefined,
  buygood: undefined,
  data: {
    open: '',
    buyID: '',
    GoodID: '',
    GoodsIDs: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    //  调用login云函数获取openid
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.cloud.init({
          env: 'minicloud'
        })
        that.db = wx.cloud.database()
        that.buygood = that.db.collection('buygood')
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
        wx.navigateTo({
          url: '../deployFunctions/deployFunctions',
        })
      }
    })

  },

  //获取用户openid
  getOpenid() {
    let that = this;
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: res => {
        console.log('云函数获取到的openid: ', res.result.openId)
        var openid = res.result.openId;
        that.setData({
          openid: openid
        })
      }
    })
  },

  // 单击“购买”按钮调用该函数
  toBuy: function () {
    var that = this
    this.buygood.add({
      // data 字段表示需新增的 JSON 数据
      data: {
        GoodID: that.data.GoodID,
        buyID: this.getOpenid(),
      },

      //  数据插入成功，调用该函数
      success: function (res) {
        console.log(res)
        wx.showModal({
          title: '  ',
          content: '购买成功',
          showCancel: false
        })
        that.setData({
          GoodID: ''
        })
      }
    })
  },

  //  单击“查询已购商品”按钮执行函数
  queryData: function () {
    var that = this
    //  根据记录ID搜索数据集  
    buyID = this.getOpenid(),
      this.db.collection('buygood').doc(this.data.buyID).get({
        // 找到记录集调用
        success: function (res) {
          //  将查询结果显示在页面上  
          that.setData({
            GoodIDs: res.data.GoodID
          })

        },
        //  未查到数据时调用
        fail: function (res) {
          wx.showModal({
            title: '错误',
            content: '没有找到记录',
            showCancel: false
          })
        }
      })

  },
  //  下面的函数用于当更新input组件中的值时同时更新对应变量的值
  bindKeyInputGoodID: function (e) {
    this.setData({
      GoodID: e.detail.value
    })
  },
  bindKeyInputId: function (e) {
    this.setData({
      buyID: e.detail.value
    })
  },

})