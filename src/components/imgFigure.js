import React from 'react';

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

export default ImgFigure;
