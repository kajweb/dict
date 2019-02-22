#!/usr/bin/python3
# -*- coding: UTF-8 -*- 

# SETP2 : 下载书本

import requests
import json
import urllib 
import os 

def downloadFile( url ):
	filename = os.path.basename(url)
	r = requests.get(url) 
	with open("./book/" + filename, "wb") as code:
		code.write(r.content)

with open("./bookLists.txt",'r',encoding='UTF-8') as load_f:
    load_dict = json.load(load_f)

bookLists = load_dict['data']['normalBooksInfo']
bookLen = len(bookLists);
nowIndex = 0;
for i in bookLists:
	nowIndex = nowIndex +1;
	print( "正在下载", ("{}/{}").format(nowIndex,bookLen) );
	print(" id ：", i['id']);
	print("标题：", i['title']);
	print("词数：", i['wordNum']);
	fileUrl = i['offlinedata'];
	print("地址：", fileUrl);
	downloadFile( fileUrl );
	print("==  下载完成  ==")
	print();