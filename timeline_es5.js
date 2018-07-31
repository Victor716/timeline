//时间轴原生插件----ES5
//命名空间
(function() {
	var options = {
		width: 500,
		moveDelta: 150,
    	headWidth: 80,
    	n: 10,
    	curPosition: 0,
		templateUrl: 'timeline.html',
		nodeHtml:   "<div class='li-wrap'>" +
						"<div class='li-up'>" + 
							"<div class='event-title' id='name'></div>" +
						"</div>" + 
						"<div class='point'>" +
							"<div class='refer'>|</div>" +
							"<div class='dot'></div>" +
						"</div>" + 
						"<div class='li-down'>" + 
							"<div class='li-date' id='time'></div>" +
							"<div class='li-date' id='year'></div>" + 
						"</div>" +
					"</div>"
	}
    /**
     * get html template through url
     * @param {Object} url
     */
    function getTemplate(url, arr) {
    	var xhr = new XMLHttpRequest();
    	xhr.onreadystatechange = function() {
    		if(xhr.readyState == 4) { // 4 = "loaded"
    			if (xhr.status == 200) { // 200 = "OK"
    				var ele = document.getElementById("tl");
    				ele.innerHTML = xhr.response;
    				if (ele.parentElement.tagName == 'BODY') {
    					ele.style.width = options.width + 'px';
    				}
    				var mobile = ele.querySelector("#mobile");
    				//加载事件
    				for (var i = 0; i < arr.length; i++) {
    					var li = document.createElement("li");
    					li.id = i;
    					li.innerHTML = options.nodeHtml;
    					li.querySelector("#name").innerText = arr[i].name;
    					li.querySelector("#time").innerText = arr[i].time;
    					li.querySelector("#year").innerText = arr[i].year + i;
    					mobile.appendChild(li);
    				}
    				
    				var tlc = ele.querySelector("#tlc");
    				tlc.onmousewheel = function() {
    					wheel(event, tlc);
    				};
    				
    			} else {
    				alert("Problem retrieving XML data:" + xhr.statusText);
    			}
    		}
    	};
    	xhr.open("GET", url, true);
    	xhr.send();	
    }
    
    function wheel(event, parentEle) {
    	var component = parentEle,
    		dom = component.querySelector("#mobile"),
    		totalLen = component.offsetWidth - options.headWidth,
    		leftBoundary = 0,
    		rightBoundary = intCeil(dom.offsetWidth - totalLen);
    	if(dom.style.left.length > 0) {
    		options.curPosition = extractNum(dom.style.left);
    	} else {
    		options.curPosition = 0;
    		dom.style.left = "0px";
    	}

    	if(event.wheelDelta > 0 && options.curPosition != leftBoundary) {
    		dom.style.left = (options.curPosition + options.moveDelta) + 'px';
    	} else if(event.wheelDelta < 0 && -options.curPosition <= rightBoundary) {
    		dom.style.left = (options.curPosition - options.moveDelta) + 'px';
    	}
    }
	//API
	var api = {
		config: function(opts) {
			if(!opts) return options;
			for(var key in opts) {
				options[key] = opts[key];
			}
			return this;
		},

		init: function (elem, arr) {
			getTemplate(options.templateUrl, arr);
		}
	}
	this.timeline = api;
})();

function Timeline(name) {
	this.name = name;
	this.default = {
		width: 500,
		moveDelta: 150,
    	headWidth: 80,
    	n: 10,
    	curPosition: 0,
		templateUrl: 'timeline.html',
		nodeHtml:   "<div class='li-wrap'>" +
						"<div class='li-up'>" + 
							"<div class='event-title' id='name'></div>" +
						"</div>" + 
						"<div class='point'>" +
							"<div class='refer'>|</div>" +
							"<div class='dot'></div>" +
						"</div>" + 
						"<div class='li-down'>" + 
							"<div class='li-date' id='time'></div>" +
							"<div class='li-date' id='year'></div>" + 
						"</div>" +
					"</div>"
	}
}


Timeline.prototype.init = function(element, arr) {
	this.getTemplate(arr);
}

Timeline.prototype.getTemplate = function(arr) {
	var self = this,
		options = self.default,
		url = options.templateUrl,
		xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function() {
		if(xhr.readyState == 4) { // 4 = "loaded"
			if(xhr.status == 200) { // 200 = "OK"
				var ele = document.getElementById("tl");
				ele.innerHTML = xhr.response;
				if(ele.parentElement.tagName == 'BODY') {
					ele.style.width = options.width + 'px';
				}
				var mobile = ele.querySelector("#mobile");
				//加载事件
				for(var i = 0; i < arr.length; i++) {
					var li = document.createElement("li");
					li.id = i;
					li.innerHTML = options.nodeHtml;
					li.querySelector("#name").innerText = arr[i].name;
					li.querySelector("#time").innerText = arr[i].time;
					li.querySelector("#year").innerText = arr[i].year + i;
					mobile.appendChild(li);
				}
	
				var tlc = ele.querySelector("#tlc");
				tlc.onmousewheel = function() {
					self.wheel(event, tlc);
				};
	
			} else {
				alert("Problem retrieving XML data:" + xhr.statusText);
			}
		}
	};
	xhr.open("GET", url, true);
	xhr.send();
}

Timeline.prototype.wheel = function(event, parentEle) {
	console.log("onwheel!");
	var options = this.default,
		component = parentEle,
		dom = component.querySelector("#mobile"),
		totalLen = component.offsetWidth - options.headWidth,
		leftBoundary = 0,
		rightBoundary = intCeil(dom.offsetWidth - totalLen);
	if(dom.style.left.length > 0) {
		options.curPosition = extractNum(dom.style.left);
	} else {
		options.curPosition = 0;
		dom.style.left = "0px";
	}
	
	if(event.wheelDelta > 0 && options.curPosition != leftBoundary) {
		dom.style.left = (options.curPosition + options.moveDelta) + 'px';
	} else if(event.wheelDelta < 0 && -options.curPosition <= rightBoundary) {
		dom.style.left = (options.curPosition - options.moveDelta) + 'px';
	}
}