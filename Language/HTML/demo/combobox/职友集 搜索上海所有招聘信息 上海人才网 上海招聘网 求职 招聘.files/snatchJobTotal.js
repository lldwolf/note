var positionTotal = '13876784';
var positionTotalToday = '281501';
var snatchSiteotal = '105';
var job_key_array=new Array('QC 服装','手袋设计','护士','所有','所有','所有','QC 服装 上海','律师','PB','司机','3M+中国有限公司','兼职','玩具','模具设计 压铸','锅炉','成型主管','powerbuilder','数控冲床操作工','司机','company:山特电子（深圳）有限公司','幕墙','所有','position:音响师','siebel','期货操盘手','所有','Accountant 会计','医药销售总监','数控车床','金属材料');
var city_key_array=new Array('所有','所有','广东省','上海','济南市','广州','所有','北京','所有','佛山','所有','西安','深圳','所有','广东','所有','所有','所有','北京市','所有','广州','湛江','所有','所有','所有','韶关','所有','所有','所有','所有');
var marqueeStr='';
for(i=0;i<30;i++){
marqueeStr+='<a href="http://so.jobui.com/search.html?jobKw='+encodeURIComponent(job_key_array[i])+'&cityKw='+encodeURIComponent(city_key_array[i])+'" target="_blank">'+job_key_array[i]+'('+city_key_array[i]+')'+'</a>';
}