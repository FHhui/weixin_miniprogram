// pages/edit/edit.js
wx.cloud.init()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:"",
    campus:"",
    comment:[],
    credit_score:8,
    university:"",
    isAdd:false,
    openid:"",
  },
  // 获取用户openid
  onGetOpenid: function () {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        // db.collection('user').where({
        //   address:"ac"
        // }).remove()      

        // db.collection('user').doc('ab79f8175ee4c18900096f60651562b9').remove({
        //   success: res => {
        //     //console.log('删除成功')
        //   }
        // })    
        //this.onGetOpenid()
        db.collection('user').add({
          data: {
            address: this.data.address,
            campus: this.data.campus,
            comment: this.data.comment,
            credit_score: this.data.credit_score,
            university: this.data.university,
          }
        })
        this.setData({
          isAdd: true
        })    
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      isAdd:false
    })
    //this.onGetOpenid()
  },
  address_input:function(e){
    this.setData({
      address: e.detail.value
    })
  },
  university_input: function (e) {
    this.setData({
      university: e.detail.value
    })
  },
  campus_input: function (e) {
    this.setData({
      campus: e.detail.value
    })
  },

  save:function(){
    this.setData({
      isAdd: true
    })
    //this.onGetOpenid()
    db.collection('user').add({
      data: {
        address:this.data.address,
        campus:this.data.campus,
        comment:this.data.comment,
        credit_score:this.data.credit_score,
        university:this.data.university,     
      }
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