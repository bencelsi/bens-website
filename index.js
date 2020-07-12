(function(){

	window.onload = function() {
		get("photo").onclick = ()=>{
			get("photo").src = 'photos/' + random(1,53) + '.jpg';
			
		}
	}

	//returns the element with the given id
	function get(id) {
		return document.getElementById(id);
	}
	
	function random(min, max) { 
		return (min + (Math.floor(Math.random() * (max - min))));
	} 

})();




/*
	Stuff to add soon

	Videos
	Games
	Photography
	Art
	Writing

	(Separate pages?)
*/