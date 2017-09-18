var pagePath = window.location.pathname;
console.info(pagePath);
var rootPath = pagePath.substring(0, pagePath.lastIndexOf("/note/") + 6);
console.info(rootPath);

if (rootPath.indexOf("/note") < 0) {
    var scriptNode = document.getElementsByTagName("head")[0].getElementsByTagName("script")[0];
    console.info(scriptNode.outerHTML);
    var cssPath = scriptNode.getAttribute("src");
    console.log(cssPath);
    rootPath = pagePath.substring(0, pagePath.lastIndexOf("/") + 1) + cssPath.substring(0, cssPath.lastIndexOf("/note/") + 6);
}

console.info("css root path: " + rootPath);

var prefix = "";
if (window.location.href.startsWith("file:///")) {
	prefix = "file:///";
}

// jQuery
document.writeln("<link rel='stylesheet' href='" + prefix + rootPath + "mylib/css/style.css' type='text/css' />");
document.writeln("<link rel='stylesheet' href='" + prefix + rootPath + "mylib/jquery/css/smoothness/jquery-ui-1.8.21.custom.css' type='text/css' />");
document.writeln("<script type='text/javascript' src='" + prefix + rootPath + "mylib/jquery/js/jquery-1.7.2.min.js'></script>");
document.writeln("<script type='text/javascript' src='" + prefix + rootPath + "mylib/jquery/js/jquery-ui-1.8.21.custom.min.js'></script>");

//code highlight
//document.writeln("<link rel='stylesheet' href='" + prefix + rootPath + "mylib/syntaxhighlighter_3.0.83/styles/shCoreDefault.css' type='text/css' />");
//document.writeln("<script type='text/javascript' src='" + prefix + rootPath + "mylib/syntaxhighlighter_3.0.83/scripts/shCore.js'></script>");
//document.writeln("<script type='text/javascript' src='" + prefix + rootPath + "mylib/syntaxhighlighter_3.0.83/scripts/shBrushCSharp.js'></script>");
//document.writeln("<script type='text/javascript' src='" + prefix + rootPath + "mylib/syntaxhighlighter_3.0.83/scripts/shBrushJava.js'></script>");

document.writeln("<link rel='stylesheet' href='" + prefix + rootPath + "mylib/shjs-0.6/sh_style.min.css' type='text/css' />");
document.writeln("<script type='text/javascript' src='" + prefix + rootPath + "mylib/shjs-0.6/sh_main.min.js'></script>");
document.writeln("<script type='text/javascript' src='" + prefix + rootPath + "mylib/shjs-0.6/lang/sh_csharp.min.js'></script>");
document.writeln("<script type='text/javascript' src='" + prefix + rootPath + "mylib/shjs-0.6/lang/sh_css.min.js'></script>");
document.writeln("<script type='text/javascript' src='" + prefix + rootPath + "mylib/shjs-0.6/lang/sh_java.min.js'></script>");
document.writeln("<script type='text/javascript' src='" + prefix + rootPath + "mylib/shjs-0.6/lang/sh_javascript.min.js'></script>");
document.writeln("<script type='text/javascript' src='" + prefix + rootPath + "mylib/shjs-0.6/lang/sh_log.min.js'></script>");
document.writeln("<script type='text/javascript' src='" + prefix + rootPath + "mylib/shjs-0.6/lang/sh_html.min.js'></script>");
document.writeln("<script type='text/javascript' src='" + prefix + rootPath + "mylib/shjs-0.6/lang/sh_xml.min.js'></script>");
document.writeln("<script type='text/javascript' src='" + prefix + rootPath + "mylib/shjs-0.6/lang/sh_sh.min.js'></script>");
document.writeln("<script type='text/javascript' src='" + prefix + rootPath + "mylib/shjs-0.6/lang/sh_properties.min.js'></script>");
document.writeln("<script type='text/javascript' src='" + prefix + rootPath + "mylib/shjs-0.6/lang/sh_sql.min.js'></script>");

// header auto-generate
document.writeln("<script type='text/javascript' src='" + prefix + rootPath + "mylib/js/auto-header.js'></script>");
document.writeln("<script type='text/javascript' src='" + prefix + rootPath + "mylib/js/accordion.js'></script>");
