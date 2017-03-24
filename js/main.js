/*
Coded by Raman Choudhary
*/

'use strict';

var channelId = 'UCXgGY0wkgOzynnHvSEVmE3A';
var apiKey = 'AIzaSyAOYG1Ai4mZy6L-ifZgQ8bzS87vA6v3JdA';
var nextPage = null;
var resultPerPage = 5;

$(document).ready(function () {
	// typed.js
	$(function () {
		$("#typedHC").typed({
			strings: ['<span class="var">myWorld</span> = <span class="init">code</span>;'],
			typeSpeed: 100
		});
	});
    
    //init readmore for reviews
    
    $('.review .cont p').readmore({
      speed: 75,
      collapsedHeight: 130,
      moreLink: '<a href="#">Read more</a>',
      lessLink: '<a href="#">Read less</a>'
    });

	getVideos();
});

$('.next-page').click(function () {
	getVideos();
});

function getVideos() {
	var url = 'https://www.googleapis.com/youtube/v3/search?key=' + apiKey + '&channelId=' + channelId + '&part=snippet,id&order=date&maxResults='+resultPerPage;

	if (nextPage) {
		console.log('next page url');
		url = 'https://www.googleapis.com/youtube/v3/search?key=' + apiKey + '&pageToken=' + nextPage + '&channelId=' + channelId + '&part=snippet,id&order=date&maxResults='+resultPerPage;
	}

	$.get(url).then(function (res) {
		console.log(res);
		var videos = res.items;
		nextPage = res.nextPageToken;
		videos.map(function (video) {
			$('.video-area').append(renderVideoThumnbnail(video));
		});
	}).catch(function (err) {
		console.log(err);
	});
}

function showVideoModal(videoId) {
	$('.bs-example-modal-lg').modal({ show: true });
	$('.iframe-video').attr('src', "https://www.youtube.com/embed/" + videoId + "?ecver=1");
}

$('.bs-example-modal-lg').on('hidden.bs.modal', function (e) {
	$('.iframe-video').attr('src', '');
});

function renderVideoThumnbnail(video) {
	return '<div class="col-xs-12 w100" onclick="showVideoModal(\'' + video.id.videoId + '\')">\n\t\t\t\t<div class="video-wrap">\n\t\t\t\t\t<div class="row">\n\t\t\t\t\t\t<div class="col-md-4">\n\t\t\t\t\t\t\t<div class="img-wrap">\n\t\t\t\t\t\t\t\t<img src="' + video.snippet.thumbnails.high.url + '" class="img-res" alt="" />\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="col-md-8">\n\t\t\t\t\t\t\t<div class="cont-wrap">\n\t\t\t\t\t\t\t\t<div class="cont">\n\t\t\t\t\t\t\t\t\t<h3>' + video.snippet.title + '</h3>\n\t\t\t\t\t\t\t\t\t<p>' + video.snippet.description + '</p>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div>\n\t\t\t\t\t\t\t\t\t<time>' + moment(video.snippet.publishedAt).fromNow() + '</time>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t</div>';
}