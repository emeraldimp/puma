function Music(obj, id) {
	musictag = document.getElementById(id);
	if (obj.getAttribute('playing') == "true") {
		musictag.StopPlay();
		obj.setAttribute('playing','false');
		return;
	}
	else {
		musictag.Play();
		obj.setAttribute('playing','true');
	}
}
