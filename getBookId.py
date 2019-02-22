#!/usr/bin/python3
# -*- coding: UTF-8 -*- 

# SETP1 : 获得所有书本id

import requests
import json

#http://reciteword.youdao.com/reciteword/v1/param?key=normalBooks&screen=720x1280&imei=CQlhZDQ5NDllNmU0M2Y2ZTUxCWQ2NmRlNGIxN2Q1Mw%253D%253D&mid=6.0.1&keyfrom=reciteword.1.5.3.android&vendor=index&version=1.5.3&model=Redmi_4A
#http://reciteword.youdao.com/reciteword/v1/param?key=normalBooks

url = "http://reciteword.youdao.com/reciteword/v1/param?key=normalBooks";
res = requests.get(url);
res.encoding = 'utf-8'
data = res.text
jsonObj = json.loads(data)
bookLists = jsonObj['data']['normalBooks']['bookList'];
bookids = [];
for i in bookLists:
	bookids.append( i['id'] )
print( bookids )

"""
http://reciteword.youdao.com/reciteword/v1/getBooksInfo?screen=720x1280&imei=CQlhZDQ5NDllNmU0M2Y2ZTUxCWQ2NmRlNGIxN2Q1Mw%253D%253D&mid=6.0.1&keyfrom=reciteword.1.5.3.android&vendor=index&version=1.5.3&model=Redmi_4A

bookIds=['CET4luan_1', 'CET6luan_1', 'KaoYanluan_1', 'Level4luan_1', 'Level8_1', 'CET4luan_2', 'CET6_2', 'KaoYan_2', 'Level4luan_2', 'Level8luan_2', 'CET4_3', 'CET6_3', 'KaoYan_3', 'CET4_1', 'CET6_1', 'KaoYan_1', 'Level4_1', 'CET4_2', 'Level4_2', 'Level8_2', 'IELTSluan_2', 'TOEFL_2', 'GRE_2', 'SAT_2', 'GMATluan_2', 'IELTS_3','TOEFL_3', 'GRE_3', 'SAT_3', 'GMAT_3', 'IELTS_2', 'GMAT_2', 'ChuZhongluan_2', 'GaoZhongluan_2', 'ChuZhong_3', 'GaoZhong_3', 'PEPXiaoXue3_1', 'PEPXiaoXue3_2', 'PEPXiaoXue4_1', 'PEPXiaoXue4_2', 'PEPXiaoXue5_1', 'PEPXiaoXue5_2', 'PEPXiaoXue6_1', 'PEPXiaoXue6_2', 'PEPChuZhong7_1', 'PEPChuZhong7_2', 'PEPChuZhong8_1', 'PEPChuZhong8_2', 'PEPChuZhong9_1', 'WaiYanSheChuZhong_1', 'WaiYanSheChuZhong_2', 'WaiYanSheChuZhong_3', 'WaiYanSheChuZhong_4', 'WaiYanSheChuZhong_5', 'WaiYanSheChuZhong_6', 'PEPGaoZhong_1', 'PEPGaoZhong_2', 'PEPGaoZhong_3', 'PEPGaoZhong_4', 'PEPGaoZhong_5', 'PEPGaoZhong_6', 'PEPGaoZhong_7', 'PEPGaoZhong_8', 'PEPGaoZhong_9', 'PEPGaoZhong_10', 'PEPGaoZhong_11', 'ChuZhong_2', 'GaoZhong_2', 'BEC_2', 'BEC_3', 'BeiShiGaoZhong_1', 'BeiShiGaoZhong_2', 'BeiShiGaoZhong_3', 'BeiShiGaoZhong_4', 'BeiShiGaoZhong_5', 'BeiShiGaoZhong_6', 'BeiShiGaoZhong_7', 'BeiShiGaoZhong_8', 'BeiShiGaoZhong_9', 'BeiShiGaoZhong_10', 'BeiShiGaoZhong_11']&reciteType=normal
"""