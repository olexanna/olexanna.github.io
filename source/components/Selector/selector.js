import React, { useEffect, useMemo, useState,useReducer, useRef } from "react";
import "@components/Selector/styles/selector.scss"



const SelectorReducer = ( state, [ type, data ], props ) => {

	if(type === "selector"){
		let list = [...state.list];

		return{
			...state,
			list:list,
			getValue: data.key,
			index: data.index,
			visible:  !state.visible
		};
	}

	if( type === "visible" ){
		return {
			...state,
			visible: !state.visible
		}
	};
	return state;
};



export const Selector = (props) => {


	const [ state, dispatch ] = useReducer( SelectorReducer, {
		list:[
			{id:0, key:"USA", title:"USA" },
			{id:1, key:"Russia", title:"Russia" },
			{id:2, key:"China", title:"China" },
			{id:3, key:"Korea", title:"Korea" },
			{id:4, key:"Belarus", title:"Belarus" },
			{id:5, key:"Kongo", title:"Kongo" },
			{id:6, key:"Armenia", title:"Armenia" },
			{id:8, key:"Poland", title:"Poland" },
			{id:9, key:"Baltia", title:"Baltia" },
			{id:10, key:"Czech", title:"Czech" },
			{id:11, key:"Bulgaria", title:"Bulgaria" },
			{id:12, key:"Abkhazia", title:"Abkhazia" }
		],
		getValue:"City",
		visible:false
	});

	let entity = props.entity||{};

	useMemo(() => {
		return entity = state.getValue;
	}, [ entity]);

	return(
		<section className={"selector"}>
			<input  className={"selector-input"}  value={entity} onClick={()=>{ dispatch(["visible"])}} onChange={()=>{}}/>
			<div className={"selector-block" +(!state.visible ? " hidden" : " ")}>
				{
					state.list.map( (unit,index)=>{
						return(
							<p  className={"selector-block-item" +(!state.visible ? " hidden" : " ")} key={unit.key} onClick={()=>{ dispatch(["selector",{ index:index, key:unit.key  } ])}}>{ unit.title }</p>
						)
					})
				}
			</div>
		</section>
	)
};