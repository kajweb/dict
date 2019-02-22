#!/usr/bin/python3
# -*- coding: UTF-8 -*- 

# SETP3 : 导出md的表格

import requests
import json
import urllib 
import os 

export = "|序号|图片|标题|单词数量|文件大小|背诵人数|下载地址|id|标签|\n";
export = export + "|---|---|---|---|---|---|---|---|---|\n";

def getTag( tag ):
	result = [];
	for i in tag:
		result.append(i["tagName"]);
	return "、".join(result);

with open("./bookLists.txt",'r',encoding='UTF-8') as load_f:
    load_dict = json.load(load_f)

bookLists = load_dict['data']['normalBooksInfo']
bookLen = len(bookLists);
nowIndex = 0;
for i in bookLists:
	nowIndex = nowIndex +1;
	id = i['id']
	picUrl = i['cover']
	title = i['title']
	wordNum = i['wordNum']
	fizeSize = i['size']
	reciteUserNum = i['reciteUserNum']
	fileUrl = i['offlinedata'];
	# tag = "";
	tag = getTag(i['tags']);
	filename = os.path.basename(fileUrl)
	basefile = "book/";
	picMD = "![{}]({})".format(title,picUrl);
	downloadUrl = "[{}]({}{}) [{}]({})".format( "本地地址",basefile,filename,  "原始地址",fileUrl,);
	item = "|{}|{}|{}|{}|{}|{}|{}|{}|{}|\n".format(nowIndex,picMD,title,wordNum,fizeSize,reciteUserNum,downloadUrl,id,tag)
	export = export + item;

print( export )

with open("./export.txt",'w',encoding='UTF-8') as f:
    f.write( export );
    f.close