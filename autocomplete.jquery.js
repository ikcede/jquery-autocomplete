(function($) {
	
	$.fn.autocomplete = function(settings) {
		
		// Set up element 
		var el = this[0];
		if(typeof(el)==="undefined") return false;
		
		// Set up id tagging for default settings
		var id = "";
		if(el.id && el.id != "") {
			id = el.id.substring(1);
		} else {
			id = "autocompleted";
		}
		
		var settings = $.extend({
			data: 				[],
			target: 			$("#"+id+"-area"),
			algorithm: 			"string-match", 		// Only supported algo atm
			sorting: 			"alphabetical",
			hideTargetIfEmpty:  false,
			createTarget:		true,
			displayAllIfEmpty:  false
		}, settings);
		
		el.acdata = settings.data;
		el.acval = $(el).val();
		
		//--------------------------------------------
		// Algorithms
		//--------------------------------------------
		
		var simple_match = function(needle, data) {
			
			needle = needle.toLowerCase();
			output = [];
			
			for(var i=0;i<data.length;i++) {
				if(data[i].indexOf(needle) > -1) {
					output.push(data[i]);
				}
			}
			
			return output;
		
		};
		
		//--------------------------------------------
		// Sorting
		//--------------------------------------------
		
		var sort_alpha = function(a,b) {
			if(a == b) return 0;
    		return a > b ? 1 : -1;
		};
		
		//--------------------------------------------
		// Rendering
		//--------------------------------------------
		var render = function(data) {
			if(typeof(settings.target[0]) === "undefined") {
				if(settings.createTarget) {
					tar_el = $.parseHTML("<div id='#"+id+"-area'></div>");
					$(el).after(tar_el);
					settings.target = tar_el;
				} else {
					return false;
				}
			}
			
			var tar = $(settings.target[0]);
			
			// Could be like a dropdown input
			if(data.length == 0 && settings.hideTargetIfEmpty) {
				tar.html("").hide();
			}
			
			var s = "<ul id='"+id+"-aclist'>";
			for(var i=0;i<data.length;i++) {
				s+="<li class='"+id+"-acitem'>"+data[i]+"</li>";
			}
			s+="</ul>";
			tar.html("").append(s);
			
			return true;
		};
		
		//--------------------------------------------
		// Event binding
		//--------------------------------------------
		
		$(el).on("keyup", function() {
			
			// Ignore keypresses that don't do anything
			if(this.acval == $(this).val()) return true;
			else this.acval = $(this).val();
			
			// Display nothing but do not hide
			if(this.acval == "" && !settings.displayAllIfEmpty) {
				render([]);
				return true;
			}
			
			// Match:
			var matches = null;
			
			if(settings.algorithm == "string-match") {
				matches = simple_match($(this).val(), this.acdata);
			}
			
			if(null == matches) return true; // Nothing happened
			
			// Sort:
			if(settings.sorting == "alphabetical") {
				matches.sort(sort_alpha);
			} else {
				matches.sort(settings.sorting);
			}
			
			// Render:
			render(matches);
		
		});
		
	};
	
}(jQuery));