$(function(){
   var bounceClass = 'animated bounce';
   var endClass = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';

   $('.reg').on({
       'click': function(){
           $('#regBtn').addClass(bounceClass).one(endClass, function(){
               $(this).removeClass(bounceClass);
           })
       }
   });
});
