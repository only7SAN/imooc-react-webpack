require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';
import ReactDOM from 'react-dom';

var imgDatas = require('../data/imgDatas.json');

var imgDatas = (function(imgDatasArr){
  for(var i=0;i<imgDatasArr.length;i++){
    var singleImg = imgDatasArr[i];

    singleImg.imgURL = require('../images/'+singleImg.filename);

    imgDatasArr[i] = singleImg;
  }

  return imgDatasArr;

})(imgDatas);

//图片组件
class ImgFigure extends React.Component {

  //点击后反转正反面的函数
  handleClick = function(e){

        e.stopPropagation();
    e.preventDefault();

    if(this.props.imgsArrange.isCenter){
     this.props.inverse();
    }else{
      this.props.center();
    }

  }

  render() {

    var styleObj = {};

    styleObj  = this.props.imgsArrange.pos;

    if(this.props.imgsArrange.rotate){
      (['Moz','ms','Webkit','']).forEach(function(value){
        styleObj[ value + 'Transform'] = 'rotate(' + this.props.imgsArrange.rotate +'deg)';
      }.bind(this));
    }

    if(this.props.imgsArrange.isCenter){
      styleObj.zIndex  = '11';
    }

    var imgFigureClassName = 'img-item';
        imgFigureClassName += this.props.imgsArrange.isInverse ? ' inverse' :'';


    return (
      <figure className={imgFigureClassName}  style = {styleObj} onClick = {this.handleClick.bind(this)} >
        <img className="img" src={this.props.data.imgURL}></img>
        <figcaption>
          <h2 className="img-title">{this.props.data.title}</h2>
          <div className = "img-back" onClick = {this.handleClick.bind(this)} >
            <p>
              {this.props.data.desc}
            </p>
          </div>
        </figcaption>
      </figure>
    );
  }
}

//控制组件
class Controllerunit extends React.Component {

  //控制组件点击函数
  handleClick(e){

    if(this.props.imgsArrange.isCenter){
      this.props.inverse();
    }else{
      this.props.center();
    }

    e.stopPropagation();
    e.preventDefault();
  }

  render (){

    var controllerunitClassName = 'controllerunit';

    if(this.props.imgsArrange.isCenter){
      controllerunitClassName += ' isCenter';

      if(this.props.imgsArrange.isInverse){
        controllerunitClassName += ' isInverse';
      }
    }
    return (
      <span className={controllerunitClassName} onClick={this.handleClick.bind(this)}></span>
    );
  }
}

//界面大管家，总组件
class AppComponent extends React.Component {

  //随机获得30度以内随机正负角度
  get30Deg (){
    return ((Math.random()*1 > 0.5 ? '' :'-') +Math.random()*30);
  }

      //声明随机取得范围内值的函数
  getRange (low,high){
      return Math.ceil(Math.random() * (high-low) + low );
    }

        //声明函数，获得图片的状态信息
  rearrange (centerIndex){
      //取得值
    var Constant = this.Constant,
        imgsArrange = this.state.imgsArrange,
        centerPos = Constant.centerPos,
        hPosRange = Constant.hPosRange,
        vPosRange = Constant.vPosRange,
        hPosRangeleftSecX = hPosRange.leftSecX,
        hPosRangerightSecX = hPosRange.rightSecX,
        hPosRangeY = hPosRange.Y,
        vPosRangeX = vPosRange.X,
        vPosRangetopY = vPosRange.topY,
        self = this,

        imgsArrTopArr = [],

        topImgNum = Math.floor(Math.random() * 2), //上面一个或者0个
        topSpliceIndex = 0,

        imgsArrCenArr = imgsArrange.splice(centerIndex,1);

        //首先居中中间位置的图片,居中的图片不需要旋转
        imgsArrCenArr[0] = {
          pos : centerPos,
          rotate:0,
          isCenter:true
        }

        //取出上侧图片的状态信息
        topSpliceIndex = Math.ceil(Math.random()*(imgsArrange.length - topImgNum));
        imgsArrTopArr = imgsArrange.splice(topSpliceIndex,topImgNum);

        //布局位于上侧的图片
        imgsArrTopArr.forEach(function(value,index){
          imgsArrTopArr[index] = {
            pos:{
              left:self.getRange(vPosRangeX[0],vPosRangeX[1]),
              top:self.getRange(vPosRangetopY[0],vPosRangetopY[1])
            },
            rotate:self.get30Deg(),
            isCenter:false
          }
        });

        //布局两侧的图片
        for(var i = 0, j = imgsArrange.length,k = j/2;i < j;i++){

          var hPosRangeLORX = '';

          if(i<k){
            hPosRangeLORX = hPosRangeleftSecX;
          } else{
            hPosRangeLORX = hPosRangerightSecX;
          }

          imgsArrange[i] = {
            pos :{
              left:this.getRange(hPosRangeLORX[0],hPosRangeLORX[1]),
              top:this.getRange(hPosRangeY[0],hPosRangeY[1])
              },
            rotate:this.get30Deg(),
            isCenter:false
          }
        }

        if(imgsArrTopArr&&imgsArrTopArr[0]){
          imgsArrange.splice(topSpliceIndex,0,imgsArrTopArr[0]);
        }

        imgsArrange.splice(centerIndex,0,imgsArrCenArr[0]);

        this.setState({
          imgsArrange : imgsArrange
        });
      }

    //获取相应index的正反面信息，使用一个闭包
    inverse (index){
      return function(){
        var imgsArrange = this.state.imgsArrange;

        imgsArrange[index].isInverse = !imgsArrange[index].isInverse;

        this.setState({
          imgsArrange :imgsArrange
        });
      }.bind(this);
    }

    //旁边图片居中的函数
    center (index){
      return function(){
        this.rearrange(index);
      }.bind(this);
    }


    //初始化位置信息
    Constant = {
      centerPos:{
        left:0,
        top:0
      },
      hPosRange:{
        leftSecX:[0,0],
        rightSecX:[0,0],
        Y:[0,0]
      },
      vPosRange:{
        X:[0,0],
        topY:[0,0]
      }
    }


  //初始化state
  constructor(props) {
    super(props);
    this.state = {
      imgsArrange:[
      //包含位置，旋转角度，正反面状态
      ]
    };
  }

  componentDidMount() {



     //拿到stage的大小
    var stageDOM = ReactDOM.findDOMNode(this.refs.stage),
        stageW = stageDOM.scrollWidth,
        stageH = stageDOM.scrollHeight,
        halfStageW = Math.ceil(stageW/2),
        halfStageH = Math.ceil(stageH/2);


        //拿到figure的大小
    var imgDOM = ReactDOM.findDOMNode(this.refs.imgFigure0),
        imgW = imgDOM.scrollWidth,
        imgH = imgDOM.scrollHeight,
        halfImgW = Math.ceil(imgW/2),
        halfImgH = Math.ceil(imgH/2);

        //中心位置取值范围
      this.Constant.centerPos = {
        left : halfStageW - halfImgW,
        top : halfStageH - halfImgH
      }


      //左右两侧的取值范围
      this.Constant.hPosRange.leftSecX[0] = -halfImgW;
      this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW*3;
      this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
      this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
      this.Constant.hPosRange.Y[0] = -halfImgH;
      this.Constant.hPosRange.Y[1] = stageH - halfImgH;

      //上侧区域的取值范围
      this.Constant.vPosRange.X[0] = halfStageW - imgW;
      this.Constant.vPosRange.X[1] = halfStageW + halfImgW;
      this.Constant.vPosRange.topY[0] = -halfImgH;
      this.Constant.vPosRange.topY[1] = halfStageH - halfImgH*3;

      //调用函数，获得图片信息
      this.rearrange(0);

  }




  render() {

    var controllerunits = [],
        imgfigures = [];

        //遍历图片
    imgDatas.forEach(function(value,index){

      if(!this.state.imgsArrange[index]){
        this.state.imgsArrange[index]={
          pos:{
            left:0,
             top:0
           },
          rotate:0,
          isInverse:false,
          isCenter:false
        }
      }

      imgfigures.push(<ImgFigure key={index} data={value} ref={'imgFigure' + index} imgsArrange={this.state.imgsArrange[index]} inverse={this.inverse(index)} center = {this.center(index)} />);

      controllerunits.push(<Controllerunit key={index} imgsArrange={this.state.imgsArrange[index]} inverse = {this.inverse(index)} center = {this.center(index)} />)
    }.bind(this));



    return (
      <section className="stage" ref="stage">
        <section className="img-src">
          {imgfigures}
        </section>
        <div className="controller-nav">
          {controllerunits}
        </div>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
