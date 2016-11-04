import React from 'react';

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

export default Controllerunit;
