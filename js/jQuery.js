//============All functions will only operate once the document has completely loaded using the JQuery basic .ready() function.===================
$(document).ready(function () {
  //||chained effects||| function - changes font color, font size and includes fadeIn/Out when page loads
  $("h1#animateH1").css("color", "#46c1bd").css("font-size", "70px").fadeOut(1000).fadeIn(3000);


  //Function allocated to animation methods to decrease/increase opacity and font size
  $("div.head-content").hover(function animateH1() {
    $("h1#homeH1").animate({
      opacity: '0.1',
      fontSize: '40px',
    }, 1000).animate({
      opacity: '1',
      fontSize: '60px',
    }, 3000), animateH1(); //called back so it runs again
  })

  //when the h1 element is hovered over the following elements appear...
  $("h1#animateH1").hover(function () {
    $("div.cart-container").show(2000);
    $("div.accordion").show(2000);
  });


  /* ===========================================The Accordion Drop-Down Menus==================================== */
  /*When the a_title html elements are hovered the function below is called. 
  - Then the closest() method is allocated to the elements to return the div.a_item parent element 
    at a time in order to find the child element (div.a_content).
  - Then div.a_content is allocated the slideToggle effect that runs at 1 second.*/
  $(".a_title").click(function () {
    $(this).closest(".a_item").find(".a_content").slideToggle(1000);
  });
}); //End of .ready() function
