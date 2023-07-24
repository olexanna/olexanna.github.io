import React, { useEffect, useMemo, useState,useReducer, useRef } from "react";
import "@components/Selector-Test/styles/selector-test.scss"

const SelectorTestReducer = ( state, [ type, data ], props ) => {

	if( type === "add"){

		let tags = [...state.tags];

		if( state.tags.find((item)=>  item.value === data.value) ){
				return state;
		}

		tags.push({
			...data,
			id: Math.floor( Math.random() *  100000.0 ),
			value: data.value
		});

		return{
			...state,
			tags:tags
		}
	};


	if( type === "remove"){

		let tags = state.tags.filter(( unit ) => data.id !== unit.id );

		return{
			...state,
			tags:tags
		}
	};


	if( type === "next"){
		let tags = [...state.tags];
		let scrollLeft = state.scrollLeft + 120;

		let tagSlider = data.tagSlider.current.clientWidth;
		let tagSliderWrap = data.tagSliderWrap.current.clientWidth;

		let max = (tagSlider - tagSliderWrap);

		if( scrollLeft  > max ){
			scrollLeft = max;
		}

		return{
			...state,
			tags: tags,
			scrollLeft: scrollLeft
		}
	};


	if( type === "prev"){
		let tags = [...state.tags];
		let scrollLeft = state.scrollLeft - 120;
		let min = 0;

		if( scrollLeft  < 0 ){
			scrollLeft = min;
		}

		return{
			...state,
			tags: tags,
			scrollLeft: scrollLeft
		}
	};


	if( type === "change"){
		let tags = [...state.tags];

		return{
			...state,
			tags: tags,
			value: data.value
		}
	}


	if( type === "search" ){
		let result = [ ...state.result ];

		let value = data.value.trim().toLowerCase();

		if( value.length > 0 ){

			result = result.filter( ( item ) => {
				return (
					item.title.toLowerCase().match( value )
				)
			} )
		}

		return {
			...state,
			list: result,
			value: data.value
		}
	};


	if( type === "visible" ){

		return {
			...state,
			visible: data,
			zIndex: data ? 10 : 0
		}
	};

	return state;
};





export const SelectorTest = ( props ) => {

	const [ state, dispatch ] = useReducer( SelectorTestReducer, {
		list: props.list ,
		tags: [],
		result:props.list,
		scrollLeft: 0,
		value:"",
		visible:"",
		zIndex:0
	});

	let tagSliderRef= useRef(null);
	let tagSliderWrapRef = useRef(null);

	return(
		<section className={"search"}>
			<div className={"search-backdrop" + (!state.visible ? " hidden" : " ") } onClick={()=>{ dispatch(["visible", false])}} style={{zIndex: state.zIndex}}>{}</div>

			<section className={"search-wrap"} style={{ zIndex: (state.zIndex + 1) }}>
				<div className={"search-display"}>

					<input className={"search-inp"}
					   value={state.value}
					   type={"text"}
					   autoComplete={ "new-password" }
					   placeholder={ props.placeholder || "input" }
					   onChange={(event)=>{ dispatch(["search", {value: event.target.value   }])}}
						onFocus={()=>{ dispatch(["visible", true])}}
					/>

					<div className={"search-display-wrap"} ref={tagSliderWrapRef}>
						<p className={"search-display-btn arrow-left"} onClick={()=>{ dispatch(["prev", {tagSlider: tagSliderRef , tagSliderWrap: tagSliderWrapRef}])}}> &#60; </p>

						<div className={"search-tags-wrap"}   >
							<div className={"search-tags"}   style={{marginLeft: -(state.scrollLeft)+ "px" }}  ref={tagSliderRef}>
								{
									state.tags.map( (item, index)=>{
										return(
											<p className={"search-tags-item"} key={ index }>
												<span className={"search-tags-item-title"}>{item.value}</span>
												<span className={"search-tags-item-remove"} onClick={()=>{ dispatch(["remove", {id: item.id}])}}> x </span>
											</p>
										)
									})
								}
							</div>
						</div>

						<p className={"search-display-btn arrow-right"}  onClick={()=>{ dispatch(["next", {tagSlider: tagSliderRef , tagSliderWrap: tagSliderWrapRef}])}}> &#62; </p>
					</div>

				</div>

				<div className={"search-list" + (!state.visible ? " hidden": " block") } style={{ zIndex: (state.zIndex + 1) }}>
					{

						state.list.map( (item, index)=>{
							return(
								<p className={"search-list-item"} onClick={()=>{ dispatch(["add", {value: item.title}])}} key={ item.key }>{ item.title }</p>
							)
						})
					}
				</div>

			</section>
		</section>
	)
};



