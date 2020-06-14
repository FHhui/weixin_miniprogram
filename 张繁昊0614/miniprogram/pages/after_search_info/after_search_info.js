// pages/after_search_info/after_search_info.js
Page({

  /**
   * 页面的初始数据
   */


  data: {
    alldataList:[],
    dataList: [],
    searchinfo: "请输入搜索信息",
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(searchinfo) {
    var that = this;
    wx.cloud.init({
      env: 'shj-zirgw',
      traceUser: true
    });
    const db = wx.cloud.database()
    const good = db.collection('good')
    good.get({
      success: res => {
        console.log(res.data)
        that.setData({
          alldataList: res.data
        })
      }
    });
    this.search(searchinfo);
  },
  search:function(search_info){
    var b=0;
    for (var a=0;a<alldataList.length;a++){
        if(alldataList[a].goodname.indexof(search_info)){
          dataList[b]=alldataList[a];
        }
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})