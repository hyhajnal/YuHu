
    
    //全局变量
    var wordArray = new Array();
    //var wordArray = ['语文','英语','高等数学','金灿灿'];
    var meanArray = new Array(); //词义数组
    var currentLetter; //String
    var correctWord; //String
    var scoreArray = new Array(); //[1,0,1,0] 听写结果
    var wordIndex = 0; //当前词语
    var letterIndex; //当前字
    var studentWord;
    var studentAnswer = new Array();
    var postWrongArray = new Array();
    
    //-------------手写变量-------------------------
    var dataStr = '';
    var mousePress = false;
    var last = null;//判断一笔是否书写完毕
    var check = new Array(); //判断是否书写完毕，存计时器号
    var myCanvas = document.getElementById('myCanvas');
    var gC = myCanvas.getContext("2d");//获取绘图上下文
        gC.strokeStyle = 'black';
        gC.lineWidth = 4;
    var borderSize = $(window).get(0).innerWidth / 5; //每一个小田字格的大小
    var borderBigSize = $(window).get(0).innerWidth - 100;
    
    //------------------------手写function---------------------    

    function getArray(){
        var url = '';
        if(parseInt(localStorage.getItem('review')) == 1){
            url = 'http://192.168.155.1:3000/yuhu/student/review';
                $.ajax({
                type:'GET',
                url:url,
                data:{
                    sid:localStorage.getItem('tid')
                },
                dataType:'json',
                success:function(data){
                    var dataArray = new Array();
                    data.data.forEach(function(v){
                        dataArray = dataArray.concat(v.content.split(','));//合并数组
                    });
                    dataArray.forEach(function(v){
                        if(v.indexOf(':')){
                            wordArray.push(v.split(':')[0]);
                            meanArray.push(v.split(':')[1]);
                        }else{
                            wordArray.push(v);
                            meanArray.push('');
                        }

                    });
                    console.log(wordArray);
                    console.log(meanArray);
                    Init(); 
    
                },
                error:function(e){
                    alert('连接失败');
                }
            });
        }else{
            url = 'http://192.168.155.1:3000/yuhu/student/queryTaskContentByTno';
            $.ajax({
                type:'GET',
                url:url,
                data:{
                    tno:localStorage.getItem('tno')
                },
                dataType:'json',
                success:function(data){
                    var dataArray = data.data[0].content.split(' ');
                    dataArray.forEach(function(v){
                        wordArray.push(v.split(':')[0]);
                        meanArray.push(v.split(':')[1]);
                    });
                    console.log(wordArray);
                    console.log(meanArray);
                    Init(); 
    
                },
                error:function(e){
                    alert('连接失败');
                }
            });
        }
        
    }
    
    
    function borderInit(num){
        $('#oneWord').html('');
        for(var i = 0; i < num ; i++){
            var html = "<div class='umh5 umw3 umar-r umar-l letter' data-id='"+i+"'>"
            +"<canvas id='letterCanvas"+i+"' width='"+borderSize+"' height='"+borderSize+"'></canvas>"
            + "<span class='hanzi'></span><i class='iconfont icon-xuanzhong'></i></div>";
            $('#oneWord').append(html);
            drawBackground('letterCanvas'+i);
        }
        
    }
    
        
    
    //识别字体
    function postLetter(){
        dataStr = dataStr + '-1,0';
        //alert(dataStr);
        var dataObj = {
            uid: "192.168.1.103",
            type: "1",
            data: dataStr
        }
        console.log(JSON.stringify(dataObj));
        $.ajax({
                type:'POST',
                url:'https://api.hanvon.com/rt/ws/v1/hand/single?key=17206102-495d-4ddc-b23a-4cfa28b55d9e&code=83b798e7-cd10-4ce3-bd56-7b9e66ace93d',
                contentType:'application/octet-stream',
                data:JSON.stringify(dataObj),
                dataType:'text',
                success:function(data){
                    var r = JSON.parse(base64decode(data));
                    console.log(r);
                    if(parseInt(r.code) == 0){
                        
                        console.log(tohanzi(r.result));
                        console.log('#letterCanvas'+letterIndex);
                        $('#letterCanvas'+letterIndex).next().text(tohanzi(r.result));
                        studentWord[letterIndex] = tohanzi(r.result);  
                        
                        if(letterIndex + 1 < wordArray[wordIndex].length){
                            $('#oneWord i').filter(".active").parent().next().click();
                        }                                           
                        
                    }else{
                        alert("字体解析错误");
                    }

                },
                error:function(e){
                    alert("连接错误");
                }

            });
            //清理画板， 准备下一个字
            clear();
            handWriting.exexute(); 
        
    }
    
    function getdataStr(){
        dataStr = dataStr + '-1,0';
        return dataStr;
    }
    
    function tohanzi(data){
        if(data == '') return '请输入十六进制unicode';
        data = data.split(",");
        var str ='';
        str = String.fromCharCode(data[0]);
        //console.log(str);
        return str;
    }
    var base64DecodeChars = new Array(
         -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
         -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
         -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
         52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
         -1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,
         15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
         -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
         41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
    
    function base64decode(str){  
        var c1, c2, c3, c4;  
        var i, len, out;  
        len = str.length;  
        i = 0;  
        out = "";  
        while (i < len) {  
            /* c1 */  
            do {  
                c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];  
            }  
            while (i < len && c1 == -1);  
            if (c1 == -1)   
                break;  
            /* c2 */  
            do {  
                c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];  
            }  
            while (i < len && c2 == -1);  
            if (c2 == -1)   
                break;  
            out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));  
            /* c3 */  
            do {  
                c3 = str.charCodeAt(i++) & 0xff;  
                if (c3 == 61)   
                    return out;  
                c3 = base64DecodeChars[c3];  
            }  
            while (i < len && c3 == -1);  
            if (c3 == -1)   
                break;  
            out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));  
            /* c4 */  
            do {  
                c4 = str.charCodeAt(i++) & 0xff;  
                if (c4 == 61)   
                    return out;  
                c4 = base64DecodeChars[c4];  
            }  
            while (i < len && c4 == -1);  
            if (c4 == -1)   
                break;  
            out += String.fromCharCode(((c3 & 0x03) << 6) | c4);  
        }  
        return out;  
    }
    
    
    //绘制田字格
    function drawBackground(id){
        
        var canvas, board,cvWidth,cvHeight;
        canvas = document.getElementById(id);
        
        cvWidth = canvas.width;
        cvHeight = canvas.height; 
        
        board = canvas.getContext("2d");//获取绘图上下文
        
        
        board.strokeStyle = '#f2b93f';
        board.lineWidth = 6;
        board.beginPath();//开始绘图
        board.rect(1, 1,cvWidth - 2,cvHeight - 2);
        board.stroke();
    
        board.lineWidth = 1;
        //board.setLineDash([5,5]);//虚线
    
        //画"\"线
        board.moveTo(0, 0);
        board.lineTo(cvWidth, cvHeight);
    
        //画"/"线
        board.moveTo(0, cvHeight);
        board.lineTo(cvWidth, 0);
    
        //画"-"线
        board.moveTo(0, cvHeight / 2);
        board.lineTo(cvWidth, cvHeight / 2);
    
        //画"|"线
        board.moveTo(cvWidth / 2, 0);
        board.lineTo(cvWidth / 2, cvHeight);
    
        board.stroke();//绘图结束
    
        //画笔重置
        board.strokeStyle = 'black';
        board.lineWidth = 4;
    }
    
    //睡眠
    function sleep(numberMillis) { 
        var now = new Date(); 
        var exitTime = now.getTime() + numberMillis; 
        while (true) { 
        now = new Date(); 
        if (now.getTime() > exitTime) 
            return; 
        } 
    }

    
    //--------------------------写字function------------------------
    var handWriting = {
               
        beginDraw:function(){
            mousePress = true;
        },
        
        drawing:function(e){
           // alert('drawing');
            e.preventDefault();
            if(!mousePress) return;
            var xy = handWriting.pos(e);
            if(last != null){
                //alert('('+ last.x + ',' + last.y +')->('+ xy.x + ',' + xy.y + ')');
                gC.beginPath();//开始绘图
                gC.moveTo(last.x, last.y);
                gC.lineTo(xy.x, xy.y);
                gC.stroke();//绘图结束
            }
            last = xy;
        },
        
        endDraw:function(e){
            mousePress = false;
            e.preventDefault();
            last = null;
            var onecheck = setTimeout(function(){handWriting.complete();}, 1500);
            check.push(onecheck);
        },
        
        pos:function(e){
            var x,y;
            
            if(handWriting.isTouch(e)){
                x = e.touches[0].pageX - offsetLeft(e.touches[0].target);
                y = e.touches[0].pageY - offsetTop(e.touches[0].target);
            }else{
                x = e.offsetX + e.target.offsetLeft;
                y = e.offsetY + e.target.offsetTop;
            }
             /*x = e.touches[0].pageX - offsetLeft(e.touches[0].target);
             y = e.touches[0].pageY - offsetTop(e.touches[0].target);*/
            dataStr = dataStr + x + ',' + y +',';
            return {x:x, y:y};//返回一个点(Object)
        },
        
        isTouch:function(e){
            var type = e.type;
            if(type.indexOf('touch') >= 0){
                return true;
            }else{
                return false;
            }
        },
        complete:function(){
            console.log("在判断中....................");
            if(!mousePress){
                check.forEach(function(v){
                    clearTimeout(v);
                });
                letterIndex = $('#oneWord i').filter(".active").parent().data('id');
                postLetter();
            }
        },
        
        exexute:function(){
            myCanvas.onmousedown = handWriting.beginDraw;
            myCanvas.onmousemove = handWriting.drawing;
            myCanvas.onmouseup = handWriting.endDraw;
            myCanvas.addEventListener('touchstart', handWriting.beginDraw, false);
            myCanvas.addEventListener('touchmove', handWriting.drawing, false);
            myCanvas.addEventListener('touchend', handWriting.endDraw, false);
        }
        
        
    }
    
    function offsetLeft(element){
        var left = element.offsetLeft;        // 得到第一层距离;
        var parent = element.offsetParent;      // 得到第一个父元素;
        while(parent !== null){            // 判断如果还有上一层父元素;
          left += parent.offsetLeft;        // 将得到的距离累加;
          parent = parent.offsetParent;       // 将父元素也回溯;
        }                       // 然后循环;
        return left;                 // 得到最终距离;
      }
      
     function offsetTop(element){
        var top = element.offsetTop;        // 得到第一层距离;
        var parent = element.offsetParent;      // 得到第一个父元素;
        while(parent !== null){            // 判断如果还有上一层父元素;
          top += parent.offsetTop;        // 将得到的距离累加;
          parent = parent.offsetParent;       // 将父元素也回溯;
        }                       // 然后循环;
        return top;                 // 得到最终距离;
      }

    
    //清除
    function clear(){
        myCanvas.height = borderBigSize;
        dataStr = '';
        drawBackground("myCanvas");
    }
    
    //------------------------------播放function------------------------
    function init(){
        var params = {
            appID:"581c79d8"
        };
        var data = JSON.stringify(params);
        uexXunfei.init(data);
    }
    
    function initSpeaker(){
        var params = {
            voiceName:'xiaoyan',
            speed:'20',
            volume:'80'
        };
        var data = JSON.stringify(params);
        uexXunfei.initSpeaker(data);
    }
    
    function playWord(){
        var params = {text:wordArray[wordIndex]};
        var data = JSON.stringify(params);
        uexXunfei.startSpeaking(data);
    }
    
    
    function score(){
        var score_str = '';
        studentWord.forEach(function(value){
            score_str = score_str + value.toString();
        });
        console.log('studentWord:'+ studentWord);
        console.log('wordArray:'+ wordArray[wordIndex]);
        console.log(score_str);
        studentAnswer.push(score_str);
        var scoreone = wordArray[wordIndex] === score_str ? 1 : 0;
        if(!scoreone){
            scoreArray.push(wordArray[wordIndex]);
            var wrongStr = wordArray[wordIndex]+':'+meanArray[wordIndex];
            postWrongArray.push(wrongStr);
        }
        
    }
        
    


    //-----------------------Init 面板----------------------------
    function Init(){
        letterIndex = 0; //当前字
        drawBackground("myCanvas");
        borderInit(wordArray[wordIndex].length);
        $('#oneWord').find("i:first").addClass('active');
        handWriting.exexute();
        playWord();
        $('#progress').text(wordIndex + 1 + '/' + wordArray.length);
        studentWord = new Array(wordArray[wordIndex].length);
        $('.tip_box').text(meanArray[wordIndex]);
    }
    


