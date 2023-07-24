import React, { useEffect, useMemo, useState,useReducer, useRef } from "react";
import "@components/Table-Praxis/style/table-praxis.scss"



const TablePraxisReducer = ( state, [ type, data ], props ) => {

	if( type === "add" ){
		let list = [ ...state.list];

		list.push({
			...data,
			id: Math.floor( Math.random() *  100000.0 )
		});

		return{
			...state,
			list: list
		}
	};

	if( type === "change" ){

		let value={
			...state.value,
			[data.key]: data.value,
			index: data.index
		};

		return {
			...state,
			value:value
		}
	};

	if( type === "remove" ){
		let list = state.list.filter(( line ) => data.id !== line.id );

		return {
			...state,
			list:list
		}
	};

	if( type === "edit" ){

		return {
			...state,
			indexId: data.key
		}
	};

	if( type === "visible" ){

		return {
			...state,
			visible: data
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
			list[ index ] = data.value;

		return {
			...state,
			list: list
		}
	}

	return state;
};




export const TablePraxis = (  props ) => {

	const [ state, dispatch ] = useReducer( TablePraxisReducer, {
		inputs:[
			{id:0, title:"id", key:"id", placeholder: "id", type:"hidden"},
			{id:1, title:"age", key:"age", placeholder: "age", value:""},
			{id:2, title:"name", key:"name", placeholder: "name", value:""},
			{id:3, title:"surname", key:"surname", placeholder: "surname", value:""},
			{id:4, title:"patronymic", key:"patronymic", placeholder: "patronymic", value:""},
			{id:5, title:"sex", key:"sex", placeholder: "sex", value:""}
		],
		list:[],
		value:{},
		indexId:null,
		visible: false
	});

	useEffect(() => {
		dispatch([ "reset", { inputs: state.inputs, list: state.list, key: state.indexId } ]);
	}, [ state.inputs,  state.list, state.indexId ]);


	useEffect(() => {
		dispatch([ "visible", state.indexId ? true: false]);
	}, [  state.indexId ]);


	return(
		<section className={ "table" }>

			<div  className={"table-inp-wrap"}>
				<div className={"table-inp"}>
					{
						state.inputs.map((item, index)=>{

							if(item.type === "hidden"){
								return  null;
							}else{
								return(
									<input
										type={"text"}
										placeholder={item.placeholder || ""}
										className={"table-inp-item"}
										key={ item.key }
										autoComplete={"new-password"}
										value={state.value[item.key]|| ""}
										onChange={(event)=> dispatch([ "change", { value: event.target.value, key: item.key, index: index }])}
										id={item.id}
									/>
								)
							}
						})
					}
				</div>

				<p className={"table-btn"}>
					<span className={"table-btn-item"}  onClick={()=> dispatch([ "add", state.value])}>Add</span>
					<span className={"table-btn-item"}  onClick={()=> dispatch([ "changeData", {value: state.value, key: state.indexId}])}>Change</span>
				</p>
			</div>

			<div className={"table-column"}>
				{
					state.inputs.map((item, index)=>{
						return(
							<p className={"table-column-item"} key={item.key}>{item.key}</p>
						)
					})
				}
			</div>


			<div className={"table-body"}>
				{
					state.list.map((line, index)=>{
						return(
							<div className={"table-row"} key={ line.id }>
								<p className={"table-row-item"}>{ line.id }</p>
								{
									state.inputs.map((item, index)=>{
										if( item.type === "hidden"){
											return  null
										}else{
											return(
												<p className={"table-row-item"} key={ item.id }>{ line[item.key] }</p>
											)
										}
									})
								}
								<div className={"table-row-btn"}>
									<p className={"table-row-btn-item"} onClick={()=> dispatch([ "edit", { key:line.id }])}>edit</p>
									<p className={"table-row-btn-item"}  onClick={()=> dispatch([ "remove", { id:line.id }])}>remove</p>
								</div>

							</div>
						)
					})

				}
			</div>
		</section>
	);

};