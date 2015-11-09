
angular.module("reddit-match",[]).controller("RedditMatchCtrl",["$scope", "$window", "$http",function($scope, $window, $http){
	$scope.cards = {};
	console.log('scalklj');

	$http.get("http://www.reddit.com/r/aww/.json").then(
		successCallback, errorCallback

		);
	function successCallback(response){
		$scope.cards = response.data.data.children;
		angular.forEach($scope.cards, function(card, index) {
			if(card.data.url.indexOf('imgur') == -1){
				$scope.cards.splice(index, 1, card);
				console.log(card);
			}
			if(card.data.url.indexOf('.jpg') == -1 && card.data.url.indexOf('.gfv') == -1){
				card.data.url = card.data.url + '.jpg';
			}
		});
		console.log($scope.cards);
	}
	function errorCallback(){
		alert('nope');
	}

}]).service("Cards",["DataSrc",function(DataSrc){
    // var dataSrc = new DataSrc("/json/user/skills",{key:"id",dataType:"NoDupesArray"});
    // return dataSrc;
}])












// $.getJSON("http://www.reddit.com/r/aww/.json?jsonp=?", function(data) { 

//     $.each(data.data.children, function(i,item){
	    		
//     	var url = item.data.url
// 	   /* 
// 		different way to do it, which i might want again later
// 	   if (item.data.url.length < 29) {
// 	    		$("<img class='photo'/>").attr("src", item.data.url+".jpg").appendTo(".photos");
// 	    		}
// 	    else {
// 	    		$("<img class='photo'/>").attr("src", item.data.url).appendTo(".photos");
// 	    	}*/
// 	    	//this way sets the image as the background image of the div rather than creating an img element
// 	    	 if (item.data.url.length < 29) {

// 	    		$("<div class='photo'>").css("background-image", 'url('+url+".jpg"+')').appendTo(".photos");
// 	    		$("</div>").appendTo(".photos");
// 	    		}
// 	    	else {
// 	    		$("<div class='photo'>").css("background-image", 'url('+url+')').appendTo(".photos");
// 	    		$("</div>").appendTo(".photos");
// 	    	}
		
// 		//adding the titles

// 		if (item.data.url.length < 29) {

//      			$("<li class='data-row='1' data-col='1' data-sizex='2' data-sizey='2' text-center title'>").text(item.data.title).css("background-image", 'url('+url+".jpg"+')').appendTo(".titles");
//      			}
// 	    	else {
//      			$("<li class='data-row='1' data-col='1'' data-sizex='2' data-sizey='2' text-center title'>").text(item.data.title).css("background-image", 'url('+url+')').appendTo(".titles");
//      			}

//     	$("</li>").appendTo(".titles"); 

//     	return i<10;

//     });





// 	var cards=$(".title");
	
// 	shuffleCards(cards)

// function shuffleCards(cards){
// 	// maybe dont need to re-assign variable
	
// 	var currentIndex = cards.length, temporaryValue, randomIndex;

// 	// While there remain elements to shuffle...
// 	while (0 !== currentIndex) {
// 		// Pick a remaining element...
// 		randomIndex = Math.floor(Math.random() * currentIndex);
// 		currentIndex -= 1;

// 		// And swap it with the current element.
// 		temporaryValue = cards[currentIndex];
// 		cards[currentIndex] = cards[randomIndex];
// 		cards[randomIndex] = temporaryValue;
// 	};
// 	cards.each(function(index,card){
// 		$(".titles").prepend(card);
// 	});
// 	return cards;
// };


// $(function(){ //DOM Ready
 
//     $(".gridster ul").gridster({
//         widget_margins: [10, 20],
//         widget_base_dimensions: [140, 200]
//     });
 
// });
 
// });

