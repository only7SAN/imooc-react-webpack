require('normalize.css/normalize.css');
require('styles/App.scss');

import React from 'react';

var imgDatas = require('../data/imgDatas.json')

var getImgData = function(imgDatasArr){
  for(var i=0;i<imgDatasArr.length;i++){
    var singleImg = imgDatasArr[i];

    singleImg.ImgURL = require('../images/'+singleImg.filename);

    imgDatasArr[i] = singleImg;
  }

  return imgDatasArr;
};

getImgData(imgDatas);

class AppComponent extends React.Component {
  render() {
    return (
      <section className="stage">
        <section className="img-src">
        </section>
        <div className="controller-nav"></div>
      </section>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
