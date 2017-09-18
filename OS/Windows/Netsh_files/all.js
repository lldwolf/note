//去掉空格
function TrimString(str)
{
	var StrLen=str.length;
	if(str.charAt(0) == " ")
	{
		str = str.slice(1);
		str = TrimString(str); 
	}
	if(str.charAt(StrLen) == " ")
	{
		str = str.slice(0,StrLen-1);
		str = TrimString(str); 
	}
	return str;
}

//计算字符长度
function StringLen(str)
{
	var i,rt=0;
	for(i=0;i<str.length;i++)
	{
		rt++;
		if(str.charCodeAt(i)>256) rt++;
	}
	return rt;
}

//判断产品搜索
function chkProdSearch()
{
	var theForm=document.ProdSearch;
	if ((theForm.CateID.value=="")||(theForm.CompanyID.value==""))
	{
		if(TrimString(theForm.Key.value)=="")
		{
			alert("请输入产品关键字！\n\n为了提高搜索速度及准确性，请选择分类及厂商！！！");
			theForm.Key.focus();
			return (false);
		}
	}
	var theURL="Products_Search.asp"
	theURL=theURL +"?CateID="+ theForm.CateID.options[theForm.CateID.selectedIndex].value;
	theURL=theURL +"&CompanyID="+ theForm.CompanyID.options[theForm.CompanyID.selectedIndex].value;
	theForm.action=theURL
	theForm.submit();
}

//判断站内搜索(全站)
function chkAllSearch()
{
	var theForm=document.AllSearch;
	if(theForm.SearchType.value=="")
	{
		alert("请选择搜索范围！")
		theForm.SearchType.focus();
		return(false);
	}
	if(theForm.Key.value=="")
	{
		alert("请选择搜索关键字！")
		theForm.Key.focus();
		return(false);
	}
	var SelectedType=theForm.SearchType.options[theForm.SearchType.selectedIndex].value;
	switch(SelectedType)
	{
		case "1":
			theForm.action="/Products/Products_Search.asp";
			break;
		case "2":
			theForm.TechType.value="1";
			theForm.action="/Tech/Tech_Search.asp";
			break;
		case "3":
			theForm.TechType.value="2";
			theForm.action="/Tech/Tech_Search.asp";
			break;
		case "4":
			theForm.DownType.value="1";
			theForm.action="/Down/Down_Search.asp";
			break;
		case "5":
			theForm.DownType.value="2";
			theForm.action="/Down/Down_Search.asp";
			break;
		case "6":
			theForm.action="/Tech/Tech_TipSearch.asp";
			break;
		case "7":
			theForm.action="/Tech/Tech_FaqSearch.asp";
			break;
		default:
			return(false);
			break;		
	}
	theForm.submit();
}

//判断技术搜索
function chkTechSearch()
{
	var theForm=document.TechSearch;
	if(theForm.TechType.value=="")
	{
		alert("请选择搜索范围！")
		theForm.TechType.focus();
		return(false);
	}
	if(theForm.Key.value=="")
	{
		alert("请选择搜索关键字！")
		theForm.Key.focus();
		return(false);
	}
	switch(theForm.TechType.options[theForm.TechType.selectedIndex].value)
	{
		case "1":
			theForm.action="/Tech/Tech_Search.asp";
			break;
		case "2":
			theForm.action="/Tech/Tech_Search.asp";
			break;
		case "3":
			theForm.action="/Tech/Tech_TipSearch.asp";
			break;
		case "4":
			theForm.action="/Tech/Tech_FaqSearch.asp";
			break;
		default:
			return(false);
			break;		
	}
	theForm.submit();
}

//判断下载搜索
function chkDownSearch()
{
	var theForm=document.DownSearch;
	if(theForm.DownType.value=="")
	{
		alert("请选择搜索类型！")
		theForm.DownType.focus();
		return(false);
	}
	if(theForm.Key.value=="")
	{
		alert("请选择搜索关键字！")
		theForm.Key.focus();
		return(false);
	}
	theForm.submit();
}

//判断新闻搜索

function chkNewsSearch()
{
	var theForm=document.NewsSearch;
	
	if(theForm.Key.value=="")
	{
		alert("请选择搜索关键字！")
		theForm.Key.focus();
		return(false);
	}
	theForm.action="/News/News_Search.asp"
	theForm.submit();
}