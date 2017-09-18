$(function () {
	refreshHeader();
	generateIndex();
	generateHorizonLine();

	syntaxHighlight();
	generateNote();

	//syntax highlight
	//SyntaxHighlighter.all();
	sh_highlightDocument();

	//console.log($("body").html());
});

function refreshHeader() {
	//auto generate header with the style x.x.x
	$("h1").each(function (i1, v1) {
		wrapHeader((i1 + 1), $(v1));
		$(this).nextAll("h2").each(function (i2, v2) {
			wrapHeader((i1 + 1) + "." + (i2 + 1), $(v2));
			$(this).nextAll("h3").each(function (i3, v3) {
				wrapHeader((i1 + 1) + "." + (i2 + 1) + "." + (i3 + 1), $(v3));
			});
		});
	});
}

function getTitle(s) {
	s = s.trim().replace(/&nbsp;/g, "");
	return s.charAt(0) >= '0' && s.charAt(0) <= '9' ? s.substring(s.indexOf(" ") + 1) : s;
}

function getOuterHtml(jqueryObj) {
	return $('<div>').append(jqueryObj.clone()).html();
}

function wrapHeader(header, hObj) {
	if (hObj.find('a').length && hObj.find('a').first().attr("href")) {
		hObj.find('a').html(getHeaderIndent(hObj) + header + " " + getTitle(hObj.find('a').html()));
	} else {
		hObj.html((isIndexPage() ? getHeaderIndent(hObj) : "") + header + " " + getTitle(hObj.text()));
		hObj.prepend("<a id='h" + header.toString().replace(".", "-") + "'></a>");
	}
}

//auto generate the index url
function generateIndex() {
	if ($("body.index").length == 0) {
		$("body").append("<p class='index'><a href='index.htm'>Index</a></p>");
	}
}

function isIndexPage() {
	return $("body.index").length > 0;
}

function generateHorizonLine() {
	var titleObj = $("p#title");

	if (titleObj.length == 0) return;

	if (!isIndexPage()) {
		var h1 = $("h1");

		if (h1.length) {
			titleObj.after("<hr/ >");
			titleObj.after("<hr/ >");

			var hrObj = $("hr:last-of-type");
			var h2 = $("h2");
			h1.each(function (index) {
				var h1Index = $(h1.get(index)).clone();
				var headerId = getIndexSeq(h1Index);
				var h2List = getSecondHeader($(h1.get(index)));
				h1Index.find("a").remove();
				hrObj.before(h1Index.wrapInner($("<a href=#" + headerId + "></a>")));

				//generate second-level header
				h2List.each(function (h2Idx) {
					var h2Obj = h2List.get(h2Idx).clone();
					var h2HeaderId = getIndexSeq(h2Obj);
					h2Obj.find("a").remove();
					hrObj.before(h2Obj.wrapInner(("<a href=#" + h2HeaderId + "></a>")).prepend("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"));
				});
			});
		}
	} else {
		$("p#title").after("<hr/ >");
	}
}

function getIndexSeq(jqueryObj) {
	return jqueryObj.find("a").attr("id");
}

function getSecondHeader(h1Obj) {
	var h2List = $("h2");
	var headerStr = getIndexSeq(h1Obj) + "-";
	var resultList = new Array();
	var resultIndex = 0;
	h2List.each(function (index) {
		if ($(h2List.get(index)).find("a").length) {
			var a1 = $(h2List.get(index)).find("a").first();
			if (a1.attr("id")) {
				if (a1.attr("id").toString().indexOf(headerStr) == 0) {
					resultList[resultList.length] = $(h2List.get(index));
				}
			}
		}
	});

	return $(resultList);
}

function getHeaderIndent(headerObj) {
	var tagName = headerObj.prop("tagName").toUpperCase();

	if (!tagName || tagName.indexOf("H") != 0) return;

	tagName = tagName.replace("H", "");
	var result = "";
	var level = parseInt(tagName) - 1;
	for (var i = 0; i < level; i++) {
		result += "&nbsp;&nbsp;&nbsp;&nbsp;";
	}

	return result;
}

//wrap the note
function generateNote() {
	$("p.note").each(function (index, p) {
		var noteTag = $("<div></div>").addClass("ui-widget")
			.html("<div class='ui-state-highlight ui-corner-all' style='margin-top: 20px; padding: 0 .7em;'>" +
				"<p><span class='ui-icon ui-icon-info' style='float: left; margin-right: .3em;'></span>" +
				$(p).html() + "</p></div>");
		console.log($(p).prev().html());
		$(p).prev().after(noteTag);
	});

	$("p.note").remove();
}

//code syntax highlight
function syntaxHighlight() {
	$("pre.code").each(function (index, p) {
		var codeType = "sh_csharp";
		if ($(p).attr("data-type")) {
			codeType = getCode($(p).attr("data-type"));
		}

		if ($(p).attr("data-collapsed")) {
			var title = "Sample Code";
			if ($(p).attr("title")) {
				title = $(p).attr("title");
			}
			
			var accordionDiv = "<div id='accordion-code-" + index + "'";

			if ($(p).attr("data-collapsed") == "false") {
				accordionDiv += " init-status='expanded'"
			}
			else {
				accordionDiv += " init-status='collapsed'"
			}
			
			accordionDiv +=  "></div>"
			
			//console.info(accordionDiv);
			
			var codeTag = $(accordionDiv)
				.html("<p><a href='#'>" + title + "</a></p>" +
					"<pre class='" + codeType + "'>" + $(p).html() +
					"</pre></div>");
			
			//console.info(($('<div>').append(codeTag).clone()).html());
		} else {
			var codeTag = $("<pre></pre>").addClass(codeType)
				.html($(p).html());
		}

		$(p).replaceWith(codeTag);
	});

	$("pre.code").remove();
}

function getCode(code) {
	return "sh_" + code;
}

function test() {
	if ($("h2").find('a').length) {
		alert('ss');
	}
	else {
		alert('bb');
	}
}

