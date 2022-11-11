 //////Smooth Scroll Demo ////////////
 ////use this in console//
 //here 200 will take 200px down , means that your page will scroll down to the position of 200px 
//  window.scrollTo(0,200);
//  window.screenTop(0,400);

//this will tell your the current position on the screnn
//  window.pageYOffset

//this will scroll each step by 100px
// window.scrollBy(0, 100)


///////// Smooth Scroll Hint 1 //////////////////////////////////////

// The setInterval() method calls a function at specified intervals (in milliseconds).
// The setInterval() method continues calling the function until clearInterval() is called, or the window is closed.
// 1 second = 1000 milliseconds.
/*var scrollInterval = setInterval(function(){
    //setting the interval , each step it will take is of 50px
    window.scrollBy(0,50);
} , 50);// after every 50 milisec the interval  will repeat
//this will stop the interval
clearInterval(scrollInterval);//the interval which we want to clear we will insert that interval name here it is , 'scrollInterval'
*/


/*
//2nd Method : in this we will travel to a particular distance and than we will call the clearInterval()
//starting from 0 and will scroll till 1500px
var tragertPos = 1500;
var currentPos = 0;

var scrollInterval = setInterval(function(){
    //when the currentPos will be greater than  the targetPos we have to stop scrolling 
    if(currentPos >= tragertPos){
        clearInterval(scrollInterval);
        return;
    }
    currentPos += 50;//we will increase currentPos by 50
    window.scrollBy(0 , 50);//each step of scrolling will be 50px
} , 50)// time is 50 mili-sec
*/

/*
//to get the cordinate of the particular section
var educatioSection = document.getElementById('education');
var coordinates = educatioSection.getBoundingClientRect();
console.log(coordinates);//this will give us the coordinates
*/


/*
//Here We have to handel clicks on all the anchor tag

//fetchng all the anchor tag within the 'nav-menu' on which we have to handle the click event
var navMenuAnchorTags = document.querySelectorAll('.nav-menu a');
console.log(navMenuAnchorTags)
//travresing over the anchor Tag
for(var i = 0 ; i < navMenuAnchorTags.length; i++){
    //handling the click function over each anchor Tag
    navMenuAnchorTags[i].addEventListener('click' , function(event){
        //the anchor Tag has some Default behaviour already attach to it so first we have to stop that using 'event.preventDefalut()' and 
        //than we can attach any new behaviour to it , ie in this we are ging to add Scrolling behaviour
        event.preventDefault();

        //this: this keyword will give us the current anchor Tag which is clicked , the use of this is same as we have seen in JAva
        // this.textContent : Return the text content of an element
        // trim(): Removes spaces
        //here we are taking out the text which is present in the anchor Tag , than triming it and than converting it ot lower case , so that
        //it matches with the Id which we  given to each Section
        var targetSectionID = this.textContent.trim().toLowerCase();
        var targetSection = document.getElementById(targetSectionID);//taking the reference of that section using the id
        console.log(targetSection);
        //NOw handling the Scroll behaviour on that section
        var interval = setInterval(function(){
            //fatching the coordinates for the target section from the current position
            var targetSectionCoordinates = targetSection.getBoundingClientRect();
            //top: represent how far it is from the window , as we go closer to the traget section the value of the top start decreasing
            if(targetSectionCoordinates.top <= 0){
                clearInterval(interval);//stop
                return;           
            }
            window.scrollBy(0, 50);
        } ,20)

    })
}
*/

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
////// ANOTHER APPROACH TO WRITE THE CODE //////////////////////////

//Here We have to handel clicks on all the anchor tag

//fetchng all the anchor tag within the 'nav-menu' on which we have to handle the click event
var navMenuAnchorTags = document.querySelectorAll('.nav-menu a');
console.log(navMenuAnchorTags)
var interval; // assigning the interval oustide so as to make it global , so thet we can use it in the function also
//travresing over the anchor Tag
for(var i = 0 ; i < navMenuAnchorTags.length; i++){
    //handling the click function over each anchor Tag
    navMenuAnchorTags[i].addEventListener('click' , function(event){
        //the anchor Tag has some Default behaviour already attach to it so first we have to stop that using 'event.preventDefalut()' and 
        //than we can attach any new behaviour to it , ie in this we are ging to add Scrolling behaviour
        event.preventDefault();

        //this: this keyword will give us the current anchor Tag which is clicked , the use of this is same as we have seen in JAva
        // this.textContent : Return the text content of an element
        // trim(): Removes spaces
        //here we are taking out the text which is present in the anchor Tag , than triming it and than converting it ot lower case , so that
        //it matches with the Id which we  given to each Section
        var targetSectionID = this.textContent.trim().toLowerCase();
        var targetSection = document.getElementById(targetSectionID);//taking the reference of that section using the id
        console.log(targetSection);
        //NOw handling the Scroll behaviour on that section
                            //function name            //aggumnet if the function
        //interval = setInterval(scrollVertically , 20 , targetSection);
                         //OR
         interval = setInterval(function(){
            //here we have created the function separity and calling that function
            scrollVertically(targetSection)

        } ,20)

    })
}

function scrollVertically(targetSection){
             //fatching the coordinates for the target section from the current position
            var targetSectionCoordinates = targetSection.getBoundingClientRect();
            //top: represent how far it is from the window , as we go closer to the traget section the value of the top start decreasing
            if(targetSectionCoordinates.top <= 0){
                clearInterval(interval);//stop
                return;           
            }
            window.scrollBy(0, 50);   

}

////////////////////////////////////////////////////////////////////////////////////////////////////////
/////// Skill Bar Demo ///////////
// step1: Handle scroll event on window
// step2: check weither the skill section container is visible or not
// step3: ensure that initial width of the colored skill divs is Zero -> initilised/Reset to 0 width value
// step4: Strat animation on every skill -> increase screen width form 0 to skill level at regular interval
// step5: store skill level -> Html with the help data attribute

var progressBars = document.querySelectorAll('.skill-progress > div');
var skillsContainer = document.getElementById('skills-container');
window.addEventListener('scroll' , checkScroll);
var animationDone = false; 

// Intitailly we have to set the width of all the bar to 0
function initialiseBars(){
    for(let bar of progressBars){
        bar.style.width = 0 + '%';     
    }
}
initialiseBars();//calling the function to set the width to skill bar to 0


// Here we will make the function to fill the bar
function fillBar(){
    for(let bar of progressBars){
        // we have to figure out the target width using the 'getAttribute' attribute  
        let targetWidth = bar.getAttribute('data-bar-width');
         let currentWidth = 0;
         let interval = setInterval(function(){
            //if we have reached the target width we will stop
            if(currentWidth > targetWidth){
                clearInterval(interval);
                return;
            }
            //else we will increase currentWidth and update bar width
            currentWidth++;
            bar.style.width = currentWidth +'%';
         } , 5)

    }
}
function checkScroll(){
    //you have to check whether skill container is visible
    var coordinates = skillsContainer.getBoundingClientRect();
    //we will compare coordinate.top with the view-put height of the screen
    // window.innerHeight : The innerHeight property returns the height of a window's content area.
    // !animationDone ://we are taking this so as to perform the animation only ones when we have scroll to skill section , if we will not to this than the animation will keep animating the no. of time we scroll
    if(!animationDone && coordinates.top < window.innerHeight){
        //when this condition arriess we have to fire the filling animation
        console.log('skill section visible')
        animationDone = true;
         fillBar();
    }

    //when screen section is not visible we sholud set animationDone to be 'false'
    else if(coordinates.top > window.innerHeight){
        animationDone = false;
        initialiseBars();
    }
}

//********** *MAKING THE CONTACT LIST USING SMTP *******////////

//we are using SMPT to make the contact list responsive
// https://www.youtube.com/watch?v=6cdqwkDtAkc
// https://app.elasticemail.com/marketing/settings/new

function Mail(){

    let name = document.getElementById("input-name").value;
    let email = document.getElementById("input-email").value;
    let message = document.getElementById("input-message").value;
     

    Email.send({
        
        SecureToken : "8482baba-736c-4dc0-88e4-0fb44338c45d",
        To : 'abhayranjan471@gmail.com',//receiver mail on which u want to receive all the mail
        From : "codeialdev000@gmail.com",//mail will come through this 
        Subject : "Mail From Contact Form",
        Body : "User Name: "+ name +'<br/> User Email: ' + email+'<br/> User Message: '+ message
    }).then(
      message => alert(message)
    );
}
