import React, { useEffect, useMemo, useState,useReducer, useRef } from "react";
import "@components/Selector-json/styles/selector-json.scss"


const SelectorJsonReducer = ( state, [ type, data ], props ) => {

	if( type === "list"){

		return{
			...state,
			list: data,
			sortList: data
		}
	}

	if( type === "check"){

		let list = [...state.list];
		let select = [...state.select];
		let sortList = [ ...state.sortList ];

		sortList[ data.index ].mark = data.check;

		let index = select.findIndex(( item ) => item.key === data.key);
		console.log(index, "check" );

		if( index  ){
			select.splice( index, 1 );
		}else{
			select.push({ value: data.value, key: data.key, id: data.id });
		};

		return{
			...state,
			list:list,
			select:select,
			index: data.index,
			sortList:sortList
		}
	}

	if( type === "remove" ){
		let list = [...state.list];

		list.forEach(( item ) => {

			if( item.id != data.id )
				return;

			item.mark = "";
		});

		let select = state.select.filter(( item ) => data.id !== item.id);

		return{
			...state,
			list:list,
			select: select
		}
	}

	if( type === "search" ){
		let list = [...state.list];
		let sortList = [ ...state.sortList ];

		let value = data.value.trim().toLowerCase();

		if( value.length > 0  ){
			sortList = list.filter((item)=>{
				return item.key.toLowerCase().match( value )
			});
		}else{
			sortList = [ ...state.list ];
		};

		return {
			...state,
			list:list,
			sortList: sortList,
			value: value
		}
	};

	if( type === "next" ){
		let select = [...state.select];
		let scrollLeft = state.scrollLeft + 120;

		let display = data.display.current.clientWidth;
		let slider = data.slider.current.clientWidth;
		let max = (slider-display);

		if( scrollLeft > max )
			scrollLeft = max;

		console.log( scrollLeft, max );

		return {
			...state,
			scrollLeft: scrollLeft,
			select:select
		};
	};

	if( type === "prev" ){
		let select = [...state.select];
		let scrollLeft = state.scrollLeft - 120;
		let min = 0;

		if( scrollLeft < min )
			scrollLeft = min;

		return {
			...state,
			scrollLeft: scrollLeft,
			select: select
		};
	};

	if( type === "swipe" ){
		return{
			...state,
			swipe:data,
			zIndex:data ? 2 : 0
		}
	}

	if( type === "padding" ){

		let tagsBlock = state.tagsBlock;

		if( data.select.length > 0 ){
			 tagsBlock = "10px 0px 10px 3px";
		}else {
			 tagsBlock = "0px 0px 0px 3px";
		}

		return{
			...state,
			tagsBlock:tagsBlock
		}
	};

	return state;
};


export const SelectorJson = (props, data) => {

	const [ state, dispatch ] = useReducer( SelectorJsonReducer, {
		sortList: [],
		list:[],
		select:[],
		check: false,
		index:null,
		value:"",
		scrollLeft: 0,
		swipe:false,
		zIndex:0,
		tagsBlock: ""
	});

	let slider = useRef( null );
	let display = useRef( null );

	const getList = () => {
		fetch( "/assets/requests/data.json" )
			.then(( data ) => data.json() )
			.then(( data ) => {

			console.log(data);

			if( !data.result  )
				return;

			let listing=[];

			for( let line of data.result ){

				listing.push({
					country: line.country,
					city: line.city,
					key:  line.country + " " +  line.city,
					value:"",
					id: Math.floor( Math.random() *  100000.0 )
				});
			}

			dispatch([ "list", listing ]);

			}).catch(( e ) => {});
  	};

	useEffect(() => {
		getList();
	}, []);

	useEffect(() => {
		dispatch([ "padding",{select: state.select}]);
	}, [state.select]);

	return(
		<article className={"list-body"}>

			<div className={"list-backdrop" + (!state.swipe ? " hidden": "")}
				 onClick={()=>{dispatch(["swipe", false])}} style={{zIndex: state.zIndex }}>
			</div>


		<section className={"list-wrap"} style={{zIndex: state.zIndex +1 }}>
			<section className={"list-tags"} >
					<div className={"list-tags-search-wrap"}>
					<p className={"list-tags-left"} onClick={()=>{	dispatch(["prev",{display:display, slider:slider }]) }}> {"<"} </p>
					<input
						className={"list-tags-search"}
						placeholder={"Search..."}
						value={state.value}
						onChange={(event) => dispatch([ "search", { value: event.target.value } ]) }
						onFocus={()=>{dispatch(["swipe", true ])}}
					/>
					<p className={"list-tags-right"}  onClick={()=>{	dispatch(["next",{display:display, slider:slider }]) }}> {">"} </p>
				</div>

				<div className={"tags-block-wrap"}  ref={display}>
					<div className={"tags-block-display "}   style={{marginLeft:-(state.scrollLeft ) + "px", padding: state.tagsBlock }} ref={slider}>
					{
						state.select.map((item)=>{
							return(
								<p className={"tags-block "} key={item.key} >
									<span  className={"tags-block-remove"} onClick={()=>{	dispatch(["remove",{id:item.id}])}}>x</span>
									<span className={"tags-block-item"}>{item.value}</span>
								</p>
							)
						})
					}
					</div>
				</div>
			</section>

			<section className={"list   "+ (!state.swipe ? "hidden": " ")}  >
			{
				state.sortList.map((item, index)=>{
					return(
						<div key={item.key} className={"list-block"}>
							<p className={"list-block-item"}>{item.country }</p>
							<p className={"list-block-item"}>{item.city}</p>
							<p className={"list-block-check " + (item.mark)}
							   onClick={()=>{
									dispatch(["check", { index: index, key: item.key, value: item.key, id: item.id, check: item.mark  ==  "check"? " " : "check" }])}
							   }>
								{}
							</p>
						</div>
					)
				})
			}
		</section>
		</section>
		</article>
	)
};