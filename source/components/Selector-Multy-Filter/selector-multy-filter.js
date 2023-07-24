import React, { useEffect, useMemo, useState,useReducer, useRef } from "react";
import "@components/Selector-Multy-Filter/styles/selector-multy-filter.scss"


const SelectorMultyFilterReducer = ( state, [ type, data ], props ) => {

	if( type==="add" ){
		let tags = [...state.tags];

		if( state.tags.find(( item )=> item.value === data.value)){
			console.log(  data.value, "add" );
			return state;
		}

		tags.push({
			...data,
			id: Math.floor( Math.random() *  100000.0 ),
			value: data.value
		});

		return {
			...state,
			tags: tags
		};
	};

	if( type === "remove" ){
		let tags = state.tags.filter(( item ) => data.id!==item.id );

		return {
			...state,
			tags: tags
		};
	};

	if( type === "next" ){
		let tags = [...state.tags];
		let scrollLeft = state.scrollLeft + 120;

		let display = data.display.current.clientWidth;
		let slider = data.slider.current.clientWidth;
		let max = (display - slider);

		if( scrollLeft > max )
			scrollLeft = max;

		console.log( scrollLeft, max );

		return {
			...state,
			scrollLeft: scrollLeft,
			indexTag: state.indexTag + 1,
			tags: tags
		};
	};

	if( type === "prev" ){
		let tags = [...state.tags];
		let scrollLeft = state.scrollLeft - 120;
		let min = 0;

		if( scrollLeft < min )
			scrollLeft = min;

		return {
			...state,
			indexTag: state.indexTag - 1,
			scrollLeft: scrollLeft,
			tags: tags
		};
	};


	if( type === "search" ){
		let checklist = [ ...state.checklist ];

		let value = data.value.trim().toLowerCase();

		if( value.length > 0 ){
			checklist = checklist.filter((item)=>{
				return item.title.toLowerCase().match( value );
			});

			console.log( value.length, "value search" )
		};

		return {
			...state,
			list: checklist,
			value: value
		}
	};

	if( type === "change" ){
		return {
			...state,
			value: data.value
		};
	};

	if( type === "visible" ){
		return {
			...state,
			zIndex: data ? 10 : 0,
			visible: data
		}
	};

	return state;
};



export const SelectorMultyFilter = ( props ) => {

	const [ state, dispatch ] = useReducer( SelectorMultyFilterReducer, {
		checklist: props.list,
		list: props.list,
		tags: props.tags ||[],
		indexTag: 0,
		zIndex: 0,
		visible: false,
		scrollLeft: 0,
		value: ""
	});


	let sliderRef = useRef( null );
	let displayRef = useRef( null );

	return(
		<section className={"selector filter"}>

			<div className={ "selector-bg" + (!state.visible ? " hidden" : " ") } style={{ zIndex: state.zIndex }} onClick={() => dispatch([ "visible", false ]) }></div>

			<div className={ "selector-wrap" } style={{ zIndex: (state.zIndex + 1) }}>
				<p className={"selector-btn-left filter-arr-left"} onClick={()=>{ dispatch(["prev", { slider: sliderRef, display: displayRef } ])}}> {"<"}</p>

				<div  className={"selector-display-wrap filter-wrap"} >

					<input className={"selector-display-input"}
						   type={ "text" }
						   autoComplete={ "new-password" }
						   value={state.value}
						   placeholder={ props.placeholder || "input" }
						   onFocus={() => dispatch([ "visible", true ]) }
						   onChange={ (event) => dispatch([ "search", { value: event.target.value } ]) }
					/>

					<div className={ "selector-slider" } ref={ sliderRef }>
						<div  className={"selector-display jc-unset"} style={{ marginLeft:-(state.scrollLeft) + "px" }} ref={ displayRef }>
							{
								state.tags.map( (item, index)=>{
									return (
										<p className={"selector-tags " + ( index === state.indexTag ? " active": "")} key={index} id={index}>
											<span className={"selector-tags-text"}>{item.value}</span>
											<span className={"selector-tags-remove"}  onClick={ ()=>dispatch(["remove",  { id: item.id } ])}>x</span>
										</p>
									)
								})
							}
						</div>
					</div>
				</div>

				<p className={"selector-btn-right filter-arr-right"} onClick={()=>{ dispatch(["next", {display: displayRef, slider: sliderRef }])}}> {">"}</p>

				<div className={"selector-block" +(!state.visible ? " hidden" : " ")}>
					{
						state.list.map( (unit,index)=>{
							return(
								<p  className={"selector-block-item"} key={index} onClick={()=>{ dispatch(["add", {value: unit.key, key: unit.key}])}}>{ unit.title }</p>
							)
						})
					}
				</div>
			</div>

		</section>
	)
};



