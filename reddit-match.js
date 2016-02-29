
angular.module("reddit-match",[]).controller("RedditMatchCtrl",["$scope", "$window", "$http","$sce","shuffle","answerChoices", "$timeout", function($scope, $window, $http, $sce, shuffle,answerChoices, $timeout){
	$scope.cards = {};
	$scope.shuffledTitles = {};
	$scope.answerChoices = {};
	$scope.begin = 0;  
    $scope.end = 1;
    $scope.score = 0;
    $scope.subreddits = ['catloaf', 'animalsbeingderps', 'mildlystartledcats', 'tinyanimalsonfingers', 'HoldMyNip', 'StuffOnCats'];
    var after, changedPage;
	$http.get("http://www.reddit.com/r/aww/.json").then(
		successCallback, errorCallback);
   $scope.loadPhotos = function(subreddit){
   		changedPage = subreddit;
		$http.get("http://www.reddit.com/r/"+subreddit+"/.json").then(
		successCallback, errorCallback);
	}
	function successCallback(response){
		$scope.errorMessage = false;
		$scope.cards = response.data.data.children;
		after = response.data.data.after;
		angular.forEach($scope.cards, function(card, index) {
			if((card.data.domain != 'imgur.com' && card.data.domain != 'i.imgur.com') || card.data.url.indexOf('.gifv') != -1){
				$scope.cards.splice(index, 1);
			}
		});

		angular.forEach($scope.cards, function(card, index) {
			if(card.data.url.indexOf('.jpg') == -1 && card.data.url.indexOf('.gifv') == -1 && card.data.url.indexOf('.png') == -1){
				card.data.url = card.data.url + '.jpg';
			}if(card.data.url.indexOf('.gifv') != -1){
				//card.data.vidId = card.data.url.split("imgur.com")[1].split(".gifv")[0].split("/")[1]
				card.video = true;
				card.data.safeUrlwebm = $sce.trustAsResourceUrl(card.data.url.split(".gifv")[0]+'.webm');
				card.data.safeUrlmp4 = $sce.trustAsResourceUrl(card.data.url.split(".gifv")[0]+'.mp4');
			}

			
		});
		$scope.shuffledCards = shuffle($scope.cards);
		$scope.answers = shuffle(answerChoices($scope.shuffledCards, $scope.cards[$scope.begin]));
		$('body').animate({scrollTop:0}, 500, 'swing');
	}
	function errorCallback(){
		$scope.errorMessage = true;
		$('body').animate({scrollTop:0}, 500, 'swing');
	}


	 $scope.loadMore = function(){
	 	var subreddit = !changedPage ? 'aww' : changedPage;
            if($scope.begin < $scope.cards.length-1){
              $scope.begin += 1;  
              $scope.end += 1;
              $scope.answers = 0;
              $scope.shuffledCards = shuffle($scope.shuffledCards);
           	  $scope.answers = shuffle(answerChoices($scope.shuffledCards, $scope.cards[$scope.begin]));
            }else{
            	$http.get("http://www.reddit.com/r/"+subreddit+"/.json?after="+after).then(
		successCallback, errorCallback);
            	$scope.begin = 0;  
              	$scope.end = 1;
            	
            }
           $('body').animate({scrollTop:0}, 500, 'swing');
        };
     $scope.checkMatch = function(card){
     	if(card == $scope.cards[$scope.begin]){
     		card.correct = true;
     		$scope.score ++
     		$timeout(function(){
     			$scope.loadMore()
     		}, 700);
     	}else{
     		card.incorrect = true;
     		$timeout(function(){
     			card.incorrect = false;
     		}, 500);
     	}
     }
     
}]).factory("shuffle", function(){
	//puting shuffle in it's own factory in case we want to make some other iteration of the game where all cards are shuffled or something like that
	return function shuffle(array) {
		//makes a copy of the original aray before shuffling to avoid shuffling original array
		array = array.slice(0,array.length)
		  var m = array.length, t, i;

		  // While there remain elements to shuffle…
		  while (m) {

		    // Pick a remaining element…
		    i = Math.floor(Math.random() * m--);

		    // And swap it with the current element.
		    t = array[m];
		    array[m] = array[i];
		    array[i] = t;
		  }

		return array;
	}

}).factory("answerChoices", function(){

	//slices two cards off the shuffle and inserts the answer card into that new array
	return function answerChoices(array, card){
			var newArray = [];
		//push answer card into new array
		newArray.push(card);
		//push in new cards but makes sure they aren't duplicate of the answer card
		angular.forEach(array, function(shuffleCard){
			card.correct = false;
			card.incorrect = false;
			if(newArray.length < 3){
				if(shuffleCard != card){
					newArray.push(shuffleCard);
				}
			}else{
				
				return
			}

		});
		angular.forEach(newArray, function(card){
			card.correct = false;
			card.incorrect = false;
		});
		return newArray;
	}
	
	
}).config(function($sceDelegateProvider){
	 $sceDelegateProvider.resourceUrlWhitelist([
	   // Allow same origin resource loads.
	   'self',
	   // Allow loading from our assets domain.  Notice the difference between * and **.
	   'http://imgur.com',
	   'http://i.imgur.com/**']);

}).directive('imageonload', function() { //http://stackoverflow.com/questions/17884399/image-loaded-event-in-for-ng-src-in-angularjs
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                element.bind('error', function() {
                    //call the function that was passed
                    scope.$apply(attrs.imageonload);
                });
            }
        };
    })
//add items into an array until it has 3 items, don't allow any duplicates to be added. 

//need loading bar for when picture is loading
//need to prevent duplicates from being pushed into answer array
//need to figure out how to get videos to play
//would be cool to add a dropdown of other subreddits so you can select one and pass that into the get request- maybe earth porn, pics, cute kids, cat high five





