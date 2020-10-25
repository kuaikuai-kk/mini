//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    epub:[],
  },
  //事件处理函数
  bindViewTap: function() {
   
  },
  onLoad: function () {
    //获取最新推荐的图书分类
    wx.request({
      url: 'https://api.zhuishushenqi.com/ranking/gender',
      method:'GET',
      success:res=>{
        //console.log(res.data);
        let epub=res.data.epub
        //临时数组
        let data=[];
        //依次获取每个分类的图书列表
        for(let n=0;n<epub.length;n++){
          wx.request({
            url:'https://api.zhuishushenqi.com/ranking/' + epub[n]._id,
            method:'GET',
            success:res=>{
              let object = {};
              object.title = epub[n].title;
              object.books = res.data.ranking.books;
              data.push(object);
               console.log(data);
              this.setData({
                epub:data
              });
            }
          })
        }
      }
    })

    wx.request({
      url: 'url',
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
