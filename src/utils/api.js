const API_HOST = 'http://gl.luoyangjinmei.com/webapi/ApiTest.ashx';
const API_WX = 'http://wx.luoyangjinmei.com/getWxinter2.ashx';



export const Resource = {
    getWx: `${API_WX}`,//微信授权
    getcheckcode: `${API_HOST}?method=getcheckcode`,//登陆接口
    CourierDind: `${API_HOST}?method=CourierDind`,//绑定微信信息
    CourierLogin: `${API_HOST}?method=CourierLogin`,//微信用户登陆
    getdeliverylistpage: `${API_HOST}?method=getdeliverylistpage`,//获取快递员记录列表(分页)（已领取2，未领取1）（快递员ID登陆信息需要可以存储）
    getboxtypeinfos: `${API_HOST}?method=getboxtypeinfos`,//获取柜子对应的所有箱型信息
    couriopenbox: `${API_HOST}?method=couriopenbox`,//开箱动作
    deliverysuccess: `${API_HOST}?method=deliverysuccess`,//快递员录入投递单号+手件人手机号 完成投递接口
    changephonetoresendmsg: `${API_HOST}?method=changephonetoresendmsg`,//记录，投递记录内->修改手机号
    resendmsg: `${API_HOST}?method=resendmsg`,//记录，投递记录内->重发短信
    isexistpickuser: `${API_HOST}?method=isexistpickuser`,//10.用户微信绑定检测
    isexistphone: `${API_HOST}?method=isexistphone`,//普通用户手机号判断
    userregist: `${API_HOST}?method=userregist`,//普通用户注册
    getpickuplistpage: `${API_HOST}?method=getpickuplistpage`,//获取用户记录列表(分页)
    pickupsuccess: `${API_HOST}?method=pickupsuccess`,//用户取件（无付费）
    pickupbycourier: `${API_HOST}?method=pickupbycourier`,//15.快递员取回快递
    mnweixininfo: `${API_HOST}?method=mnweixininfo`,//微信认证
    getexpcompany: `${API_HOST}?method=getexpcompany`,//返回快递公司
    setcourierexpname: `${API_HOST}?method=setcourierexpname`,//设置快递员和公司
    getdeliverylistpage: `${API_HOST}?method=getdeliverylistpage`,//设置快递员和公司
    getpayloginfo: `${API_HOST}?method=getpayloginfo`,//19.快递员充值消费记录
    getpayloginfoforuser: `${API_HOST}?method=getpayloginfoforuser`,//20.普通用户消费记录
  }