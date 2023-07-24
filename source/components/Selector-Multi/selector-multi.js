import React, { useEffect, useMemo, useState,useReducer, useRef } from "react";
import "@components/Selector-Multi/styles/selector-multi.scss"



const SelectorMultiReducer = ( state, [ type, data ], props ) => {

	if( type==="add" ){
		let tags = [...state.tags];

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

	if( type === "visible" ){
		return {
			...state,
			visible: !state.visible
		}
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
		let max = ( data.display.current.clientWidth - data.wrap.current.clientWidth );

		if( scrollLeft > max )
			scrollLeft = max;

		console.log(max, data.display.current.clientWidth,data.wrap.current.clientWidth );

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
			tags:tags
		};
	};


	return state;
};



export const SelectorMulti = (props) => {

	const [ state, dispatch ] = useReducer( SelectorMultiReducer, {
		checklist: [
			{ id: 0, key: "USA", title: "USA" },
			{ id: 1, key: "Russia", title: "Russia" },
			{ id: 2, key: "China", title: "China" },
			{ id: 3, key: "Korea", title: "Korea" },
			{ id: 4, key: "Belarus", title: "Belarus" },
			{ id: 5, key: "Kongo", title: "Kongo" },
			{ id: 6, key: "Armenia", title: "Armenia" },
			{ id: 8, key: "Poland", title: "Poland" },
			{ id: 9, key: "Baltia", title: "Baltia" },
			{ id: 10, key: "Czech", title: "Czech" },
			{ id: 11, key: "Bulgaria", title: "Bulgaria" },
			{ id: 12, key: "Abkhazia", title: "Abkhazia" }
		],
		tags: [],
		indexTag: 0,
		visible: false,
		scrollLeft: 0
	});

	let wrapRef = useRef( null );
	let displayRef = useRef( null );

	return(
		<section className={"selector"}>

			<p className={"selector-btn-left"} onClick={()=>{ dispatch(["prev", { wrap: wrapRef, display: displayRef } ])}}> {"<"}</p>


			<div  className={"selector-display-wrap"} onClick={()=>{ dispatch(["visible"])}} ref={ wrapRef }>
				<div  className={"selector-display"} style={{ marginLeft: -(state.scrollLeft) + "px" }} ref={ displayRef }>
				{
					state.tags.map( (unit, index)=>{
						return (
							<p className={"selector-tags " + ( index === state.indexTag ? " active": "")} key={index} id={index}>
								<span className={"selector-tags-text"}>{unit.value}</span>
								<span className={"selector-tags-remove"}  onClick={ ()=>dispatch(["remove",  { id: unit.id } ])}>x</span>
							</p>
						)
					})
				}
				</div>
			</div>

			<p className={"selector-btn-right"} onClick={()=>{ dispatch(["next", { wrap: wrapRef, display: displayRef }])}}> {">"}</p>

			<div className={"selector-block" +(!state.visible ? " hidden" : " ")}>
				{
					state.checklist.map( (unit,index)=>{
						return(
							<p  className={"selector-block-item" +(!state.visible ? " hidden" : " ")} key={index} onClick={()=>{ dispatch(["add", {value: unit.key, key:unit.key}])}}>{ unit.title }</p>
						)
					})
				}
			</div>
		</section>
	)
};



