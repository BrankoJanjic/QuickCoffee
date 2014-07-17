
var listToolTip=[];
var brStola
var cena;
var canvas;
var json;
var newleft;
var edgedetection; //pixels to snap
var sredinaFiksiranogHorizontalnog;
var sredinaObjektaVertikalnog;
var pomHorizontalnog;
var sredinaObjektaHorizontalnog;
var sredinaFiksiranogVertikalnog;
var pokazivac=1;
var pomeraj1=20;
var pomeraj11=0;
var pomeraj2=20;
var pomeraj22=0;
var pomeraj3=40;
var pomeraj4=40;
var pomerajVelikiSto=0;
var pomerajMaliSto=0;
var pomerajZidVertikalni=0;
var pomerajZidHorizontalni=0;
var tooltip=0;
var pokazivacGrupa=1;
var savedState;
var activeResult;
function addVelikiSto()
{ 
 pokazivac=0;
	var text = new fabric.Text(''+pokazivacGrupa, {
  fontSize: 18,
  left:17,
  top:17
});
   var rect = new fabric.Rect({
		
		name:'veliki1'+" "+pomerajVelikiSto,
		fill: 'red',
		width: 60,
		height: 50,
		stroke: 'blue',
		strokeDashArray: [25, 25]
	});

var group = new fabric.Group([ rect, text ], {
 left: 200+pomeraj11,
 top: 0+pomeraj1,
 name:'veliki'+" "+pokazivacGrupa,
  selectable:true
});

rect.toObject = (function(toObject) {
  return function() {
    return fabric.util.object.extend(toObject.call(this), {
      name: this.name
    });
  };
})(rect.toObject);
//window.alert(group.toObject);
group.toObject = (function(toObject) {
  return function() {
    return fabric.util.object.extend(toObject.call(this), {
      name: this.name,
	  lockMovementX:this.lockMovementX,
      lockMovementY:this.lockMovementY
    });
  };
})(group.toObject);
canvas.add(group);
group.animate('left', rect.getLeft() === 200 ? 400 : 333, {
      duration: 1000,
      onChange: canvas.renderAll.bind(canvas),
      easing: fabric.util.ease.easeOutBounce
    });
	if(pomeraj1>canvas.height-80)
	{
	pomeraj1+=70-canvas.height
	pomeraj11+=4;
	}
	else
	{
      pomeraj1+=70;
    }
 pomerajVelikiSto+=1;
 canvas.hoverCursor = 'pointer';
 pokazivacGrupa+=1;
}
function addMaliSto()
{  pokazivac=0;
	var text = new fabric.Text(''+pokazivacGrupa, {
  fontSize: 18,
  left:17,
  top:17
});

var circle = new fabric.Circle({
  radius: 35,
  fill: 'red',
  
});

var group = new fabric.Group([ circle, text ], {
  left: 200+pomeraj22,
  top: 0+pomeraj2,
  name:'mali'+" "+pokazivacGrupa,
  selectable:true
});
circle.toObject = (function(toObject) {
  return function() {
    return fabric.util.object.extend(toObject.call(this), {
      name: this.name
    });
  };
})(circle.toObject);
//window.alert(group.toObject);
group.toObject = (function(toObject) {
  return function() {
    return fabric.util.object.extend(toObject.call(this), {
      name: this.name,
	  lockMovementX:this.lockMovementX,
      lockMovementY:this.lockMovementY
    });
  };
})(group.toObject);
canvas.add(group);
group.animate('left', '+=100', {
	 duration:1000,
	 onChange: canvas.renderAll.bind(canvas),
	 easing:fabric.util.ease.easeOutBounce
	 
	  });
	  
	  if(pomeraj2>canvas.height-80)
	{
	pomeraj2+=70-canvas.height
	pomeraj22+=70;
	}
	else
	{
      pomeraj2+=70;
    }
	  pokazivacGrupa+=1;
	  pomerajMaliSto+=1;
	  canvas.hoverCursor = 'pointer';
}


function base64Encode(){

	var tekst = canvas.toDataURL();
	var el = document.getElementById('txt');
	el.innerHTML = tekst;

}

function addWallVertikal()
{  
    pokazivac=1;
    var heightCanvas = canvas.height-40;
	var rectVertical = new fabric.Rect({
		
		top: 10,
		name: 'vertical'+" "+pomerajZidVertikalni,
		left: 200+pomeraj3 ,
		width: 10,
		height: 200,//heightCanvas,
		//perPixelTargetFind: true,
		
        
        //padding:20,
		lockScalingX:true,
		lockScalingY:true
	});
	canvas.add(rectVertical);
	rectVertical.toObject = (function(toObject) {
  return function() {
    return fabric.util.object.extend(toObject.call(this), {
      name: this.name,
	  lockMovementX:this.lockMovementX,
      lockMovementY:this.lockMovementY,
	  selectable: this.selectable,
	  lockScalingX:this.lockScalingX,
	  lockScalingY:this.lockScalingY
    });
  };
})(rectVertical.toObject);
	pomerajZidVertikalni+=1;
	pomeraj3+=20;
}
function addWallHorizontal()
{  
    pokazivac=1;
    var widthCanvas = canvas.width-40;
	var rectHorizontal = new fabric.Rect({
		
		top: 0+pomeraj4,
		name: 'horizontal'+" "+pomerajZidHorizontalni,
		left: 20 ,
		width: 200, //widthCanvas,
		height: 10,
		//pading:20,
		//perPixelTargetFind: true,
		lockScalingX:false,
		lockScalingY:false
	});
	canvas.add(rectHorizontal);
		rectHorizontal.toObject = (function(toObject) {
  return function() {
    return fabric.util.object.extend(toObject.call(this), {
      name: this.name,
	  lockMovementX:this.lockMovementX,
      lockMovementY:this.lockMovementY,
	  selectable: this.selectable,
	  lockScalingX:this.lockScalingX,
	  lockScalingY:this.lockScalingY
    });
  };
})(rectHorizontal.toObject);
	pomeraj4+=20;
	pomerajZidHorizontalni+=1;
}
function intersection()
{  
    
    edgedetection = 4;
	canvas.on('object:moving', function (e) {
	if(pokazivac==1){
	var obj = e.target;
	
    obj.setCoords(); //Sets corner position coordinates based on current angle, width and height
    canvas.forEachObject(function (targ) {
    	activeObject = canvas.getActiveObject();
            
    	if (targ === activeObject) return;


    	if (Math.abs(activeObject.oCoords.tr.x - targ.oCoords.tl.x) < edgedetection) {
    		activeObject.left = targ.left - activeObject.currentWidth;
    	}
    	if (Math.abs(activeObject.oCoords.tl.x - targ.oCoords.tr.x) < edgedetection) {
    		activeObject.left = targ.left + targ.currentWidth;
    	}
    	if (Math.abs(activeObject.oCoords.br.y - targ.oCoords.tr.y) < edgedetection) {
    		activeObject.top = targ.top - activeObject.currentHeight;
    	}
    	if (Math.abs(targ.oCoords.br.y - activeObject.oCoords.tr.y) < edgedetection) {
    		activeObject.top = targ.top + targ.currentHeight;
    	}
    	if (activeObject.intersectsWithObject(targ) && targ.intersectsWithObject(activeObject)) {
    		targ.strokeWidth = 0;
    		targ.stroke = 'red';
			if(activeObject.currentHeight>activeObject.currentWidth){
			
				sredinaFiksiranogHorizontalnog=targ.oCoords.tl.x+targ.currentWidth/2;
				sredinaObjektaVertikalnog=activeObject.oCoords.bl.y-activeObject.currentHeight/2;
				pomHorizontalnog=targ.currentHeight/2;
                
				
				if(activeObject.oCoords.tr.x>targ.oCoords.tl.x && activeObject.oCoords.tr.x<sredinaFiksiranogHorizontalnog){
						 
						 if(sredinaObjektaVertikalnog>targ.oCoords.bl.y-pomHorizontalnog){
							
				               // window.alert("levo dole")
					            activeObject.left = targ.left - activeObject.currentWidth;
    		                    activeObject.top = targ.top; //+ targ.currentHeight;
					      
								
						  }
						  if(sredinaObjektaVertikalnog<targ.oCoords.bl.y-pomHorizontalnog)
						  
						  {
							//window.alert("levo gore");
							activeObject.left = targ.left-activeObject.currentWidth; 
							activeObject.top = targ.top-activeObject.currentHeight + targ.currentHeight;   
							}
					
						  }
						   
				if(activeObject.oCoords.tr.x>sredinaFiksiranogHorizontalnog && activeObject.oCoords.tr.x<targ.oCoords.tr.x)	  {
					    if(sredinaObjektaVertikalnog>targ.oCoords.bl.y-pomHorizontalnog)
						{
							//window.alert("desno dole");
							activeObject.left = targ.left+targ.currentWidth;
							 activeObject.top = targ.top;
						}
					    if(sredinaObjektaVertikalnog<targ.oCoords.bl.y-pomHorizontalnog)
						  
						  {
							//window.alert("desno gore");
							  activeObject.left = targ.left+targ.currentWidth;
							  activeObject.top = targ.top-activeObject.currentHeight+ targ.currentHeight;
						  }
					
					
					  }
				
				
				
				}

		if(activeObject.currentHeight<activeObject.currentWidth){
						sredinaObjektaHorizontalnog=activeObject.oCoords.br.x-activeObject.currentWidth/2;
				sredinaFiksiranogVertikalnog=targ.oCoords.tl.y+targ.currentHeight/2;
				pomVertikalnog=targ.currentWidth/2;
						//window.alert("");
					if(targ.oCoords.tr.x>activeObject.oCoords.bl.x && targ.oCoords.tr.x<sredinaObjektaHorizontalnog)
					
					{
						if(activeObject.oCoords.tr.y>sredinaFiksiranogVertikalnog)
						{
							//window.alert("horizontalno desno dole");
							    
							    activeObject.left = targ.left;
    		                    activeObject.top = targ.top+activeObject.currentWidth;
						}
						if(activeObject.oCoords.tr.y<sredinaFiksiranogVertikalnog)
						{
						    //window.alert("horizontalno desno gore");
							
							activeObject.left = targ.left;
    		                    activeObject.top = targ.top-activeObject.currentHeight;
						}
						
					}
				if(targ.oCoords.tr.x>sredinaObjektaHorizontalnog && targ.oCoords.tr.x<activeObject.oCoords.tr.x)               {
					if(activeObject.oCoords.tr.y>sredinaFiksiranogVertikalnog)
						{activeObject.left = targ.left- activeObject.currentWidth+targ.currentWidth;
    		                    activeObject.top = targ.top+activeObject.currentWidth;
							//window.alert("horizontalno levo dole");
						}
						if(activeObject.oCoords.tr.y<sredinaFiksiranogVertikalnog)
						{   
						   // window.alert("horizontalno levo gore");
						   activeObject.left = targ.left- activeObject.currentWidth+targ.currentWidth;
    		                    activeObject.top = targ.top-activeObject.currentHeight;
						}
					}
				//ovo sutra
					}
    		

    	} else {
    		targ.strokeWidth = 0;
    		targ.stroke = false;
    	}
    	if (!activeObject.intersectsWithObject(targ)) {
    		activeObject.strokeWidth = 0;
    		activeObject.stroke = false;
    	}
    });
	}
	else
	{ return;
	}
});
	
	
	
	
	
}
function limit(canvas)
{
	canvas.on('object:moving', function (e) {
	var obj = e.target;
	obj.setCoords(); //Sets corner position coordinates based on current angle, width and height
    activeObject = canvas.getActiveObject();
		
		if(activeObject.oCoords.bl.y>canvas.height)
		{
			activeObject.top=canvas.height-activeObject.currentHeight;
		}
		if(activeObject.oCoords.bl.x<0)
		{
		activeObject.left=0;
		
		}
		if(activeObject.oCoords.br.x>canvas.width)
		{
		activeObject.left=canvas.width-activeObject.currentWidth;
		}
		if(activeObject.oCoords.tl.y<0)
		{
		activeObject.top=0;
		}
		});
		
}
/*function promene()
{canvas.on('object:scaling', function (e) {
	var obj = e.target;
	obj.setCoords(); //Sets corner position coordinates based on current angle, width and height
    activeObject = canvas.getActiveObject();
    //window.alert(activeObject.currentHeight);
	});

	
}*/
fabric.Canvas.prototype.getItemsByName = function(name) {
  var objectList = [],
      objects = canvas.getObjects();
//window.alert("1");
  for (var i = 0, len = canvas.size(); i < len; i++) {
	 // window.alert(objects[i].name.split(" ",1));
    if (objects[i].name.split(" ",1) == name) {
      objectList.push(objects[i]);
	  //window.alert(objectList[i].name);
    }
  }
   
  return objectList;
  
};
	
function toStringObjekti(name)

{
	var objectList = [];  

for (var i = 0, len = canvas.getItemsByName(name).length; i < len; i++) 
{ 
    
	objectList.push(canvas.getItemsByName(name)[i].name);
     	window.alert(objectList[i]);
}

return objectList;

}
function Selectable(name,bool)
{  if(bool==false)
{
	for (var i = 0, len = canvas.getItemsByName(name).length; i < len; i++) 
{ 
    
	canvas.getItemsByName(name)[i].selectable = false;
     	
}
}
else 
{
	for (var i = 0, len = canvas.getItemsByName(name).length; i < len; i++) 
{ 
    
	canvas.getItemsByName(name)[i].selectable = true;
     	
}
}
}
//funkcije za rad
function lock(name)
{
	for (var i = 0, len = canvas.getItemsByName(name).length; i < len; i++) 
{ 
    
	canvas.getItemsByName(name)[i].lockScalingX = true;
	canvas.getItemsByName(name)[i].lockScalingY = true;
	canvas.getItemsByName(name)[i].lockMovementX = true;
	canvas.getItemsByName(name)[i].lockMovementY = true;
    canvas.getItemsByName(name)[i].lockRotation = true;	
}


}
function changeColor()
{   
canvas.on('object:selected', function(e) 
{   
	var obj = e.target;
   if(obj.item(0).getFill() == 'red')
     {
		 obj.item(0).set('fill', 'green'); canvas.deactivateAll().renderAll();
		 canvas.renderAll();
		 returnActive();
		 clearDropDown();
		 
		 populateDropDownMenu();
		 //canvas.renderAll();
		 //funkcija za obavestavanje servera ili posrednika ovde ide
		
     }
 else{ 
          obj.item(0).set('fill', 'red'); canvas.deactivateAll().renderAll(); 
		  canvas.renderAll();
		  
		 returnActive();
		 clearDropDown();
		 var pokazivac=obj.name.substring(e.target.name.lastIndexOf(" ")+1);
		 populateDropDownMenu();
		for (var i = 0, len = listToolTip.length; i < len; i++) {
	if(listToolTip[i].name.substring(listToolTip[i].name.lastIndexOf(" ")+1)==pokazivac)
	{    if(listToolTip[i]!=null){
	    canvas.remove(listToolTip[i]);}
		listToolTip.splice(i,1);
		
	}
	
	}
		  //funkcija za obavestavanje servera ili posrednika ovde ide
     }
  });	
  
	
}
function vrati(){
	
	for (var i = 0, len = activeResult.length; i < len; i++) {
	
	window.alert(activeResult[i].name);
	}
	}
function returnActive()
{  var objectList1=[];
	var objectList2=[];
	var objectFinal=[];
	activeResult=[];
	var j=0;
    	objectList1=canvas.getItemsByName("veliki");
	 objectList2=canvas.getItemsByName("mali");
	 objectFinal=objectList1.concat(objectList2);
	
	 //window.alert(objectFinal.length);
	for (var i = 0, len = objectFinal.length; i < len; i++) {
	
	 if(objectFinal[i].item(0).getFill()=="green")
	 {  
	 activeResult[j]=objectFinal[i];
	  j+=1;
	 
	// window.alert(activeResult[i].name);
	 }
	
	
}
//window.alert(activeResult.length);
    return activeResult;
	
	
	
}

function getObjectsToString(canvas)
{var objects = canvas.getObjects();
	for (var i = 0, len = canvas.getObjects().length; i < len; i++)  
	{
	var m=canvas.getObjects()[i].name;
	window.alert(m);	
	}
}
function scaleAndResize(canvas)
{     
       var canvasScale = 1;
      var SCALE_FACTOR = 0.7;
     window.alert("sss");
	var objects = canvas.getObjects();
	
    
		
        
    canvasScale = canvasScale * SCALE_FACTOR;
    
    canvas.setHeight(canvas.getHeight() * SCALE_FACTOR);
    canvas.setWidth(canvas.getWidth() * SCALE_FACTOR);
    
    var objects = canvas.getObjects();
   for (var i = 0, len = canvas.getObjects().length; i < len; i++)  {
        var scaleX = objects[i].scaleX;
        var scaleY = objects[i].scaleY;
        var left = objects[i].left;
        var top = objects[i].top;
        
        var tempScaleX = scaleX * SCALE_FACTOR;
        var tempScaleY = scaleY * SCALE_FACTOR;
        var tempLeft = left * SCALE_FACTOR;
        var tempTop = top * SCALE_FACTOR;
        
        objects[i].scaleX = tempScaleX;
        objects[i].scaleY = tempScaleY;
        objects[i].left = tempLeft;
        objects[i].top = tempTop;
        
        objects[i].setCoords();
    }
        
    canvas.renderAll();
}

function toJSON(canvas)
{    alert("asddd");
	json = JSON.stringify(canvas);
	var el = document.getElementById('TekstDIV');
	el.innerHTML = json;
	
}

function fromJSON(canvas)
{
savedState = canvas.toJSON();

canvas.clear();

canvas.loadFromJSON(savedState);
canvas.renderALL();

}
function clearDropDown()
{
	var select = document.getElementById('dDown');
	var length = select.options.length;
	//var length = activeResult.length;
var i;
    for(i=select.options.length-1;i>=0;i--)
    {
        select.remove(i);
    }
}
function populateDropDownMenu()
{
	var select = document.getElementById('dDown');
//var opcije = returnActive();
var i;
for (i = 0; i < activeResult.length; i++) {
    var opt ="sto"+" "+ activeResult[i].name.substring(activeResult[i].name.lastIndexOf(" ")+1);
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select.appendChild(el);
}


}
function ListenDropDown()
{$( "#dDown" )
.change(function () {
var str = "";
$( "select option:selected" ).each(function() {
str += $( this ).text() + " ";
});
var label = document.getElementById('labela');
label.innerHTML=str;
document.getElementById("inputText").focus();
})
.change();

	return str;
}
function racun()
{   var stoDD=document.getElementById("dDown").value;
    brStola=stoDD.substring(stoDD.lastIndexOf(" ")+1);
	cena=document.getElementById("inputText").value;
	//var element=listen.substring(listen.lastIndexOf(" ")+1);
	window.alert(brStola);
	var textSample = new fabric.Text(cena, { 
 fontFamily: 'Comic Sans',
 fontWeight: 'bold',
 textDecoration: 'underline',
 shadow: 'rgba(0,0,0,0.3) 5px 5px 5px', 
 name:"toolTip"+" "+brStola,
 left: 250, 
 top: 100,
 fill: '#000000'
});
    listToolTip.push(textSample);
	 //canvas.add(textSample);
}
function ispis()
{
	for (var i = 0, len = listToolTip.length; i < len; i++)
	{window.alert(listToolTip[i].text);
	}
}

function toolTip()
{if(listToolTip.length>0){
	window.alert("radiiii");

	 canvas.findTarget = (function(originalFn) {
    return function() {
      var target = originalFn.apply(canvas, arguments);
      if (target) {
        if (canvas.hoveredTarget !== target) {
          canvas.fire('object:over', { target: target });
          if (canvas.hoveredTarget) {
            canvas.fire('object:out', { target: canvas.hoveredTarget });
          }
          canvas.hoveredTarget = target;
        }
      }
      else if (canvas.hoveredTarget) {
        canvas.fire('object:out', { target: canvas.hoveredTarget });
        canvas.hoveredTarget = null;
      }
      return target;
    };
  })(canvas.findTarget);

  

  canvas.on('object:over', function(e) {
   if(e.target.name.split(" ",1)=="veliki" || e.target.name.split(" ",1)=="mali"){
// window.alert(e.target.name.split(" ",1));  

 var pokazivac=e.target.name.substring(e.target.name.lastIndexOf(" ")+1);
  //window.alert(pokazivac);
   var textSample;
//window.alert(pomocna[1].name);
//window.alert(pokazivac);

for (var i = 0, len = listToolTip.length; i < len; i++) {
	
	if(listToolTip[i].name.substring(listToolTip[i].name.lastIndexOf(" ")+1)==pokazivac)
	{
		 textSample=listToolTip[i];
		//window.alert(listToolTip[i].name.substring(listToolTip[i].name.lastIndexOf(" ")+1));
	}
	}
	//alert(textSample.currentWidth);
   if(e.target.left -textSample.currentWidth<0) 
   {
	   if(e.target.top-textSample.currentHeight<0)
	   {
    		        textSample.left = e.target.left+e.target.currentWidth+5;
					textSample.top=e.target.top;
		}
		if(e.target.top+textSample.currentHeight>canvas.currentHeight)
		{
				    textSample.left = e.target.left+e.target.currentWidth+5;
					textSample.top=e.target.top;
		
			
		}
		else
		{ 
			        textSample.left = e.target.left+e.target.currentWidth+5;
					textSample.top=e.target.top;
		
		}
	}
	else
	{if(e.target.top+textSample.currentHeight>canvas.currentHeight)
	{
		            textSample.left = e.target.left+e.target.currentWidth+5;
					textSample.top=e.target.top-textSample.currentHeight-5;
	}
		
	if(e.target.left+textSample.currentWidth<0)
	{
		            textSample.left = e.target.left-e.target.currentWidth-5;
					textSample.top=e.target.top+textSample.currentHeight+5;
	}
    else
	{
		            textSample.left = e.target.left-textSample.currentWidth-5;
					textSample.top=e.target.top;
	}	
	}
					
    canvas.add(textSample);
    canvas.renderAll();
	
   }});

  canvas.on('object:out', function(e) {
    if(e.target.name.split(" ",1)=="veliki" || e.target.name.split(" ",1)=="mali"){
    //e.target.setFill('green');
	//window.alert(toStringObjekti("bla")[1]);
	for (var i = 0, len = listToolTip.length; i < len; i++) {
	canvas.remove(listToolTip[i]);
	//window.alert("out");
	}
    canvas.renderAll();
  
	}});
}
  }