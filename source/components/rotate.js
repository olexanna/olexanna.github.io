import React from "react";
import "../../assets/styles/gallery.scss"
import "../../assets/styles/rotate.scss"
import SliderImageList from "./slider.image.list";

let BannerList = [
	{
		source: "/rotate/2-croissant.jpg",
		preview: "/rotate/2-croissant.jpg",
		titleRotate: "BARGAIN BREAKFAST: SECOND CROISSANT FOR FREE",
		descriptionRotate:"Every morning from 9 am to 11 am, when you buy a coffee and a croissant, get a second croissant-free of charge"
	},
	{
		source: "/rotate/birthday.jpg",
		preview: "/rotate/birthday.jpg",
		titleRotate: "FIFTY PERCENT BIRTHDAY DISCOUNT  ON ALL MENUS",
		descriptionRotate:"Celebrate your birthday in our cafe and get a fifty percent discount on all items on our menu"
	},
	{
		source: "/rotate/2-cup.jpg",
		preview: "/rotate/2-cup.jpg",
		titleRotate: "LUNCH WITH US: SECOND COFFEE FOR FREE",
		descriptionRotate:"Every day, 12 to 16, when buying coffee, the second is provided free of charge"
	}
];


export default class Rotate extends React.Component {

	constructor( props ){
		super( props );
	}


	componentDidMount(){
	}

	render(){
		return(
			<article className={"gallery rotate"}>
				<div className={"blackout"}></div>
				<SliderImageList rotation={ 5000 } hideui={ true } textcenter={ true } list={ BannerList } hideCarousel={true} rotateHeight={true} mobileHeight={true}></SliderImageList>
			</article>
		)
	}

}

/*
FIFTY PERCENT BIRTHDAY DISCOUNT  ON ALL MENUS


 */