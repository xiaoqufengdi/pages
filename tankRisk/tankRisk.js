$(document).ready(function (){ // 文档加载完
  const apiUrls = {
    searchTankRisk: '/api/tankrisk/searchTankRisk',  // 请求储罐风险列表
    addTankRisk: '/api/tankrisk/addTankRisk',  // 新增
    deleteTankRisk: '/api/tankrisk/delTankRisk', // 删除
    updateTankRisk: '/api/tankrisk/updateTankRisk', // 更新
    searchTankRiskById: '/api/tankrisk/searchTankRiskById', // 根据id获取item
    searchTankByNo: '/api/tank/searchTankByNo',  // 根据no查某一个储罐信息
  };

  const request = function ({url, type, headers = {'Context-Type': 'application/json:charset=utf-8'},  params}, success){

    $.ajax({
      url,
      type,
      headers: {
        Authorization: `Bearer ${token}`,
        ...headers
      },
      data: params,
      dataType: "json",
      success: function(data){
        if (success instanceof Function) {
          success(data);
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
  let process = 1;  // 标识对话框当前处于那个阶段
  let token = null;

  // 重置查询条件
  $('#tankReset').click(function (){
    $('#no').textbox('setText', '');
    $('#depName').textbox('setText', '');
    $('#stationName').textbox('setText', '');
    $('#processSystem').textbox('setText', '');
    $('#name').textbox('setText', '');
    $('#material').textbox('setText', '');
    $('#volume').textbox('setText', '');
    $('#workingMedium').textbox('setText', '');
    $('#type').combobox('clear');
    $('#risk_level').combobox('clear');

    $('#evaluated_by').textbox('setText', '');
    $('#reviewed_by').textbox('setText', '');
    $('#startDate').datebox('clear');
    $('#endDate').datebox('clear');
  })
  // 绑定查询响应函数
  $('#tankRiskSearch').click(function (){
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
    let processSystem = $('#processSystem').textbox('getText');
    if (processSystem) {
      params.processSystem = processSystem;
    }
    let name = $('#name').textbox('getText');
    if (name) {
      params.name = name
    }
    let material = $('#material').textbox('getText');
    if (material) {
      params.material = material;
    }
    let volume = $('#volume').textbox('getText');
    if (volume) {
      params.volume = volume;
    }
    let workingMedium = $('#workingMedium').textbox('getText');
    if (workingMedium) {
      params.workingMedium = workingMedium;
    }
    let type = $('#type').combobox('getValue');
    if (type) {
      params.type = type;
    }
    let risk_level = $('#risk_level').combobox('getValue');
    if (risk_level) {
      params.risk_level = risk_level;
    }
    let evaluated_by = $('#evaluated_by').textbox('getText');
    if (evaluated_by) {
      params.evaluated_by = evaluated_by;
    }
    let reviewed_by = $('#reviewed_by').textbox('getText');
    if(reviewed_by) {
      params.reviewed_by = reviewed_by;
    }
    let startDate = $('#startDate').datebox('getValue');
    let endDate = $('#endDate').datebox('getValue');
    if (startDate && endDate) {
      params.startDate = startDate;
      params.endDate = endDate;
    }

    console.log('params', params);
    // TOD0: 调查询接口
    request({
      url: apiUrls.searchTankRisk,
      type: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      params,
    }, function (res){
      console.log(res);
      loadData(res);
    })

    // test code
    let res = {
      "total": 5,
      "rows": [
        {
          "createBy": null,
          "createTime": "2023-05-25 15:58:49",
          "updateBy": null,
          "updateTime": null,
          "remark": null,
          "id": 8,
          "no": "1",
          "depName": "百口泉采油厂",
          "stationName": "注输联合站",
          "processSystem": "原油处理系统",
          "name": "1#净化油罐",
          "year": "1997",
          "material": "碳钢",
          "volume": "3000",
          "workingMedium": "净化油",
          "type": "原油处理罐",
          "sfysjsgzl": "是",
          "sfkzgyxjy": "否",
          "synxsfcgty": "否",
          "sfczyzwt": "否",
          "sfczjckl": "否",
          "sfymydx": "否",
          "sxzjpd": "-",
          "dbHdjbqk": "10",
          "dbSynx": "50",
          "dbJyqj": "60",
          "dbJzcyssl": "50",
          "dbNtcqk": "60",
          "dbTrdzl": "30",
          "dbYjbhzk": "60",
          "bbHdjbqk": "60",
          "bbSynx": "80",
          "bbJyqk": "100",
          "bbJzcyssl": "50",
          "bbNtczk": "60",
          "bbWtczk": "60",
          "bbBwczlzk": "60",
          "topHdjbqk": "100",
          "topSynx": "80",
          "topJyqk": "100",
          "topJzcfssl": "80",
          "topNtczk": "100",
          "topWtczk": "100",
          "topBwczk": "100",
          "gtcbcySyxg": "100",
          "gtcbcyDqjyjcqk": "100",
          "gtcbcyWhqk": "100",
          "cgcjbxGcqk": "100",
          "cgcjbxKzqk": "100",
          "lwJcsgzl": "100",
          "lwHfzlqk": "100",
          "damageScore": 68.0,
          "manaZcdj": "80",
          "manaGlzd": "50",
          "manaGlzdTwo": "50",
          "manaCzgf": "50",
          "manaCzgfTwo": "0",
          "manaAqzy": "50",
          "manaAqzyTwo": "50",
          "manaPx": "0",
          "manaPxTwo": "50",
          "manaSjgl": "50",
          "manaSjglTwo": "50",
          "manaFxpg": "50",
          "manaFxpgTwo": "50",
          "manaJyjc": "50",
          "manaJyjcTwo": "50",
          "manaWxwh": "100",
          "manaYjcs": "50",
          "manaYjcsTwo": "50",
          "manaAdjust": 1.0,
          "sxpjJzhzwxx": "100",
          "sxpjZdcc": "60",
          "sxpjGylcyx": "60",
          "sxpjHjyx": "10",
          "sxpjXtqk": "0",
          "sxpjScore": 59.0,
          "probabilityScore": 60,
          "probabilityLevel": 4,
          "consequenceScore": 59,
          "consequenceLevel": 4,
          "risk": 3528.0,
          "riskLevel": "中高风险",
          "evaluatedBy": "aa",
          "reviewedBy": "aa",
          "evaluatedTime": "2023-05-25"
        },
        {
          "createBy": null,
          "createTime": "2023-05-23 17:29:48",
          "updateBy": null,
          "updateTime": null,
          "remark": null,
          "id": 7,
          "no": "1",
          "depName": "百口泉采油厂",
          "stationName": "注输联合站",
          "processSystem": "原油处理系统",
          "name": "1#净化油罐",
          "year": "1997",
          "material": "碳钢",
          "volume": "3000",
          "workingMedium": "净化油",
          "type": "原油处理罐",
          "sfysjsgzl": "否",
          "sfkzgyxjy": "否",
          "synxsfcgty": "否",
          "sfczyzwt": "否",
          "sfczjckl": "否",
          "sfymydx": "否",
          "sxzjpd": "-",
          "dbHdjbqk": "100",
          "dbSynx": "80",
          "dbJyqj": "100",
          "dbJzcyssl": "80",
          "dbNtcqk": "100",
          "dbTrdzl": "50",
          "dbYjbhzk": "100",
          "bbHdjbqk": "100",
          "bbSynx": "80",
          "bbJyqk": "100",
          "bbJzcyssl": "80",
          "bbNtczk": "100",
          "bbWtczk": "100",
          "bbBwczlzk": "100",
          "topHdjbqk": "100",
          "topSynx": "80",
          "topJyqk": "100",
          "topJzcfssl": "80",
          "topNtczk": "100",
          "topWtczk": "100",
          "topBwczk": "100",
          "gtcbcySyxg": "100",
          "gtcbcyDqjyjcqk": "100",
          "gtcbcyWhqk": "100",
          "cgcjbxGcqk": "100",
          "cgcjbxKzqk": "100",
          "lwJcsgzl": "100",
          "lwHfzlqk": "100",
          "damageScore": 94.0,
          "manaZcdj": "100",
          "manaGlzd": "50",
          "manaGlzdTwo": "50",
          "manaCzgf": "50",
          "manaCzgfTwo": "50",
          "manaAqzy": "50",
          "manaAqzyTwo": "50",
          "manaPx": "50",
          "manaPxTwo": "20",
          "manaSjgl": "50",
          "manaSjglTwo": "50",
          "manaFxpg": "50",
          "manaFxpgTwo": "50",
          "manaJyjc": "50",
          "manaJyjcTwo": "50",
          "manaWxwh": "100",
          "manaYjcs": "50",
          "manaYjcsTwo": "50",
          "manaAdjust": 1.0,
          "sxpjJzhzwxx": "100",
          "sxpjZdcc": "100",
          "sxpjGylcyx": "100",
          "sxpjHjyx": "100",
          "sxpjXtqk": "100",
          "sxpjScore": 100.0,
          "probabilityScore": 92,
          "probabilityLevel": 5,
          "consequenceScore": 100,
          "consequenceLevel": 5,
          "risk": 9164.0,
          "riskLevel": "高风险",
          "evaluatedBy": "1",
          "reviewedBy": "1",
          "evaluatedTime": "2023-05-23"
        },
        {
          "createBy": null,
          "createTime": "2023-05-22 15:44:59",
          "updateBy": null,
          "updateTime": "2023-05-23 15:16:13",
          "remark": null,
          "id": 6,
          "no": "2",
          "depName": "百口泉采油厂",
          "stationName": "注输联合站",
          "processSystem": "原油处理系统",
          "name": "5#沉降罐",
          "year": "1997",
          "material": "碳钢",
          "volume": "4000",
          "workingMedium": "原油",
          "type": "原油处理罐",
          "sfysjsgzl": "否",
          "sfkzgyxjy": "否",
          "synxsfcgty": "否",
          "sfczyzwt": "否",
          "sfczjckl": "否",
          "sfymydx": "否",
          "sxzjpd": "-",
          "dbHdjbqk": "60",
          "dbSynx": "50",
          "dbJyqj": "60",
          "dbJzcyssl": "50",
          "dbNtcqk": "60",
          "dbTrdzl": "30",
          "dbYjbhzk": "60",
          "bbHdjbqk": "60",
          "bbSynx": "50",
          "bbJyqk": "60",
          "bbJzcyssl": "50",
          "bbNtczk": "60",
          "bbWtczk": "60",
          "bbBwczlzk": "60",
          "topHdjbqk": "60",
          "topSynx": "50",
          "topJyqk": "60",
          "topJzcfssl": "50",
          "topNtczk": "60",
          "topWtczk": "60",
          "topBwczk": "60",
          "gtcbcySyxg": "60",
          "gtcbcyDqjyjcqk": "60",
          "gtcbcyWhqk": "60",
          "cgcjbxGcqk": "60",
          "cgcjbxKzqk": "100",
          "lwJcsgzl": "100",
          "lwHfzlqk": "100",
          "damageScore": 61.0,
          "manaZcdj": "80",
          "manaGlzd": "50",
          "manaGlzdTwo": "50",
          "manaCzgf": "50",
          "manaCzgfTwo": "50",
          "manaAqzy": "50",
          "manaAqzyTwo": "50",
          "manaPx": "50",
          "manaPxTwo": "20",
          "manaSjgl": "50",
          "manaSjglTwo": "50",
          "manaFxpg": "50",
          "manaFxpgTwo": "50",
          "manaJyjc": "50",
          "manaJyjcTwo": "50",
          "manaWxwh": "100",
          "manaYjcs": "50",
          "manaYjcsTwo": "50",
          "manaAdjust": 1.0,
          "sxpjJzhzwxx": "60",
          "sxpjZdcc": "30",
          "sxpjGylcyx": "30",
          "sxpjHjyx": "30",
          "sxpjXtqk": "60",
          "sxpjScore": 44.0,
          "probabilityScore": 61,
          "probabilityLevel": 4,
          "consequenceScore": 44,
          "consequenceLevel": 3,
          "risk": 2684.0,
          "riskLevel": "中高风险",
          "evaluatedBy": "1",
          "reviewedBy": "1",
          "evaluatedTime": "2023-05-23"
        },
        {
          "createBy": null,
          "createTime": "2023-05-22 14:50:54",
          "updateBy": null,
          "updateTime": "2023-05-23 15:16:33",
          "remark": null,
          "id": 5,
          "no": "1",
          "depName": "百口泉采油厂",
          "stationName": "注输联合站",
          "processSystem": "原油处理系统",
          "name": "1#净化油罐",
          "year": "1997",
          "material": "碳钢",
          "volume": "3000",
          "workingMedium": "净化油",
          "type": "原油处理罐",
          "sfysjsgzl": "否",
          "sfkzgyxjy": "否",
          "synxsfcgty": "否",
          "sfczyzwt": "否",
          "sfczjckl": "否",
          "sfymydx": "否",
          "sxzjpd": "-",
          "dbHdjbqk": "60",
          "dbSynx": "50",
          "dbJyqj": "60",
          "dbJzcyssl": "50",
          "dbNtcqk": "60",
          "dbTrdzl": "30",
          "dbYjbhzk": "60",
          "bbHdjbqk": "60",
          "bbSynx": "50",
          "bbJyqk": "60",
          "bbJzcyssl": "50",
          "bbNtczk": "60",
          "bbWtczk": "60",
          "bbBwczlzk": "60",
          "topHdjbqk": "60",
          "topSynx": "50",
          "topJyqk": "60",
          "topJzcfssl": "50",
          "topNtczk": "60",
          "topWtczk": "60",
          "topBwczk": "60",
          "gtcbcySyxg": "60",
          "gtcbcyDqjyjcqk": "60",
          "gtcbcyWhqk": "60",
          "cgcjbxGcqk": "60",
          "cgcjbxKzqk": "60",
          "lwJcsgzl": "60",
          "lwHfzlqk": "60",
          "damageScore": 57.0,
          "manaZcdj": "80",
          "manaGlzd": "0",
          "manaGlzdTwo": "0",
          "manaCzgf": "0",
          "manaCzgfTwo": "0",
          "manaAqzy": "0",
          "manaAqzyTwo": "0",
          "manaPx": "50",
          "manaPxTwo": "20",
          "manaSjgl": "50",
          "manaSjglTwo": "50",
          "manaFxpg": "50",
          "manaFxpgTwo": "50",
          "manaJyjc": "50",
          "manaJyjcTwo": "50",
          "manaWxwh": "100",
          "manaYjcs": "50",
          "manaYjcsTwo": "50",
          "manaAdjust": 1.0,
          "sxpjJzhzwxx": "0",
          "sxpjZdcc": "30",
          "sxpjGylcyx": "30",
          "sxpjHjyx": "30",
          "sxpjXtqk": "60",
          "sxpjScore": 23.0,
          "probabilityScore": 37,
          "probabilityLevel": 3,
          "consequenceScore": 23,
          "consequenceLevel": 2,
          "risk": 843.0,
          "riskLevel": "中风险",
          "evaluatedBy": "plushe",
          "reviewedBy": "plsuhe",
          "evaluatedTime": "2023-05-23"
        },
        {
          "createBy": null,
          "createTime": "2023-05-22 10:09:52",
          "updateBy": null,
          "updateTime": null,
          "remark": null,
          "id": 3,
          "no": "1",
          "depName": "百口泉采油厂",
          "stationName": "注输联合站",
          "processSystem": "原油处理系统",
          "name": "1#净化油罐",
          "year": "1997",
          "material": "碳钢",
          "volume": "3000",
          "workingMedium": "净化油",
          "type": "原油处理罐",
          "sfysjsgzl": "否",
          "sfkzgyxjy": "否",
          "synxsfcgty": "否",
          "sfczyzwt": "否",
          "sfczjckl": "否",
          "sfymydx": "",
          "sxzjpd": "-",
          "dbHdjbqk": "100",
          "dbSynx": "80",
          "dbJyqj": "60",
          "dbJzcyssl": "50",
          "dbNtcqk": "60",
          "dbTrdzl": "30",
          "dbYjbhzk": "60",
          "bbHdjbqk": "60",
          "bbSynx": "50",
          "bbJyqk": "60",
          "bbJzcyssl": "50",
          "bbNtczk": "60",
          "bbWtczk": "60",
          "bbBwczlzk": "60",
          "topHdjbqk": "60",
          "topSynx": "50",
          "topJyqk": "60",
          "topJzcfssl": "50",
          "topNtczk": "60",
          "topWtczk": "60",
          "topBwczk": "60",
          "gtcbcySyxg": "60",
          "gtcbcyDqjyjcqk": "60",
          "gtcbcyWhqk": "60",
          "cgcjbxGcqk": "60",
          "cgcjbxKzqk": "60",
          "lwJcsgzl": "60",
          "lwHfzlqk": "60",
          "damageScore": 62.0,
          "manaZcdj": "80",
          "manaGlzd": "50",
          "manaGlzdTwo": "50",
          "manaCzgf": "50",
          "manaCzgfTwo": "50",
          "manaAqzy": "50",
          "manaAqzyTwo": "50",
          "manaPx": "50",
          "manaPxTwo": "20",
          "manaSjgl": "50",
          "manaSjglTwo": "50",
          "manaFxpg": "50",
          "manaFxpgTwo": "50",
          "manaJyjc": "50",
          "manaJyjcTwo": "50",
          "manaWxwh": "100",
          "manaYjcs": "50",
          "manaYjcsTwo": "50",
          "manaAdjust": 1.0,
          "sxpjJzhzwxx": "60",
          "sxpjZdcc": "30",
          "sxpjGylcyx": "30",
          "sxpjHjyx": "30",
          "sxpjXtqk": "60",
          "sxpjScore": 44.0,
          "probabilityScore": 59,
          "probabilityLevel": 4,
          "consequenceScore": 44,
          "consequenceLevel": 3,
          "risk": 2570.0,
          "riskLevel": "中高风险",
          "evaluatedBy": "plushe",
          "reviewedBy": "plushe",
          "evaluatedTime": "2023-05-22"
        }
      ],
      "code": 200,
      "msg": "查询成功"
    };
    // res = {
    //   "total": 5,
    //   "rows": []
    // }
    loadData(res);
  }

  // 加载数据到表格
  function loadData(res) {
    $('#tankRiskDataGrid').datagrid({
      columns: [
        [
          {field:'ck',checkbox:'true', rowspan: 3, colspan: 1},
          {field:'evaluated_time', title: '评价时间', width: 150, align:'center', rowspan: 3, colspan: 1},
          {title: '储罐数据信息', align:'center', rowspan: 1, colspan:10},
          {title: '储罐风险直接判定', align:'center', rowspan: 1, colspan:7},

          {title: '储罐损伤综合评价', align:'center', rowspan: 1, colspan:27},

          {title: '站场管理因素评估', align:'center', rowspan: 1, colspan:19},

          {title: '站场失效后果综合评价', align:'center', rowspan: 1,colspan:6},

          {field:'probability_score', title: '失效可能性得分', width: 120, align:'center', rowspan: 3, colspan: 1 },
          {field:'probability_level', title: '失效可能性等级', width: 120, align:'center', rowspan: 3, colspan: 1 },
          {field:'consequence_score', title: '失效后果得分', width: 120, align:'center', rowspan: 3, colspan: 1 },
          {field:'consequence_level', title: '失效后果等级', width: 120, align:'center', rowspan: 3, colspan: 1 },
          {field:'risk', title: '储罐风险值', width: 120, align:'center', rowspan: 3, colspan: 1 },
          {field:'risk_level', title: '储罐风险等级', width: 120, align:'center', rowspan: 3, colspan: 1 },
          {field:'evaluated_by', title: '评价人', width: 120, align:'center', rowspan: 3, colspan: 1 },
          {field:'reviewed_by', title: '审核人', width: 120, align:'center', rowspan: 3, colspan: 1 },
          {field:'create_time', title: '创建时间', width: 120, align:'center', rowspan: 3, colspan: 1 },
          {field:'update_time', title: '更新时间', width: 120, align:'center', rowspan: 3, colspan: 1 },

        ]
        , [
          {field: 'no', title: '储罐编号', width: 120, align:'center', rowspan: 2, colspan:1 },
          {field:'depName', title: '二级单位名称', width: 120, align:'center',rowspan: 2, colspan: 1},
          {field:'stationName', title: '站场名称', width: 120, align:'center',rowspan: 2, colspan: 1 },
          {field:'processSystem', title: '工艺系统', width: 120, align:'center',rowspan: 2, colspan: 1 },
          {field:'name', title: '储罐名称', width: 120, align:'center',rowspan: 2, colspan: 1 },
          {field:'year', title: '投用年份', width: 120, align:'center',rowspan: 2, colspan: 1 },
          {field:'material', title: '储罐材质', width: 120, align:'center',rowspan: 2, colspan: 1 },
          {field:'volume', title: '公称容积（m3）', width: 120, align:'center',rowspan: 2, colspan: 1 },
          {field:'workingMedium', title: '工作介质', width: 120, align:'center',rowspan: 2, colspan: 1 },
          {field:'type', title: '按介质划分的储罐类型', width: 120, align:'center',rowspan: 2, colspan: 1 },

          {field:'sfysjsgzl', title: '是否有设计、施工资料', width: 120, align:'center',rowspan: 2, colspan: 1  },
          {field:'sfkzgyxjy', title: '是否开展过有效检验', width: 120, align:'center',rowspan: 2, colspan: 1  },
          {field:'synxsfcgty', title: '使用年限是否超过10年', width: 120, align:'center',rowspan: 2, colspan: 1  },
          {field:'sfczyzwt', title: '底板、壁板和顶板当前是否存在开裂、凹陷变形、渗漏、穿孔等严重问题', width: 120, align:'center',rowspan: 2, colspan: 1  },
          {field:'sfczjckl', title: '是否存在基础开裂', width: 120, align:'center',rowspan: 2, colspan: 1  },
          {field:'sfymydx', title: '底板、壁板和顶板是否出现多次破损补漏，一直没有大修更换', width: 120, align:'center',rowspan: 2, colspan: 1  },
          {field:'sxzjpd', title: '风险直接判定', width: 120, align:'center',rowspan: 2, colspan: 1 },

          { title: '底板腐蚀损伤评价', align:'center', rowspan: 1, colspan: 7 },
          { title: '壁板腐蚀损伤评价', align:'center', rowspan: 1, colspan: 7},
          { title: '顶板腐蚀损伤评价', align:'center', rowspan: 1, colspan: 7},
          { title: '罐体抽瘪/超压损伤评价', align:'center', rowspan: 1, colspan: 3},
          { title: '储罐沉降变形损伤评价', align:'center', rowspan: 1, colspan: 2},
          {field:'damage_score', title: '损伤综合评价分值', width: 120, align:'center', rowspan: 2, colspan: 1 },

          // 站场管理因素评估
          {field:'mana_zcdj', title: '站场等级-储罐所在站场属于几类站场', width: 120, align:'center', rowspan: 2, colspan: 1},
          {field:'mana_glzd', title: '管理制度-单位是否制定适用的储罐安全管理制度', width: 120, align:'center', rowspan: 2, colspan: 1 },
          {field:'mana_glzd_two', title: '管理制度-储罐安全管理制度是否得到很好地执行', width: 120, align:'center', rowspan: 2, colspan: 1 },
          {field:'mana_czgf', title: '操作规程-储罐的操作及维护人员是否都有书面形式的操作程序、规程', width: 120, align:'center', rowspan: 2, colspan: 1 },
          {field:'mana_czgf_two', title: '操作规程-操作规程是否得到准确理解和规范执行', width: 120, align:'center', rowspan: 2, colspan: 1 },
          {field:'mana_aqzy', title: '安全作业-作业人员是否采取安全措施，严格控制储罐操作维护中的安全隐患', width: 120, align:'center', rowspan: 2, colspan: 1 },
          {field:'mana_aqzy_two', title: '安全作业-储罐清罐、维修维护等作业实施前，确定的施工作业许可、作业环境是否都满足要求', width: 120, align:'center', rowspan: 2, colspan: 1 },
          {field:'mana_px', title: '培训-是否对操作员工进行过储罐全部操作规程的培训', width: 120, align:'center', rowspan: 2, colspan: 1 },
          {field:'mana_px_two', title: '培训-每隔多长时间对操作员工进行正式培训', width: 120, align:'center', rowspan: 2, colspan: 1 },
          {field:'mana_sjgl', title: '数据管理-是否有站场的储罐设计建造资料', width: 120, align:'center', rowspan: 2, colspan: 1 },
          {field:'mana_sjgl_two', title: '数据管理-是否建立储罐“一罐一档”', width: 120, align:'center', rowspan: 2, colspan: 1 },
          {field:'mana_fxpg', title: '风险评估-是否按照管理要求，定期对站场储罐风险进行风险评估，评价储罐风险等级', width: 120, align:'center', rowspan: 2, colspan: 1 },
          {field:'mana_fxpg_two', title: '风险评估-是否根据风险评估结果，编制并完善站场储罐检验计划', width: 120, align:'center', rowspan: 2, colspan: 1 },
          {field:'mana_jyjc', title: '检验检测-是否按检验计划和策略，实施储罐检验工作', width: 120, align:'center', rowspan: 2, colspan: 1 },
          {field:'mana_jyjc_two', title: '检验检测-对储罐进行的检验、检测和维修资料是否及时存档', width: 120, align:'center' , rowspan: 2, colspan: 1},
          {field:'mana_wxwh', title: '维修维护-有无书面程序要求对日常检查、定期检验过程中发现的储罐缺陷必须安全及时地进行维修，并跟踪其实施情况，确保按进度完成', width: 120, align:'center', rowspan: 2, colspan: 1 },
          {field:'mana_yjcs', title: '应急措施-是否定期对储罐失效应急处置方案进行正规检查和修订', width: 120, align:'center', rowspan: 2, colspan: 1 },
          {field:'mana_yjcs_two', title: '应急措施-是否安排定期的疏散演习以评估和加强应急计划', width: 120, align:'center', rowspan: 2, colspan: 1 },
          {field:'mana_adjust', title: '站场管理调整系数', width: 120, align:'center' , rowspan: 2, colspan: 1},

          // 站场失效后果综合评价
          {field:'sxpj_jzhzwxx', title: '介质火灾危险性', width: 150, align:'center' , rowspan: 2, colspan: 1},
          {field:'sxpj_zdcc', title: '最大储存量', width: 150, align:'center' , rowspan: 2, colspan: 1},
          {field:'sxpj_gylcyx', title: '失效对工艺流程影响', width: 150, align:'center' , rowspan: 2, colspan: 1},
          {field:'sxpj_hjyx', title: '失效泄漏对环境影响', width: 150, align:'center' , rowspan: 2, colspan: 1},
          {field:'sxpj_xtqk', title: '监控报警及联锁控制系统情况', width: 120, align:'center' , rowspan: 2, colspan: 1},
          {field:'sxpj_score', title: '失效后果综合评估分值', width: 120, align:'center' , rowspan: 2, colspan: 1},

        ],
        [
           // 底板腐蚀损伤评价
          {field:'db_hdjbqk', title: '底板厚度减薄情况', width: 120, align:'center' },
          {field:'db_synx', title: '底板使用年限', width: 120, align:'center' },
          {field:'db_jyqj', title: '底板检验情况', width: 120, align:'center' },
          {field:'db_jzcyssl', title: '底板介质侧腐蚀速率', width: 120, align:'center' },
          {field:'db_ntcqk', title: '底板内涂层状况', width: 120, align:'center' },
          {field:'db_trdzl', title: '土壤电阻率', width: 120, align:'center' },
          {field:'db_yjbhzk', title: '阴极保护状况', width: 120, align:'center' },

          // 壁板腐蚀损伤评价
          {field:'bb_hdjbqk', title: '壁板厚度减薄情况', width: 120, align:'center' },
          {field:'bb_synx', title: '壁板使用年限', width: 120, align:'center' },
          {field:'bb_jyqk', title: '壁板检验情况', width: 120, align:'center' },
          {field:'bb_jzcyssl', title: '壁板介质侧腐蚀速率', width: 120, align:'center' },
          {field:'bb_ntczk', title: '壁板内涂层状况', width: 120, align:'center' },
          {field:'bb_wtczk', title: '壁板外涂层状况', width: 120, align:'center' },
          {field:'bb_bwczlzk', title: '壁板保温层质量状况', width: 120, align:'center' },

          // 顶板腐蚀损伤评价
          {field:'top_hdjbqk', title: '顶板厚度减薄情况', width: 120, align:'center' },
          {field:'top_synx', title: '顶板使用年限', width: 120, align:'center' },
          {field:'top_jyqk', title: '顶板检验情况', width: 120, align:'center' },
          {field:'top_jzcfssl', title: '顶板介质侧腐蚀速率', width: 120, align:'center' },
          {field:'top_ntczk', title: '顶板内涂层状况', width: 120, align:'center' },
          {field:'top_wtczk', title: '顶板外涂层状况', width: 120, align:'center' },
          {field:'top_bwczk', title: '顶板保温层状况', width: 120, align:'center' },

          // 罐体抽瘪/超压损伤评价
          {field:'gtcbcy_syxg', title: '呼吸阀、液压式安全阀及阻火器使用效果', width: 120, align:'center' },
          {field:'gtcbcy_dqjyjcqk', title: '呼吸阀、液压式安全阀及阻火器定期检验检测情况', width: 120, align:'center' },
          {field:'gtcbcy_whqk', title: '呼吸阀、液压式安全阀及阻火器维护情况', width: 120, align:'center' },

          // 储罐沉降变形损伤评价
          {field:'cgcjbx_gcqk', title: '沉降观测情况', width: 120, align:'center' },
          {field:'cgcjbx_kzqk', title: '不均匀沉降控制情况', width: 120, align:'center' },
        ]
      ],

      height: 500,
      data: res.rows,
      toolbar: '#toolbar',
      pagination: true,
      selectOnCheck: true,
      singleSelect: true
    });

    // 分页条相关
    let pager = $('#tankRiskDataGrid').datagrid('getPager');
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
      afterPageText: `页 共 ${Math.ceil(res.total/pageSize)} 页`,
      displayMsg: `当前显示 {from} - {to} 条记录 共 ${res.total} 条记录`,
    });
  }

  // 给顶部菜单绑定事件
  $('#tankRiskAdd').bind('click', function(){
    // 添加
    if (!tankDialog || currentOperator === OPERATOR_TYPE.REVISE) {
      tankDialog = createDialog({ title: '添加储罐风险评估', type: 'add'});
    }
    currentOperator = OPERATOR_TYPE.ADD;
    console.log('tankDialog', tankDialog);
    tankDialog.dialog('open');
    process = 1;
    updateImgStyle(process);
    $('#tankRiskForm').form('clear');

  });

  // 更新图片样式
  function updateImgStyle(num) {
    $('.tankRiskProcess li').each(function (index, element) {
      if(index === num - 1) {
        $(element).css('filter', 'unset')
      } else {
        $(element).css('filter', 'grayscale(100%)')
      }
    });
  }

  // 创建对话框
  function createDialog({title, type = OPERATOR_TYPE.ADD}) {
    if (tankDialog) {
      $('#tankRiskForm').form('clear');
      // tankDialog.dialog('destroy');
      tankDialog = null;
    }
    let _tankDialog = $('#tankRiskDialog').dialog({
      title,
      top: 30,
      width: 1000,
      height: 800,
      closed: true,
      cache: false,
      iconCls: type === OPERATOR_TYPE.ADD ? 'icon-add': 'icon-edit',
      resizable:true,
      modal: true,
      closable: false,
      style: { padding: '10px' },
      buttons:[{
        text:'下一步',
        iconCls:'icon-ok',
        handler:function(){
          let bool = $('#tankRiskForm').form('validate');
          if (bool) {
            let params = decodeURI(($('#tankRiskForm').serialize()));
            console.log('params', params);
            if(type === OPERATOR_TYPE.ADD) { // 新增
              request({
                url: apiUrls.addTank,
                type: 'POST',
                headers:{
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                params
              }, ()=>{
                $.messager.alert('提示', '添加成功!');
                query();
              })
            } else { // 修改
              request({
                url: apiUrls.updateTank,
                type: 'POST',
                headers:{
                  'Content-Type': 'application/x-www-form-urlencoded'
                },
                params
              }, ()=>{
                $.messager.alert('提示', '修改成功!');
                query();
              })
            }

            tankDialog.dialog('close');
            $('#tankRiskForm').form('clear')
          }
        }
      },{
        text:'取消',
        iconCls: 'icon-cancel',
        handler:function(){
          tankDialog.dialog('close');
        }
      }]
    });

    return _tankDialog;
  }

  $('#tankRiskEdit').bind('click', function (){
    // 编辑修改
    let rows = $('#tankRiskDataGrid').datagrid('getChecked');
    console.log('rows', rows);
    if(rows.length) {
      if (!tankDialog || currentOperator === OPERATOR_TYPE.ADD) {
        tankDialog = createDialog({ title: '添加储罐风险评估', type: 'revise'});
      }
      console.log('tankDialog', tankDialog);
      currentOperator = OPERATOR_TYPE.REVISE;
      tankDialog.dialog('open');
      let row = rows[0];
      console.log('row', row);
      $('#tankRiskForm').form('load', {
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
      updateImgStyle(process);
    } else {
      $.messager.alert('提示', '请选择一条记录修改');
    }
  });

  $('#tankRiskDelete').bind('click',function (){
    // 删除
    let rows = $('#tankRiskDataGrid').datagrid('getChecked');
    console.log('rows', rows);
    if (rows.length) {
      let row = rows[0];
      console.log('row', row);
      let params = {
        id: row.id
      }

      request({
        url: apiUrls.deleteTankRisk,
        type: 'POST',
        headers:{
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        params
      }, ()=>{
        $.messager.alert('提示', '删除成功!');
        query();
      });
    } else {
      $.messager.alert('提示', '请至少选择一条记录');
    }
  });

  // 弹窗里的查询按钮
  $('#tankRiskSearchDialog').bind('click', function (){
    let no = $('#my_no').textbox('getText');
    let params = { no };
    request({
      url: apiUrls.searchTankByNo,
      type: 'POST',
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      params
    }, function (res){
      console.log('res', res);
      $('#tankRiskForm').form('load', {
        id: res.id,
        no: res.no,
        depName: res.depName,
        stationName: res.stationName,
        processSystem: res.processSystem,
        name: res.name,
        year: res.year,
        material: res.material,
        volume: res.volume,
        workingMedium: res.workingMedium,
        type: res.type
      });
    })
  });

  // 先做权限验证，再默认查询一次、
  window.getToken(function (_token){
    token = _token;
    query();
  });
})
