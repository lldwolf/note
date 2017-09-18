function menu(obj){
	if(obj.style.display=='none'){
		obj.style.display='';
	}
	else{
		obj.style.display='none';
	}
}

function init(){
expandcollapse=true;
ExpandAll.style.display='';
CollapseAll.style.display='';
setstyle('none');
}


function setstyle(showValue){
sqlserver.style.display=showValue;
	sqlserverodbc.style.display=showValue;
	sqlserveroledb.style.display=showValue;
	sqlserveradonet.style.display=showValue;
	sqlserverother.style.display=showValue;
	sqlserverreadmore.style.display=showValue;
		sqlserverreadmorenetprot.style.display=showValue;
		sqlserverreadmoreallprops.style.display=showValue;
sqlserver2005.style.display=showValue;
    sqlserver2005snacodbc.style.display=showValue;
    sqlserver2005snacoledb.style.display=showValue;
    sqlserver2005adonet.style.display=showValue;
    sqlserver2005readmore.style.display=showValue;
    sqlserverreadmorewhentouse.style.display=showValue;
access.style.display=showValue;
	accessodbc.style.display=showValue;
	jetoledb.style.display=showValue;
oracle.style.display=showValue;
	oracleodbc.style.display=showValue;
	oracleoledb.style.display=showValue;
	oracleadonet.style.display=showValue;
	oradirect.style.display=showValue;
	oracleother.style.display=showValue;
mysql.style.display=showValue;
	mysqlodbc.style.display=showValue;
	mysqloledb.style.display=showValue;
	mysqlconnectornet.style.display=showValue;
	mysqladonet.style.display=showValue;
	mysqlclient.style.display=showValue;
	mysqldirect.style.display=showValue;
interbase.style.display=showValue;
	interbaseeasysoft.style.display=showValue;
	interbaseintersolv.style.display=showValue;
	interbasesibprovider.style.display=showValue;
db2.style.display=showValue;
	db2oledb.style.display=showValue;
	db2ibmoledb.style.display=showValue;
	db2odbc.style.display=showValue;
sybase.style.display=showValue;
	sybaseodbc.style.display=showValue;
	sybaseoledb.style.display=showValue;
	sybaseadonet.style.display=showValue;
informix.style.display=showValue;
	informixodbc.style.display=showValue;
	informixoledb.style.display=showValue;
ingres.style.display=showValue;
	ingresodbc.style.display=showValue;
postgre.style.display=showValue;
	postgresqldirect.style.display=showValue;
paradox.style.display=showValue;
	paradoxodbc.style.display=showValue;
	paradoxoledbconnection.style.display=showValue;
mimer.style.display=showValue;
	mimerodbc.style.display=showValue;
lightbase.style.display=showValue;
	lightbasestandard.style.display=showValue;
dsn.style.display=showValue;
	dsnodbc.style.display=showValue;
firebird.style.display=showValue;
	firebirdodbc.style.display=showValue;
	firebirddotnet.style.display=showValue;
excel.style.display=showValue;
	excelodbc.style.display=showValue;
	exceloledb.style.display=showValue;
text.style.display=showValue;
	textodbc.style.display=showValue;
	textoledb.style.display=showValue;
dbf.style.display=showValue;
	dbfoledb.style.display=showValue;
	dbfodbc.style.display=showValue;
as400.style.display=showValue;
	as400oledb.style.display=showValue;
	as400odbc.style.display=showValue;
exchange.style.display=showValue;
	exchangeoledb.style.display=showValue;
vfoxpro.style.display=showValue;
	vfoxprooledb.style.display=showValue;
	vfoxproodbc.style.display=showValue;
pervasive.style.display=showValue;
	pervasiveodbc.style.display=showValue;
	pervasiveoledb.style.display=showValue;
udl.style.display=showValue;
	udludl.style.display=showValue;
}

function writeTextBottomText(sText){
	if (sText==''){
	
	}
	window.status=sText;
	return true
}