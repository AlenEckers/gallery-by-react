require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

const imgInfo = [
		{
			'fileName': '1.jpg',
			'title': 'Heaven of time',
			'desc': 'Here he comes Here comes Speed Racer.'
		},
		{
			'fileName': '2.jpg',
			'title': 'Heaven of time',
			'desc': 'Here he comes Here comes Speed Racer.'
		},
		{
			'fileName': '3.jpg',
			'title': 'Heaven of time',
			'desc': 'Here he comes Here comes Speed Racer.'
		},
		{
			'fileName': '4.jpg',
			'title': 'Heaven of time',
			'desc': 'Here he comes Here comes Speed Racer. '
		},
		{
			'fileName': '5.jpg',
			'title': 'Heaven of time',
			'desc': 'Here he comes Here comes Speed Racer. '
		},
		{
			'fileName': '6.jpg',
			'title': 'Heaven of time',
			'desc': 'Here he comes Here comes Speed Racer. '
		},
		{
			'fileName': '7.jpg',
			'title': 'Heaven of time',
			'desc': 'Here he comes Here comes Speed Racer. '
		},
		{
			'fileName': '8.jpg',
			'title': 'Heaven of time',
			'desc': 'Here he comes Here comes Speed Racer. '
		},
		{
			'fileName': '9.jpg',
			'title': 'Heaven of time',
			'desc': 'Here he comes Here comes Speed Racer. '
		},
		{
			'fileName': '10.jpg',
			'title': 'Heaven of time',
			'desc': 'Here he comes Here comes Speed Racer. '
		},
		{
			'fileName': '11.jpg',
			'title': 'Heaven of time',
			'desc': 'Here he comes Here comes Speed Racer. '
		},
		{
			'fileName': '12.jpg',
			'title': 'Heaven of time',
			'desc': 'Here he comes Here comes Speed Racer.  '
		},
		{
			'fileName': '13.jpg',
			'title': 'Heaven of time',
			'desc': 'Here he comes Here comes Speed Racer.  '
		},
		{
			'fileName': '14.jpg',
			'title': 'Heaven of time',
			'desc': 'Here he comes Here comes Speed Racer.  '
		},
		{
			'fileName': '15.jpg',
			'title': 'Heaven of time',
			'desc': 'Here he comes Here comes Speed Racer.  '
		},
		{
			'fileName': '16.jpg',
			'title': 'Heaven of time',
			'desc': 'Here he comes Here comes Speed Racer.  '
		}
	];

const imageDatas = (imgInfo) => {
	for (var i = 0; i < imgInfo.length; i ++) {
	    var singleImageData = imgInfo[i];
	    singleImageData.imageURL = require('../images/' + singleImageData.fileName);
		
		imgInfo[i] = singleImageData;
	}
	
	return imgInfo;
};

const getRangeRandom = (low, high) => {
	return Math.ceil( Math.random() * (high - low) + low)
};

const getDegRandom =()=>{
	return ((Math.random() > 0.5 ? '' : '-') + (Math.ceil(Math.random()*30)))
};

class ImgFigure extends React.Component{
	
	handleClick =(e)=>{
		this.props.inverse()
	};
	
	render(){
		var styleObj = {};
		
		if (this.props.arrange.pos) {
			styleObj = this.props.arrange.pos;
		}
		
		if (this.props.arrange.rotate) {
			(['-moz-', '-ms-', '-webkit-', '']).forEach(function (value) {
				styleObj[value + 'transform'] = 'rotate(' + this.props.arrange.rotate + 'deg)'
			}.bind(this))
		}
		
		var imgFigureClassName = 'img-figure';
		imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';
		
		return(
			<figure className={imgFigureClassName} style={styleObj} ref={this.props.refName} onClick={this.handleClick}>
				<img src={this.props.data.imageURL} alt={this.props.data.title}/>
				<figcaption>
					<h2 className='img-title'>{this.props.data.title}</h2>
					<div className='img-back' onClick={this.handleClick}>
						<p>
							{this.props.data.desc}
						</p>
					</div>
				</figcaption>
			</figure>
		)
	}
}

export default class AppComponent extends React.Component {
	
	constructor(props){
		super(props);
		this.state={
			imgsArrangeArr: [],
			Constant: {
				centerPos: {
					left: 0,
					right: 0
				},
				hPosRange: {
					leftSecX: [0, 0],
					rightSecX: [0, 0],
					y: [0, 0]
				},
				vPosRange: {
					x: [0, 0],
					topY: [0, 0]
				}
			}
		};
	}
	
	componentDidMount = () =>{
		const stageDOM = this.refs.stage,
			stageW = stageDOM.scrollWidth,
			stageH = stageDOM.scrollHeight,
			halfStageW = Math.ceil(stageW / 2),
			halfStageH = Math.ceil(stageH / 2);
		const imgW = 320,
			imgH = 360,
			halfImgW = Math.ceil(imgW / 2),
			halfImgH = Math.ceil(imgH / 2);
		
		const constantData = {
			centerPos: {
				left: halfStageW - halfImgW,
				top: halfStageH - halfImgH
			},
			hPosRange: {
				leftSecX: [-halfImgH, halfStageW - halfImgW * 3],
				rightSecX: [halfStageW + halfImgW, stageW - halfImgW],
				y: [-halfImgH, stageH - halfImgH]
			},
			vPosRange: {
				x: [halfStageW - imgW, halfStageW],
				topY: [-halfImgH, halfStageH - halfImgH*3]
			}
		};
		
		this.setState({
			Constant: constantData
		});
		
		this.rearrange(0, constantData)
	};
	
	rearrange =(centerIndex, constantData)=> {
		var imgsArrangeArr = this.state.imgsArrangeArr,
			Constant = constantData,
			centerPos = Constant.centerPos,
			hPosRange = Constant.hPosRange,
			vPosRange = Constant.vPosRange,
			hPosRangeLeftSecX = hPosRange.leftSecX,
			hPosRangeRightSecX = hPosRange.rightSecX,
			hPosRangeY = hPosRange.y,
			vPosRangeTopY = vPosRange.topY,
			vPosRangeX = vPosRange.x,
			
			imgsArrangeTopArr = [],
			topImgNum = Math.ceil(Math.random() * 2),
			topImgSpliceIndex = 0,
			imgsArrangeCenterArr = imgsArrangeArr.splice( centerIndex, 1);
		
		imgsArrangeCenterArr[0].pos = centerPos;
		imgsArrangeCenterArr[0].rotate = 0;
		
		topImgSpliceIndex = Math.ceil( Math.random() * (imgsArrangeArr.length - topImgNum));
		imgsArrangeTopArr = imgsArrangeArr.splice( topImgSpliceIndex, topImgNum);
		
		imgsArrangeTopArr.forEach(function (value, index) {
			imgsArrangeTopArr[index] = {
				pos:{
					top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
					left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
				},
				rotate: getDegRandom()
			}
		});
		
		for (var i = 0, k = imgsArrangeArr.length/2; i < imgsArrangeArr.length; i ++) {
			var hPosRangeLORX = null;
			
			if (i < k) {
				hPosRangeLORX = hPosRangeLeftSecX;
			}else{
				hPosRangeLORX = hPosRangeRightSecX;
			}
			imgsArrangeArr[i] = {
				pos:{
					top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
					left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
				},
				rotate: getDegRandom()
			};
		}
		
		if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
			imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0])
		}
		imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);
		
		this.setState({
			imgsArrangeArr: imgsArrangeArr
		})
	};
	
	inverse =(index)=>{
		return ()=>{
			var imgsArrangeArr = this.state.imgsArrangeArr;
			imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;
			
			this.setState({
				imgsArrangeArr: imgsArrangeArr
			})
		}
	};
	
	render() {
		const controllerUnits = [],
			imgFigures = [],
			imgArr = imageDatas(imgInfo);
		
		for (var i = 0; i < imgArr.length; i ++) {
			if (!this.state.imgsArrangeArr[i]) {
				this.state.imgsArrangeArr[i] = {
					pos: {
						left: 0,
						top: 0
					},
					rotate: 0,
					isInverse: false
				}
			}
			imgFigures.push(<ImgFigure data={imgArr[i]} key={i} refName={'imgFigure' + i} arrange={this.state.imgsArrangeArr[i]} inverse={this.inverse(i)}/>)
		}
		
		return (
			<section className='stage' ref='stage'>
				<section className='img-sec'>
					{imgFigures}
				</section>
				
				<nav className='controller-nav'>
					{controllerUnits}
				</nav>
			</section>
		);
	}
}


// AppComponent.defaultProps = {};

// export default AppComponent;
