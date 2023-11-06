$(document).ready(function () { // 文档加载完
  const baseUrl = '';  // 基础（ip+端口）地址 例如  http://11.71.250.15:84
  const apiUrls = {
    searchTank: `${baseUrl}/api/tank/searchTank`,  // 请求储罐列表
    addTank: `${baseUrl}/api/tank/addTank`,  // 新增
    deleteTank: `${baseUrl}/api/tank/delTank`, // 删除
    updateTank: `${baseUrl}/api/tank/updateTank`, // 更新
    upload: `${baseUrl}/api/tank/upload`,         // 上传
    down: `${baseUrl}/api/tank/down`               // 导出
  };

  const loginUrl = 'http://11.71.250.15:84/webPlatformGDWZ/XJYTGDYZCGL/Webpt_LogoutSuccess'; // 登录地址
  let token = '';

  const request = function ({
                              url,
                              type,
                              headers = {'Context-Type': 'application/json:charset=utf-8'},
                              params,
                            }, success, fail)
  {
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
        if(xhr.status === 403) { // 没有登录，跳转登录页面
          $.messager.alert('提示','用户未登录，将跳转登录页！','info');
          window.location.href = loginUrl;
          return;
        }
        if (fail instanceof Function) {
          fail(error);
        }
      }
    });
  }

  const requestFile = function ({
                              url,
                              type,
                              params,
                            }, success, fail)
  {
    $.ajax({
      url,
      type,
      beforeSend: function(xhr) {
        xhr.setRequestHeader('Authorization', 'Bearer ' + token); // 设置 Authorization 字段
      },
      processData: false,
      contentType: false,
      data: params,
      success: function (data) {
        if (success instanceof Function) {
          success(data);
        }
      },
      error: function (xhr, status, error) {
        console.log('error', error);
        if(xhr.status === 403) { // 没有登录，跳转登录页面
          $.messager.alert('提示','用户未登录，将跳转登录页！','info');
          window.location.href = loginUrl;
          return;
        }
        if (fail instanceof Function) {
          fail(error);
        }
      }
    });
  }

  let pageNum = 1;
  let pageSize = 10;
  let tankDialog = null;
  const OPERATOR_TYPE = {
    ADD: 'add',
    REVISE: 'revise'
  };
  let currentOperator = OPERATOR_TYPE.ADD;

  let self = this;


  // 重置查询条件
  $('#tankReset').click(function () {
    $('#no').textbox('setText', '');
    $('#depName').textbox('setText', '');
    $('#stationName').textbox('setText', '');
  })
  // 绑定查询响应函数
  $('#tankSearch').click(function () {
    query();
  })

  // 查询
  function query() {
    let params = {
      pageNum,
      pageSize
    }
    let no = $('#no').textbox('getText');
    if (no) {
      params.no = no;
    }
    let depName = $('#depName').textbox('getText');
    if (depName) {
      params.depName = depName;
    }
    let stationName = $('#stationName').textbox('getText');
    if (stationName) {
      params.stationName = stationName;
    }
    console.log(no, depName, stationName);
    // TOD0: 调查询接口
    request({
      url: apiUrls.searchTank,
      type: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      params,
    }, function (res) {
      console.log(res);
      let content = res.content || { total: 0, list: []};
      loadData(content);
    })

    // test code
    // let res = {
    //   "total": 4,
    //   "rows": [
    //     {
    //       "createBy": null,
    //       "createTime": null,
    //       "updateBy": null,
    //       "updateTime": null,
    //       "remark": null,
    //       "id": 1,
    //       "no": "1",
    //       "depName": "百口泉采油厂",
    //       "stationName": "注输联合站",
    //       "processSystem": "原油处理系统",
    //       "name": "1#净化油罐",
    //       "year": "1997",
    //       "material": "碳钢",
    //       "volume": "3000",
    //       "workingMedium": "净化油",
    //       "type": "原油处理罐"
    //     },
    //     {
    //       "createBy": null,
    //       "createTime": null,
    //       "updateBy": null,
    //       "updateTime": null,
    //       "remark": null,
    //       "id": 2,
    //       "no": "2",
    //       "depName": "百口泉采油厂",
    //       "stationName": "注输联合站",
    //       "processSystem": "原油处理系统",
    //       "name": "5#沉降罐",
    //       "year": "1997",
    //       "material": "碳钢",
    //       "volume": "4000",
    //       "workingMedium": "原油",
    //       "type": "原油罐"
    //     },
    //     {
    //       "createBy": null,
    //       "createTime": null,
    //       "updateBy": null,
    //       "updateTime": null,
    //       "remark": null,
    //       "id": 3,
    //       "no": "3",
    //       "depName": "采油一厂",
    //       "stationName": "1",
    //       "processSystem": "1",
    //       "name": "1",
    //       "year": "1",
    //       "material": "1",
    //       "volume": "1",
    //       "workingMedium": "1",
    //       "type": "原油处理罐"
    //     },
    //     {
    //       "createBy": null,
    //       "createTime": null,
    //       "updateBy": null,
    //       "updateTime": null,
    //       "remark": null,
    //       "id": 4,
    //       "no": "5",
    //       "depName": "采气一厂",
    //       "stationName": "2",
    //       "processSystem": "2222",
    //       "name": "22",
    //       "year": "22",
    //       "material": "2",
    //       "volume": "22222222222",
    //       "workingMedium": "222222222222",
    //       "type": "原油处理罐"
    //     }
    //   ],
    //   "code": 200,
    //   "msg": "查询成功"
    // }
    // loadData(res);
  }

  // 修改行
  // function reviseRow(index) {
  //   console.log('revise', index);
  //   if (!tankDialog) {
  //     tankDialog = createDialog({ title: '修改储罐信息', type: 'revise'});
  //   }
  //   console.log('tankDialog', tankDialog);
  //   tankDialog.dialog('open');
  //   let rows = $('#tankDataGrid').datagrid('getRows');
  //   let row = rows[index];
  //
  //   $('#tankForm').form('load', {
  //     id: row.id,
  //     no: row.no,
  //     depName: row.depName,
  //     stationName: row.stationName,
  //     processSystem: row.processSystem,
  //     name: row.name,
  //     year: row.year,
  //     material: row.material,
  //     volume: row.volume,
  //     workingMedium: row.workingMedium,
  //     type: row.type
  //   });
  // }

  // 删除行
  // function deleteRow(index) {
  //   console.log('deleteRow', index);
  //   let rows = $('#tankDataGrid').datagrid('getRows');
  //   let row = rows[index];
  //   console.log('row', row);
  //   let params = {
  //     id: row.id
  //   }
  //
  //   request({
  //     url: apiUrls.deleteTank,
  //     type: 'POST',
  //     headers:{
  //       'Content-Type': 'application/x-www-form-urlencoded'
  //     },
  //     params
  //   }, ()=>{
  //     $.messager.alert('提示', '删除成功!');
  //     query();
  //   });
  // }

  // 加载数据到表格
  function loadData(content) {
    $('#tankDataGrid').datagrid({
      columns: [[
        {field: 'ck', checkbox: 'true'},
        {field: 'no', title: '储罐编号', width: 120, align: 'center'},
        {field: 'depName', title: '二级单位名称', width: 120, align: 'center'},
        {field: 'stationName', title: '站场名称', width: 120, align: 'center'},
        {field: 'processSystem', title: '工艺系统', width: 120, align: 'center'},
        {field: 'name', title: '储罐名称', width: 120, align: 'center'},
        {field: 'year', title: '投用年份', width: 120, align: 'center'},
        {field: 'material', title: '储罐材质', width: 120, align: 'center'},
        {field: 'volume', title: '公称容积（m3）', width: 120, align: 'center'},
        {field: 'workingMedium', title: '工作介质', width: 120, align: 'center'},
        {field: 'type', title: '按介质划分的储罐类型', width: 120, align: 'center'},
        // {field:'operator', title: '操作', width: 120, align: 'center',
        //   formatter: (value, row, index)=>{
        //     return `<a  href="#" onClick="reviseRow(${index})" class="easyui-linkbutton"  plain="true">修改</a>`
        //     let htmlStr = `<div class="tankOperator" style="display:flex;justify-content:space-around;margin:auto 10px"><a  href="#" onClick=reviseRow(${index}) class="easyui-linkbutton"  plain="true">修改</a><a  href="#" onClick=deleteRow(${index}) class="easyui-linkbutton"  plain="true">删除</a></div>`
        //     return htmlStr;
        //   }},
      ]],
      // width: 1100,
      height: 500,
      data: content.list,
      toolbar: '#toolbar',
      pagination: true,
      selectOnCheck: true,
      singleSelect: true
    });

    // 分页条相关
    let pager = $('#tankDataGrid').datagrid('getPager');
    pager.pagination({
      onSelectPage: function (_pageNum, _pageSize) {
        pageNum = _pageNum;
        pageSize = _pageSize;
        query();
      },
      onChangePageSize: function (_pageSize) {
        pageSize = _pageSize
        query();
      },
      beforePageText: '第',//页数文本框前显示的汉字
      afterPageText: `页 共 ${Math.ceil(content.total / pageSize)} 页`,
      displayMsg: `当前显示 {from} - {to} 条记录 共 ${content.total} 条记录`,
    });
  }

  // 给顶部菜单绑定事件
  $('#tankAdd').bind('click', function () {
    // 添加
    if (!tankDialog || currentOperator === OPERATOR_TYPE.REVISE) {
      tankDialog = createDialog({title: '添加储罐信息', type: 'add'});
    }
    currentOperator = OPERATOR_TYPE.ADD;
    console.log('tankDialog', tankDialog);
    tankDialog.dialog('open');
  });

  function createDialog({title, type = OPERATOR_TYPE.ADD}) {
    if (tankDialog) {
      $('#tankForm').form('clear');
      // tankDialog.dialog('destroy');
      tankDialog = null;
    }
    let _tankDialog = $('#tankDialog').dialog({
      title,
      top: 30,
      width: 600,
      height: 800,
      closed: true,
      cache: false,
      iconCls: type === OPERATOR_TYPE.ADD ? 'icon-add' : 'icon-edit',
      resizable: true,
      modal: true,
      closable: false,
      style: {padding: '10px'},
      buttons: [{
        text: '确定',
        iconCls: 'icon-ok',
        handler: function () {
          let bool = $('#tankForm').form('validate');
          if (bool) {
            let params = decodeURI(($('#tankForm').serialize()));
            console.log('params', params);
            if (type === OPERATOR_TYPE.ADD) { // 新增
              request({
                url: apiUrls.addTank,
                type: 'POST',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                params
              }, () => {
                $.messager.alert('提示', '添加成功!');
                query();
              })
            } else { // 修改
              request({
                url: apiUrls.updateTank,
                type: 'POST',
                headers: {
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                params
              }, () => {
                $.messager.alert('提示', '修改成功!');
                query();
              })

            }

            tankDialog.dialog('close');
            $('#tankForm').form('clear')
          }
        }
      }, {
        text: '取消',
        iconCls: 'icon-cancel',
        handler: function () {
          tankDialog.dialog('close');
        }
      }]
    });

    return _tankDialog;
  }

  $('#tankEdit').bind('click', function () {
    // 编辑
    let rows = $('#tankDataGrid').datagrid('getChecked');
    console.log('rows', rows);
    if (rows.length) {
      // TODO: 编辑修改
      if (!tankDialog || currentOperator === OPERATOR_TYPE.ADD) {
        tankDialog = createDialog({title: '修改储罐信息', type: 'revise'});
      }
      console.log('tankDialog', tankDialog);
      currentOperator = OPERATOR_TYPE.REVISE;
      tankDialog.dialog('open');
      let row = rows[0];
      console.log('row', row);
      $('#tankForm').form('load', {
        id: row.id,
        no: row.no,
        depName: row.depName,
        stationName: row.stationName,
        processSystem: row.processSystem,
        name: row.name,
        year: row.year,
        material: row.material,
        volume: row.volume,
        workingMedium: row.workingMedium,
        type: row.type
      });
    } else {
      $.messager.alert('提示', '请选择一条记录修改');
    }
  });

  $('#tankDelete').bind('click', function () {
    // 删除
    let rows = $('#tankDataGrid').datagrid('getChecked');
    console.log('rows', rows);
    if (rows.length) {
      let row = rows[0];
      console.log('row', row);
      let params = {
        id: row.id
      }

      request({
        url: apiUrls.deleteTank,
        type: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        params
      }, () => {
        $.messager.alert('提示', '删除成功!');
        query();
      });
    } else {
      $.messager.alert('提示', '请先选择一条记录');
    }
  });

  $('#tankImport').filebox({
    onChange: function(newValue, oldValue){
      console.log('onChange');
      if(newValue) {
        let files = $('#tankImport').filebox('files');
        let formData = new FormData();
        formData.append('file', files[0]);
        requestFile({
          url: apiUrls.upload,
          type: 'POST',
          params: formData,
          // headers: {
          //   "Context-Type": 'multipart/form-data'
          // },
          processData: false,
          contentType: false,
        }, function (){
           $.messager.alert('提示', '导入成功!');
           $('#tankImport').filebox('clear');
        }, function (error){
          $.messager.alert('提示', '导入失败!');
        });
      }
    }
  })

  $('#tankExport').bind('click', function () {
    // 下载导出
    let params = {};
    let no = $('#no').textbox('getText');
    if (no) {
      params.no = no;
    }
    let depName = $('#depName').textbox('getText');
    if (depName) {
      params.depName = depName;
    }
    let stationName = $('#stationName').textbox('getText');
    if (stationName) {
      params.stationName = stationName;
    }

    request({
      url: apiUrls.down,
      type: 'GET',
      params
    }, function (response){
      let link = document.createElement('a');
      link.href = response.fileUrl; // 替换为服务器返回的导出文件 URL
      link.download = response.fileName; // 替换为服务器返回的导出文件名
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }, function (error){
      $.messager.alert('提示', '下载失败!');
    })
  });


  // 先做权限验证，再默认查询一次、
  window.getToken(function (_token){
    token = _token;
    query();
  });
  // query();

})
