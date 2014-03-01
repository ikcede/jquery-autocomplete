jquery-autocomplete
===================

Towards some more customization for autocomplete outputs.
Optimized for Chrome as usual.

Basic usage:

```html
<input type='text' id='autocomplete'></input>

<script type='text/javascript'>
$("#autocomplete").autocomplete();
</script>
```

For additional options:

```javascript
$("autocomplete").autocomplete({
	data: 				[],						// Array of words to match against
	target: 			$("#"+id+"-area"),		// Output div selector
	algorithm: 			"string-match", 		// Choose which algorithm you want
	sorting: 			"alphabetical",			// How the output is sorted
	hideTargetIfEmpty:  false,					// Will hide target if no data recieved
	createTarget:		true,					// Creates target if not existing
	displayAllIfEmpty:  false					// Displays target if empty
});
```

The only available algorithm right now is the "string-match" algorithm. 
This algorithm does simple indexOf matching of strings, after converting the input into lowercase.

Only supported sorting right now is alphabetical.

Target is populated like this: 
If "autocomplete" is the id of the original element,

```html
<ul id='autocomplete-aclist'>
	<li class='autocomplete-acitem'>Matched item</li>
	<li class='autocomplete-acitem'>Matched item</li>
	<!-- ... -->
</ul>
```