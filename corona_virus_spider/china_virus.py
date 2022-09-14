# 导入requests库

import requests
url = "https://voice.baidu.com/act/newpneumonia/newpneumonia"
#为了避免反爬，伪装成浏览器
headers = {'user-agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)\
 AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36 Edg/97.0.1072.55'}
response = requests.get(url)
# 查看正确响应的结果，并与网页源代码比较一下，是否相同
result = response.text

# 导入xpath库
from lxml import etree # 将数据转化为树形态
# 生成HTML对象
html = etree.HTML(result)
result = html.xpath('//script[@type="application/json"]/text()')
result = result[0]

# 导入Json库，此库无需安装
import json
result = json.loads(result)
result = result["component"]
message = result[0]["message"]["inner"]
# 获取国内当前数据
result = result[0]['caseList']

# 导入模块
import openpyxl
# 创建工作簿
wb = openpyxl.Workbook()
# 创建工作表
ws = wb.active
# 设置表的标题
ws.title = "国内疫情"
# 写入表头
ws.append(["省份","时间","累计确诊","死亡","治愈","新增确诊","新增无症状"])
# 写入各行

from tqdm import tqdm
import time

with open("data.txt","w") as f:
    for each in tqdm(message,"热点信息采集"):
        hotspot = each["conf_data"]
        if hotspot != None:
            hotspot = hotspot["notices"][0]["title"]
            f.write(hotspot + "\n")
for each in tqdm(result,"采集数据"):
    relativeTime = int(each['relativeTime'])  # 时间
    content_time = time.strftime('%Y-%m-%d %H:%M', time.localtime(relativeTime))
    list_name = [each["area"],content_time,each["confirmed"],\
                 each["died"],each["crued"],each["confirmedRelative"],each["asymptomaticLocalRelative"]]
    # 如果为空则填充0
    for i in list_name:
        if i == "":
            i = "0"
    ws.append(list_name)
# 保存至excel中
wb.save('./data.xlsx')