(function(){
	window.onload = function() {

		//playSound('joeloop', .7, true, 'mp3')
		
		// MUSIC LOGIC
		// let musicPlaying = false
		// let music = null
		// get('header').onclick = () => {
		// if (music == null) {
		// 		music = new Audio()
		// 		music.src = 'aud/joeloop.wav'
		// 		music.onended = function(){
		// 			music.play();
		// 		}
		// 		music.play();
		// 	} 
		// 	if (musicPlaying) {
		// 		music.volume = 0
		// 		musicPlaying = false
		// 	} else {	
		// 		music.volume = .3
		// 		musicPlaying = true
		// 	}	
		// }

		// TAB LOGIC
		var tabs = getAll('tab')
		Array.from(tabs).forEach(
			(tab, index, array) => {
			tab.onclick = (tab) => {
				playSound('click2', .7)
				hidePages()
				page = get(event.target.parentElement.getAttribute('page'))
				page.style.display = 'inline'
			}
		})

		// VIDEO LOGIC
		let videos = [
			'https://www.youtube.com/embed/LaAjKX-p5hk', // One Second a Day
			'https://www.youtube.com/embed/v_5L8a_xal0', // Dad, Listen
			'https://www.youtube.com/embed/7_Iday6w0kI', // Casiopea Forever
			'https://www.youtube.com/embed/Tdb0E7uegyc', // I Yam What I Yam
			'https://www.youtube.com/embed/aqviXXbtiUg', // California Girls
			'https://www.youtube.com/embed/1l3XTtqRtTg', // Nose
			'https://www.youtube.com/embed/W-ofqDuES7U', // Cat Reacts
			'https://www.youtube.com/embed/Es_YxQToays', // Ok, Let's Go Ahead And Get Started
			'https://www.youtube.com/embed/0o0ZN87-Yj4', // I Am A Robot
			'https://www.youtube.com/embed/tEFIzkKNBFs', // University of Washington (Opening Credits)
			'https://www.youtube.com/embed/dtdh8s74GI4', // Video Lab Detritus
			'https://www.youtube.com/embed/5qnW6m7BPpI', // Snakehips
			'https://www.youtube.com/embed/NzcUOxN2IuM', // Champagne Music
			'https://www.youtube.com/embed/Bne3uCHS-Bw', // ABBA SHREDS
			'https://www.youtube.com/embed/emlw9bLSbcA', // Dream A Little Dream Of God
			'https://www.youtube.com/embed/Wcy7xzgBQis', // Everything Right is Wrong Again
			'https://www.youtube.com/embed/eIqaIGZZzLg', // Intersections
		]
		shuffle(videos)
		let videoIndex = 0
		get('videoScreen').src = videos[videoIndex]
		get('videoRight').onclick = () => {
			playSound('click', .5)
			videoIndex = (videoIndex == videos.length - 1 ? 0 : videoIndex + 1)
			get('videoScreen').src = videos[videoIndex]
		}
		get('videoLeft').onclick = () => {
			playSound('click', .5)
			videoIndex = (videoIndex == 0 ? videos.length - 1 : videoIndex - 1)
			get('videoScreen').src = videos[videoIndex]
		}
		get('videoRandom').onclick = () => {
			playSound('trill', .5)
			videoIndex = random(0, videos.length - 1)
			get('videoScreen').src = videos[videoIndex]
		}

		// PHOTO LOGIC
		let maxPhoto = 201
		let photos = [...Array(maxPhoto + 1).keys()]
		shuffle(photos)
		let photoIndex = 0
		get('photo').src = 'photos/' + photos[photoIndex] + '.jpeg'
		get('photoRight').onclick = () => {
			playSound('click', .5)
			photoIndex = (photoIndex == maxPhoto ? 0 : photoIndex + 1)
			get('photo').src = 'photos/' + photos[photoIndex] + '.jpeg'
		}
		get('photoLeft').onclick = () => {
			playSound('click', .5)
			photoIndex = (photoIndex == 0 ? maxPhoto : photoIndex - 1)
			get('photo').src = 'photos/' + photos[photoIndex] + '.jpeg'
		}
		get('photoRandom').onclick = () => {
			playSound('trill', .5)
			photoIndex = random(0, maxPhoto)
			get('photo').src = 'photos/' + photos[photoIndex] + '.jpeg'
		}

	}
		
	// HELPERS
	function playSound(name, volume = 1, format='.wav') {
		audio = new Audio();
		audio.volume = volume
		//audio.playbackRate = 1.2
		audio.src = 'aud/' + name + format
		
		audio.play();
	}
	function hidePages() {
		pages = getAll('page')
		Array.from(pages).forEach(
			(page) => {
				page.style.display = 'none'
			}
		)	
	}

	function shuffle(array) {
		for (i = 0; i < array.length; i++) {
			randomIndex = random(i, array.length - 1)
			temp = array[i]
			array[i] = array[randomIndex]
			array[randomIndex] = temp
		}
	}

	function random(min, max) { 
		return (min + (Math.floor(Math.random() * (max - min))))
	}

	function getAll(clazz) {
		return document.getElementsByClassName(clazz)
	}

	function get(id) {
		return document.getElementById(id)
	}

})()