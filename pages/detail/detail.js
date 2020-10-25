// pages/detail/detail.js
//获取应用实例  里面的globalData属性是一个保存着全局变量的对象
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    info:{},
    reviews:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    let id=options.id  //options是navigator组件中通过url传递的参数对象
    wx.request({
      url: 'https://api.zhuishushenqi.com/book/' + id,
      method:'GET',
      success:res=>{
        //console.log(res.data)
        this.setData({
          info:res.data
        })
        //动态设置标题栏文本
        wx.setNavigationBarTitle({
          title:app.globalData.sitename+res.data.title,
        })
      }
    })

    //获取书籍评论列表
    wx.request({
      url: 'https://api.zhuishushenqi.com/post/review/by-book',
      data:{
        book:id,
        sort:'created',
        start:0,
        limit:20
      },
      method:'GET',
      success:res=>{
        //console.log(res.data.reviews);
        this.setData({
            reviews:res.data.reviews
        })
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