	$(function(){
		//$( "#timelapse" ).accordion();
		$('#dialog-link, #icons li').hover(
			function() {
				$( this ).addClass('ui-state-hover');
			},
			function() {
				$( this ).removeClass('ui-state-hover');
			}
		);
		$('.ui-icon-refresh').click(function(){
			refreshResult();
		});
		
		$('.ui-icon-circle-triangle-e').click(function(){
			captureImage();
		});
		
		var widget = null;
		var refreshResult=function(){
			$.ajax({url:'/target/captured.json',dataType:'json'
				,error:function(XMLHttpRequest, textStatus, errorThrown){
					
				}
				,success:function(result){
		         if(result.datas){
		        	 var container=$('#container');
		        	 var target='';
		        	 var tempDayId;
		        	 var count=0;
		        	 
		        	 var tempHeader;
		        	 var tempContainer;
		        	 $(result.datas).each(function(index,data){
		        		 var values=data.split('-');
		        		 var dayId=values.slice(0,3).join('-');
		        		 var imgId=data.substr(0,data.length-4);
		        		 
		        		 if(dayId!=tempDayId){
		        			 tempDayId=dayId;
		        			 tempContainer=$('#'+dayId);
		        			 if(tempContainer.length==0){
			        			 tempHeader=$('<h3">'+dayId+'</h3><div></div>');
			        			 tempContainer=$('<div id="'+dayId+'"></div>');
			        			 $('#timelapse').append(tempHeader).append(tempContainer); 
			        			 count=0;
		        			 }
		        		 }
		        		 count+=1; 
		        		 var imgObj=tempContainer.find('#'+imgId);
		        		 if(imgObj.length==0){
		        			 tempContainer.append($('<img src="/target/'+data+'" class="captureimg" id="'+imgId+'"/>'));
			        		 if(count%4==0){
			        			 tempContainer.append($('<br />'));
			        		 }
		        		 }
		        	 });
		        	 if(!widget){
		        		 widget=$('#timelapse').accordion();
		        	 }else{
		        		 $('#timelapse').accordion('refresh');
		        	 }
		     		$(".captureimg").click(function(){
		     			var imgData={rc:'ok',data:{pt:$(this).attr('src')}}
		     			showImg(imgData);
		    		});
		         }
		      	}
				,complete:function(XMLHttpRequest, textStatus){
					
				}
			});
		};

		var captureImage=function(){
			$.ajax({url:'/serv/capture_image',dataType:'json'
				,error:function(XMLHttpRequest, textStatus, errorThrown){
					$('#realtimeCapture').html(errorThrown);
					$('#realtimeCapture').dialog();
				}
				,success:function(result){
					showImg(result);
		      	}
				,complete:function(XMLHttpRequest, textStatus){
					
				}
				});
		};

		var showImg=function(result){
			if(result.rc=='ok'){
				var realImg;
				if(result.data.img){
					realImg='<img id="realtimeImg" style="width:100%;height:100%" src="data:image/png;base64,'
						+result.data.img+'"/>';
				}else{
					realImg='<img id="realtimeImg" style="width:100%;height:100%" src="'+result.data.pt+'"/>';
				}
				$('#realtimeCapture').html(realImg);
			}else{
				$('#realtimeCapture').html(result.rm);
			}
			$('#realtimeCapture').dialog({width:800,height:600});
		};
		refreshResult();
		var inID=setInterval(refreshResult, 5*60*1000);//refresh images list per 5 minite
		//clearInterval(inID);
	});