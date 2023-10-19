import React, { useEffect, useMemo, useState,useReducer, useRef, createContext } from "react";
import "@components/Gallery/styles/gallery.scss"
//import {Dot } from "@components/Gallery/dot";
import {Preview } from "@components/Gallery/preview";


export const DotContext = React.createContext();

const GalleryReducer=( state, [ type, data ] )=>{

	if(type === "next"){

		let list = [...state.list];
		let index = state.indexItem;

		if(index == state.list.length-1){
			index = -1;
		}
		if(index > state.list.length-1){
			index = 0;
		}
		index++;

		return{
			...state,
			list:list,
			indexItem:index
		}
	};

	if( type==="prev"){

		let list = [...state.list];
		let index = state.indexItem;

		if (index <= 0) {
			index = state.list.length;
		}

		index-- ;

		return{
			...state,
			list:list,
			indexItem:index
		}
	};

	if(type ==="dotClick"){

		let list = [...state.list];
		let index =data.index;

		return{
			...state,
			list:list,
			indexItem:index
		}
	}

	if( type === "right"){
		let list=[...state.list];
		let marginLeft = state.marginLeft + 120;

		let slider = data.slider.current.scrollWidth;
		let sliderWrap = data.sliderWrap.current.clientWidth;

		let max = (slider-sliderWrap);

		if( marginLeft > max ){
			marginLeft = max
		}

		console.log(marginLeft, "right",max);

		return{
			...state,
			list:list,
			marginLeft: marginLeft
		}
	};

	if( type === "left"){
		let list=[...state.list];
		let marginLeft = state.marginLeft -120;

		console.log(marginLeft, "left");

		if(marginLeft <0){
			marginLeft = 0
		}

		return{
			...state,
			list:list,
			marginLeft: marginLeft
		}
	};
	return  state;
};




export const Gallery = ( props ) => {

	const [ state, dispatch ] = useReducer( GalleryReducer, {
		list:[
			{title:"have you ever closed your eyes" , key:"0", dot:"" },
			{title:"and imagined ", key:"1", dot:""  },
			{title:"that there are worlds beyond", key:"2", dot:""  },
			{title:"the perception of the reality around you", key:"3", dot:""  },
			{title:"that the human mind is not yet able", key:"4", dot:""  },
			{title:" to analyze and understand" , key:"5", dot:"" },
			{title:"but what it will always", key:"6", dot:""  },
			{title:"strive for anyway movement ", key:"7", dot:""  },
			{title:"and aspiration are the continuation", key:"8", dot:""  },
			{title:" and development of life.", key:"9", dot:""  },
		],
		indexItem: 0,
		indexKey:0,
		value:{},
		marginLeft:0
	});


	let interval = setTimeout(()=>{
		dispatch([ "next" ]);
	}, 3000 );

	useEffect(() => {
		return () => {
			clearTimeout( interval );
		};
	}, [ state.indexItem ]);




	return(
		<article className={"gallery-main"}>
			<section className={"gallery-wrap" }>
				<div className={"gallery"}>
					<p className={"gallery-prev"} onClick={()=>{	dispatch([ "prev" ]) }}> {"<"} </p>

					<div className={"gallery-wrap"} >
						<div className={"gallery-display"}  style={{ transform: `translateX(-${state.indexItem * 100}%)` }} >
							{
								state.list.map((item, index)=>{
									return(
										<p  className={"gallery-display-item" + ( state.indexItem === index  ? " flex":" " )}  style={{ backgroundImage:"url(../assets/images/space-" + index + ".jpg"+ ")"}}  key={index}>
											<span className={"gallery-display-item-text"}>{item.title}</span>
										</p>
									)
								})
							}
						</div>
						</div>
					<p className={"gallery-next"} onClick={()=>{dispatch(["next"]) }}> {">"} </p>
				</div>
			</section>



			<DotContext.Provider
				value={{dotIndex: state.marginLeft, dotDispatch: dispatch}}>
				<Preview list={state.list} onClick={()=>{clearTimeout( interval )}} item={state.list.dot}   indexItem={state.indexItem} />
			</DotContext.Provider>
		</article>
	);
};
