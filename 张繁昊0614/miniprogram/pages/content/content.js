//index.js
//获取应用实例
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    winWidth: 0,
    winHeight: 0,
    currentTab: 0,
    currentSelect: 1,
    items: [{
      'image': "/images/pot.jpg",
      'name': '锅',
      'price': '998.00',
      'title': '一锅在手，天下我有。',
      'type': 'true'
    },
    {
      'image': "/images/bowl.jpg",
      'name': '碗',
      'price': '188.00',
      'title': '天大地大，吃饭最大。',
      'type': 'false'

    },
    {
      'image': "/images/spoon.jpg",
      'name': '瓢',
      'price': '2.00',
      'title': '想不出来，自己体会。',
      'type': 'false'
    }

    ]
  },
  onLoad: function () {
    var that = this;

    /** 
     * 获取系统信息 
     */
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    }),
      wx.setNavigationBarTitle({
        title: '发布详情',
      })

  },

  /** 
     * 滑动切换tab 
     */
  bindChange: function (e) {

    var that = this;
    that.setData({ currentTab: e.detail.current });

  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (e) {

    var that = this;

    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current
      })
    }
  }
})
