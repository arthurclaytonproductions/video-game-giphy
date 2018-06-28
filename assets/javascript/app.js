    // Global Array
    // Array of Video Games
    var topics = ['Super Mario Brothers', 'Sonic The Hedgehog', 'Street Fighter', 'Halo', 'Uncharted', 'The Legend Of Zelda'];
    var stillImages = '';
    var animateImages = '';
    var stillImageUrl = '';
    var animateImageUrl = '';
    var giphy = '';


    // functions
    var createButtons = function(){
        //clears videogameBtn section
        $('#videogameBtns').empty();
        // loop to create buttons in array
        for (var i = 0; i < topics.length; i++){
            //creates new buttons
            var newButton = $('<button>');
            //attribute to a button
            newButton.attr('data-name', topics[i]);
            newButton.attr('class', 'gif');
            newButton.text(topics[i]);
            $('#videogameBtns').append(newButton);
        }
    }
    // create new videogames and buttons to add to the array
    $('#addVideogame').on('click', function(){
    var newvideogame = $('#videogame-input').val().trim();
    //add new game to array
    topics.push(newvideogame);
    createButtons();
    return false;
    })


    var displayVgGifs = function(){
    var videogame = $(this).data('name');
    // My Api Key
    var apiKey = 'BAwzur17PG1Q7jQPxim3X7Aa8W6ovxIV';
    // The URL we need to query the database 
    var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + videogame + '&api_key=' + apiKey;
    // Creates AJAX call for the specific video game giphy 
    $.ajax({url: queryURL, method: 'GET'}).done(function(response) {
        $('#videogames').empty();
        var gameTitle = $('<h1>');
            gameTitle.html(videogame);
            $('#videogames').append(gameTitle);
            // loop for to gifs 10 total
        for (var i = 0; i < 10; i++) {
            //Still and Moving Images
            stillImages = response['data'][i]['images']['fixed_height_still']['url'];
            movingImages = response['data'][i]['images']['fixed_height']['url'];
            //rating
            var rating = response['data'][i]['rating'];
            //Assign image element to new Image variable
            var newDiv = $('<div>');
            var newPar = $('<p>'); 
            var newImages = $('<img>');
            //Give img element stillImgUrl, animated  & src attribute
            newImages.attr('data-still', stillImages);
            newImages.attr('data-animate', movingImages);
            newImages.attr('src', stillImages);
            newImages.attr('data-type', 'still');
            newImages.addClass('gifImage');
            //the rating texts
            newPar.html('Rating: ' + rating);
            $(newPar).appendTo(newDiv);
            $(newImages).appendTo(newDiv);
            $('#videogames').append(newDiv); 
        }
    });
    }

var vgGifAnimate = function() {
    //makes gif still or animated
    giphy = $(this).data('type');
    stillImageUrl = $(this).data('still');
    animateImageUrl = $(this).data('animate');
    if (giphy === 'still') {
        //Switches to animated image
        $(this).attr('src', animateImageUrl);
        $(this).data('type', 'animate');
        //Testing
        console.log(giphy);
    } else if (giphy === 'animate') {
        //Switches to still image
        $(this).attr('src', stillImageUrl);
        $(this).data('type', 'still');
     }
}


createButtons();
$(document).on('click', '.gif', displayVgGifs);
$(document).on('click', '.gifImage', vgGifAnimate);