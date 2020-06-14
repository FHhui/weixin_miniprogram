// pages/index/index.js
wx.cloud.init()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //用户个人信息
    userInfo: {
      avatarUrl: "",//用户头像
      nickName: "",//用户昵称
    },
    score: 8,
    address:'',
    university:'',
    campus:'',
    openid:"",
    comment1: '暂无评论',
    comment2: '暂无评论',
    comment3: '暂无评论',
    comment4: '暂无评论',
    comment5: '暂无评论',
  },
  // 获取用户openid，获取用户个人详细信息
  onGetOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      //data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        // this.setData({
        //   openid=res.result.openid,
         
        // })
        db.collection("user").where({
          //_openid:"oSN9a5OZAjGQfBI2fHMr0dFJWjeQ",
          _openid: res.result.openid
        }).get().then(resu => {
          //console.log(res.data[0].address)
          //console.log("评论：", resu.data[0].comment[0])
          this.setData({
            score: resu.data[0].credit_score,
            address: resu.data[0].address,
            university: resu.data[0].university,
            campus: resu.data[0].campus,
            //comments:resu.data[0].campus,
            comment1: resu.data[0].comment[0]+'。',
            comment2: resu.data[0].comment[1]+'。',
            comment3: resu.data[0].comment[2]+'。',
            comment4: resu.data[0].comment[3]+'。',
            comment5: resu.data[0].comment[4]+'。',           
          })
          if(this.data.comment5=='。'){
            this.data.comment5='暂无评论';
          } 
          // if (this.data.comment2 == '。') {
          //   comment2: '暂无评论'
          // } if (this.data.comment3 == '。') {
          //   comment3: '暂无评论'
          // } if (this.data.comment4 == '。') {
          //   comment4: '暂无评论'
          // } if (this.data.comment5 == '。') {
          //   comment5: '暂无评论'
          // }
        })
       // return res.result.openid;
      },
      // fail: err => {
      //   //console.error('[云函数] [login] 调用失败', err)
      // }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
    var that = this;
    /**
     * 获取用户头像昵称信息
     */
    wx.getUserInfo({
      success: function (res) {
        var avatarUrl = 'userInfo.avatarUrl';
        var nickName = 'userInfo.nickName';
        that.setData({
          [avatarUrl]: res.userInfo.avatarUrl,
          [nickName]: res.userInfo.nickName,
        })
      }
    })
    this.onGetOpenid()
   // this.getMessage()    
  },
  

  // getMessage(){
  //   openid:this.onGetOpenid()
  //   //console("open:"+openid)
  //   //console.log(this.data.openid)
  //   console.log("123456789")
  //   console.log("open:",this.onGetOpenid())
  //   db.collection("user").where({
  //      //_openid:"oSN9a5OZAjGQfBI2fHMr0dFJWjeQ",
  //     //_openid:this.data.openid+''
  //     _openid:this.onGetOpenid()
  //   }).get().then(res=>{
  //     //console.log(res.data[0].address)
  //     this.setData({
  //      score : res.data[0].credit_score,
  //      address :res.data[0].address,
  //      university :res.data[0].university,
  //      campus :res.data[0].campus
  //     })
  //   })
  // },

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