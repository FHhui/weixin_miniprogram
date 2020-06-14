//miniprogram/pages/main/main.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */

  data: {
    imgUrls: [],
    good_list:[],

    indicatorDots: true, //小点，根据图的数量自动增加小点
    autoplay: true, //是否自动轮播
    interval: 3000, //间隔时间
    duration: 1000, //滑动时间
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中',
    })
    this.text();
    var _this = this;
    //获取云数据库的数据
    const db = wx.cloud.database()
    db.collection('good').get({
      success:res=> {
        console.log(res.data)
        this.setData({
          good_list:res.data//从云端获取的数据放入list中
        })
      }
    })
  },

  //轮播图片
  text:function(){
    var that = this;
    const db = wx.cloud.database()
    const banner = db.collection('good')
    banner.get().then(res=>{
      this.setData({
        imgUrls: res.data.image
      })
    })
    .catch(err=> {
      console.log(err)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }

})