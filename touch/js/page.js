var list = {
        slider : function($con, $box){
            var _startX,
                _startY,
                _left,
                posNow = 0 ;
            $con.on('touchstart', function(e){
                console.log(e.touches);
                var touchPoint = e.touches[0];
                _startX = touchPoint['clientX'];
                _startY = touchPoint['clientY'];
                //实现结束动画
                _left = posNow;
            });
            $con.on('touchmove', function(e) {
                  var k, _x, _y, touchPoint = e.touches[0];
                  //touchPoint['clientX']代表是坐标
                  //不是偏移量
                  //不断变化
                _currentX = touchPoint['clientX'];
                _currentY = touchPoint['clientY'];
                console.log(_currentX);
                  //_x,_Y 偏移量
                _x = _currentX - _startX;
                _y = _currentY - _startY;
                  //大小比例 判断是横向还是纵向滑动
                k = _y / _x;
                  //调优系数
                if (k >= -0.5 && k <= 0.5) {
                     //阻止默认事件
                    e.preventDefault();
                      //滑动
                    $(this).css('-webkit-transition-duration', '0s').css('-webkit-transform', 'translate3d('+(_left + _currentX - _startX)+'px,0,0px)');
                      //滑动的位置
                      //console.log（left）
                      //记录位置
                    posNow = _left + _currentX - _startX;
                }
            });
            $con.on('touchend', function(e) {
                  var marginLeft = posNow ,
                      listWidth = $(this).width(),
                    navWidth = $box.width(),
                    _endX = e.changedTouches[0]['clientX'];
                      //设置动画时间
                      console.log(listWidth);
                $(this).css('-webkit-transition-duration', '.2s');
                  //判断是否到头
                if (marginLeft < -navWidth) {
                    marginLeft = -navWidth;
                }
                  //判断是否到尾
                if (marginLeft > 0) {
                    marginLeft = 0;
                }
                $(this).css('-webkit-transform', 'translate3d('+marginLeft+'px,0,0px)');
                posNow = marginLeft;
            });
        },
        init : function(){
            // this.setFontSize();
            this.slider($('.moiveContent'),$('.moiveBox'));
            this.slider($('.wCon'),$('.wBox'));
        }
    }
list.init();