import React, { useEffect, useMemo, useState,useReducer, useRef } from "react";
import "@components/Table-Repeat/style/table-repeat.scss"



export const TableRepeatReducer  = ( state, [ type, data ], props ) => {

	if( type==="add" ){
		let list = [...state.list];

		list.push({
			...data,
			id: Math.floor( Math.random() *  100000.0 )
		});

		return{
			...state,
			list:list
		}
	};

	if( type==="remove" ){
		let list = [...state.list];
		list=list.filter((item)=> item.id !==  data.id);

		return{
			...state,
			list:list
		}
	};

	if( type==="change" ){

		let value = {
			...state.value,
			[data.key]: data.value
		};

		console.log("change", value);

		return{
			...state,
			value:value
		}
	};

	if( type === "reset" ){

		let value = {};

		if( data.key ){
			let line = data.list.find(( item ) => item.id === data.key );

			for( const item of data.inputs ){
				value[ item.key ] = line ? line[ item.key ] : "";
				console.log("reset", line);
			}
		}

		return {
			...state,
			value:value
		}
	};

	if( type === "changeData" ){
		let list = [ ...state.list ];
		let index = list.findIndex(( item ) => item.id === data.key );

		if( index > -1 )
			list[ index ] = { ...list[ index ], ...data.value };

		console.log("changeData", index);

		return {
			...state,
			list: list
		}
	};

	if(type==="edit"){

		console.log(data.key, "edit");
		return{
			...state,
			selectId: data.key
		}
	};

	if( type === "visible" ){

		return {
			...state,
			visible: data
		}
	};

	return state;
};



export const TableRepeat= (  props ) => {

	const [ state, dispatch ] = useReducer( TableRepeatReducer, {
		inputs:[
			{id:0, title:"name", key: "name",  value:""},
			{id:1, title:"surname", key: "surname",  value:""},
			{id:2, title:"patronymic", key: "patronymic",  value:""},
			{id:3, title:"age", key: "age",  value:""},
		],
		list:[],
		value:{},
		selectId:null,
		visible: false
	});

	useEffect(()=>{
	 	dispatch([ "reset", {key: state.selectId, inputs: state.inputs, list: state.list }]);
	},[ state.selectId, state.inputs, state.list ]);

//useEffect(() => {
//	dispatch([ "visible", state.selectId ? true: false]);
//}, [  state.selectId ]);



	return(
		<article className={"chart"}>

			<section  className={"chart-inp-wrap"}>
				<div className={"chart-inp"}>
					{
						state.inputs.map( (item, index)=>{
							return(
								<input className={"chart-inp-item"}
								   placeholder={item.title}
								   type={"text"}
								   onChange={(event)=> dispatch([ "change", { value: event.target.value, key: item.key}])}
									value={state.value[item.key] || ""}
								   key={item.key}
									id={item.id}
								/>
							);
						})
					}
				</div>

				<p className={"chart-inp-btn"}>
					<span  className={"chart-inp-btn-item"} onClick={()=> dispatch([ "add", state.value])}>Add</span>
					<span  className={"chart-inp-btn-item"} onClick={()=> dispatch([ "changeData",{value: state.value,  key: state.selectId }])}>Change</span>
				</p>
			</section>

			<section className={"chart-body"}>
				{
					state.list.map((line)=>{
						return(
							<div className={"chart-row"} key={line.id}>
								<p  className={"chart-row-item"}>{line.id}</p>

								{state.inputs.map( (item)=>{
									return(
											<p className={"chart-row-item"} key={item.key}>{ line[item.key] }</p>
										);
									})
								}

								<p className={"chart-row-btn"}>
									<span className={"chart-row-btn-item"} onClick={()=> dispatch([ "edit", {key: line.id}])}>Edit</span>
									<span className={"chart-row-btn-item"} onClick={()=> dispatch([ "remove", {id: line.id}])}>Remove</span>
								</p>
							</div>
						)
					})
				}
			</section>
		</article>
	);


};