(function (){
  const apiUrls = {
    authorize: 'https://11.71.0.131/oauth/authorize'

  };

  const request = function ({
                              url,
                              type,
                              headers = {'Context-Type': 'application/json:charset=utf-8'},
                              params,
                            }, success, fail)
  {
    // let token = 'my-token' // 获取token
    $.ajax({
      url,
      type,
      // beforeSend: function(xhr) {
      //   xhr.setRequestHeader('Authorization', 'Bearer ' + token); // 设置 Authorization 字段
      // },
      headers,
      data: params,
      dataType: "json",
      success: function (data) {
        if (success instanceof Function) {
          success(data);
        }
      },
      error: function (xhr, status, error) {
        console.log('error', error);
        if (fail instanceof Function) {
          fail(error);
        }
      }
    });
  }

   const getToken = function (callback){
     let params = {
        response_type: 'code',
        scope: 'read',
        client_id:'2bb113d04e1837eb0dd5f6aca8b6c95eNPvXqhf46ep',
        state: 'my_page',  // 客户端提供一个字符串
        redirect_uri: 'http://11.71.3.110:30262/'
      }
      request({
        url: apiUrls.authorize,
        type: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        params
      }, function (res){
        console.log('getToken res1', res);
        if (res.state === params.state) { // 校验后端返回的state是否和请求时发送的一样
          // 第一个接口 res.code

          // 第二个接口
          let params2 = {
            grant_type: 'authorization_code',
            code: res.code,
            redirect_uri: params.redirect_uri,
            client_id: params.client_id,
            client_secret: 'EODYrnTHlyfSZpBmpzZH7MTdR6c7PkCMUkqeHw2rNs'
          };

          request({
            url: apiUrls.authorize,
            type: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            },
            params: params2
          }, function (res2){
            console.log('getToken res2', res2);
            let access_token = res2.access_token;
            callback(access_token);   // 拿到token 返回
          })
        }
      })

   }

   window.getToken = getToken;
})(window)