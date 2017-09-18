  function outputMoney(number)  {   
	if(number<0) {
		  return   '-'+outputDollars(Math.floor(Math.abs(number)-0)+'');   

	 } else {
	 
		  return   outputDollars(Math.floor(number-0)+'');   

	}   
  }
  function outputDollars(number) {   

	  if(number.length<=3) {   

		  return   (number   ==''? '0':number);  
		  
	  } else {   

		  var mod=number.length%3;   
		  var output=(mod==0?'':(number.substring(0,mod)));   
		  for(i=0;i<Math.floor(number.length/3);i++) {   
		  if ((mod==0) && (i==0))   
			  output+=number.substring(mod+3*i,mod+3*i+3);   
		  else   
			  output+=','+number.substring(mod+3*i,mod+3*i+3);   
		  }   
		  return (output);   
	  }   
 } 