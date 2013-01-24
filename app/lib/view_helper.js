// Put your handlebars.js helpers here.
Handlebars.registerHelper("debug", 
   function(optionalValue) { 
      console.log("Current Context"); console.log("====================");
      console.log(this);  
      if (optionalValue) { 
         console.log("Value"); 
         console.log("===================="); 
         console.log(optionalValue); 
      }
   }
);

Handlebars.registerHelper("active",
   function(value){
      if(value) {
         return new Handlebars.SafeString("active");
      }
   }
);