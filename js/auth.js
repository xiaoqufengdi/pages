(function (){
  const apiUrls = {
    authorize: 'https://11.71.0.131/oauth/authorize'
      // '?response_type=code
    // &scope=read&
    // client_id=2bb113d04e1837eb0dd5f6aca8b6c95eNPvXqhf46ep
    // &redirect_uri=http%3A%2F%2F11.71.3.110%3A30262%2F&state=d35fdaeb735fc3bb485a529e63eba30cDbIMxaL7g0B_idp
  };

  const request = function ({
                              url,
                              type,
                              headers = {'Context-Type': 'application/json:charset=utf-8'},
                              params,
                            }, success, fail)
  {
    let token = 'my-token' // 获取token
    $.ajax({
      url,
      type,
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + token); // 设置 Authorization 字段
      },
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

   let getAuthorize = function (callback){
      let params = {
        response_type: code,
        scope: 'read',
        client_id:'2bb113d04e1837eb0dd5f6aca8b6c95eNPvXqhf46ep',
        redirect_uri: 'http%3A%2F%2F11.71.3.110%3A30262%2F&state=d35fdaeb735fc3bb485a529e63eba30cDbIMxaL7g0B_idp'
      }






   }

})(window)