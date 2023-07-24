import React, { useEffect, useMemo, useState,useReducer, useRef } from "react";
import "@components/Table-Finaly/style/table-finally.scss"


const TableFinallyReducer = ( state, [ type, data ], props ) => {

	if( type === "add" ){
		let list =  [...state.list];

		list.push({
			...data,
			id: Math.floor( Math.random() *  100000.0 )
		});

		console.log(list,"add");

		return {
			...state,
			list: list
		}
	};

	if( type === "remove" ){
		let list =  [...state.list];

		list = list.filter((item)=> data.id !== item.id);
		console.log(list,"add");

		return {
			...state,
			list: list
		}
	};


	if( type === "change" ){
		let value;

		value = {
			...state.value,
			[data.key]: data.value
		};

		return{
			...state,
			value:value
		}
	};

	if( type === "reset" ){
		let value = {};

		if(data.key){
			let line = data.list.find((item)=>item.id === data.key );

			for( const item of data.inputs){
				 value[item.key] = line ? line[item.key]: "";
				console.log("reset", line);
			}
		}

		return {
			...state,
			value:value
		}
	};

	if( type === "edit" ){
		console.log("edit", data.key);
		return {
			...state,
			indexId: data.key
		}
	};

	if( type === "changeData" ){
		let list = [...state.list ];
		let index = state.list.findIndex( (item )=>data.id=== item.id);

		if( index > -1 ){
			list[index] = { ...list[ index ], ...data.value };
			console.log("changeData", list[index]);
		}
		return {
			...state,
			list: list
		}
	};

	return state;
};




export const TableFinally = (  props ) => {

	const [ state, dispatch ] = useReducer( TableFinallyReducer, {
		inputs:[
			{id: 0, key:"name", title:"name" , value:""},
			{id: 1, key:"surname", title:"surname" , value:""},
			{id: 2, key:"patronymic", title:"patronymic" , value:""},
			{id: 3, key:"age", title:"age" , value:""}
		],
		list: [],
		value: {},
		indexId: null,
		visible: false
	});



	useEffect(() => {
		dispatch([ "reset", {list: state.list, inputs: state.inputs, key: state.indexId }]);
	}, [ state.list,state.inputs,  state.indexId ]);


	return(
		<article className={"table"}>
			<section className={"table-inp"}>
				{
					state.inputs.map((item)=>{
						return(
							<input className={"table-inp-item"}
								placeholder={item.title}
								key={item.key}
								type={"text"}
								value={state.value[item.key]||""}
							   	onChange={(event)=>{  dispatch(["change", {value: event.target.value, key:item.key}])    }}
							/>
						)
					})
				}

				<p  className={"table-inp-btn"}>
					<span  className={"table-inp-btn-item"} onClick={()=>{dispatch(["add", state.value])}}>Add</span>
					<span  className={"table-inp-btn-item"} onClick={()=>{dispatch(["changeData", {id: state.indexId, value:  state.value}])}}>Change</span>
				</p>
			</section>

			<section className={"table-body"}>
				{
					state.list.map((lien)=>{
						return(
						<div className={"table-row"}>
							<p className={"table-row-item"}>{lien.id}</p>
							{
								state.inputs.map((item)=>{
									return(
										<p  className={"table-row-item"} key={item.key}>{ lien[item.key] }</p>
									)
								})
							}
							<p className={"table-row-btn"}>
								<span className={"table-row-btn-item"} onClick={()=>{dispatch(["edit", {key:lien.id }])}}>Edit</span>
								<span className={"table-row-btn-item"} onClick={()=>{dispatch(["remove", {id:lien.id }])}}>Remove</span>
							</p>
						</div>
						)
					})
				}
			</section>
		</article>
	);
};