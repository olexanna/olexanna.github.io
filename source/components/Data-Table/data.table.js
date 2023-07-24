import React, { useEffect, useMemo, useState,useReducer, useRef } from "react";
import "@components/Data-Table/styles/data-table.scss"
import {Button } from "@components/Data-Table/button";



const DataTableReducer = ( state, [ type, data ], props ) => {

	if(type === "create"){

		let found = null;

		for( let item of state.list ){

			if( item.mail == data.mail || item.login == data.login ){
				found = item;
				break;
			};
		};

		if( found ){
			return {
				...state,
				errors: {}
			};
		};

		let list = [...state.list];

		list.push({
			...data,
			id: Math.floor( Math.random() *  100000.0 )
		});

		let value = { ...state.value };
		let errors = {...state.errors};

		for( let key in value ){
			value[ key ] = "";
			errors[key] = "";
		};

		return{
			...state,
			value: value,
			errors:errors,
			visible: false,
			list: list
		}
	};

	if(type === "data"){

		let value = {
			...state.value,
			[data.key]: data.value
		};

		return{
			...state,
			value: value
		}
	};

	if(type === "error"){
		return{
			...state,
			errors: data
		}
	};

	if(type === "remove"){

		let list = [...state.list];

		list = list.filter((item)=>item.id!== data.id );

		return{
			...state,
			list: list
		}
	};

	if(type === "changeData"){

		let value = { ...state.value };
		let errors = {...state.errors};

		for( let key in value ){
			value[ key ] = "";
			errors[key] = "";
		};

		let list = [...state.list];

		let index = list.findIndex((item)=>item.id === data.id);

		if( index > -1 ){
			list[index] = {...list[index], ...data.value}
		}

		console.log("type= changeData: ", list[index]);

		return{
			...state,
			list: list,
			errors:errors,
			value:value,
			visible: false
		}
	};

	if(type === "edit"){

		let value = {};

		if(data.key){
			let line = state.list.find((item)=>item.id === data.key );

			for( const item of state.inputs){
				value[item.key] = line ? line[item.key]:"";
				console.log( "type=edit: ", 	value[item.key]);
			}
		}
		
		return{
			...state,
			indexId: data.key,
			value:value,
			visible: true
		}
	};

	if(type === "visible"){

		let value = { ...state.value };
		let errors = {...state.errors};

		for( let key in value ){
			value[ key ] = "";
			errors[key] = "";
		};

		return{
			...state,
			visible: data,
			errors:errors,
			value:value,
		}
	};

	if(type === "close"){

		return{
			...state,
			visible: data
		}
	};

	if( type === "reset" ){
		let value = {};

		if(data.key){
			let line = data.list.find((item)=>item.id === data.key );

			for( const item of data.inputs){
				value[item.key] = line ? line[item.key]:"";
			}
		}

		return {
			...state,
			value:value
		}
	};

	return state
};


const CheckInput =( inputs, object )=>{

	let result = {
		errors: {},
		count: 0,
		failed: false
	};

	for( let key in object ){
		let item = object[ key ];
		let column = inputs.find(( f ) => f.key == key );

		if( column && column.type == "hidden" )
			continue;

		console.log( column, key, item, "CheckInput");

		if( item ){
			result.count++;
			//console.log(result.count,  "count");
			continue;
		};

		result.errors[ key ] = "error";
		result.failed = true;
	};

	if( !result.count )
		result.failed = true;

	return result;
};

export const DataTable = ( props ) => {

	const [ state, dispatch ] = useReducer( DataTableReducer, {
		inputs:[
			{id: 0, title:"id", key:"id",value:"", type:"hidden"},
			{id: 1, title:"surname", key:"surname", value:""},
			{id: 2, title:"name", key:"name", value:""},
			{id: 3, title:"patronymic", key:"patronymic", value:""},
			{id: 4, title:"mail", key:"mail", value:""},
			{id: 5, title:"login", key:"login", value:""}
		],
		list: [],
		errors: {},
		visible: false,
		value: {
			surname: "",
			name: "",
			patronymic: "",
			mail: "",
			login: ""
		},
		indexId: null
	});

	return(
		<article className={"data"}>
			<section
				className={"data-backdrop " + (state.visible ? " flex":  " hidden"   )}
				onClick={()=>{ dispatch(["visible", false])}}
			>{}</section>

			<div className={"title"}>
				<p className={"title-item"}>Users</p>
				<Button btnClass={"addBtn"} button={"Add"} onClick={()=>{ dispatch(["visible", true])}}/>
			</div>

			<div className={"data-title"}>
				{
					state.inputs.map((item)=>{
						return(
							<p className={"data-title-item"} key={item.key}>{item.title}</p>
						)
					})
				}
			</div>


			<section className={"data-body"} >
				{
					state.list.map((line)=>{

						return(
							<div className={"data-row"} key={line.id}>
								<p className={"data-row-item"}>{line.id}</p>

								{
									state.inputs.map((item)=>{
										if(item.type ==="hidden"){
											return null;
										}
										return(
											<p className={"data-row-item"} key={line.key + ":" + item.key}>{line[item.key]}</p>
										)
									})
								}

								<p className={"data-row-btn"}>
									<span className={"data-row-btn-item"}
										onClick={()=>{ dispatch(["edit", {key:line.id}])}}
									>
										Edit
									</span>
									<span className={"data-row-btn-item"} onClick={()=>{ dispatch(["remove", {id:line.id}])}}>Remove</span>
								</p>
							</div>
						)

					})
				}
			</section>


			<section className={"popup " + (state.visible ? " flex-column":  " hidden"   )}>
				<p className={"popup-title"}>
					<span className={"popup-title-text"}>Create user</span>
					<span className={"popup-title-close"} onClick={()=>{ dispatch(["close", false])}}>x</span>
				</p>

				<div className={"popup-body"}>
					{
						state.inputs.map((item)=>{
							if(item.type ==="hidden"){
								return null;
							}
							return(
								<div className={"popup-field" } key={item.key}>
									<p className={"popup-field-text" }>
										<span className={"popup-field-text-title" }>{item.title}</span>
										<span className={"popup-field-text-error" }>{state.errors[ item.key ] ? ": error-fill in the data":  " "}</span>
									</p>

									<input className={"popup-field-inp "  + (state.errors[ item.key ] ? " error" : "")}
										placeholder={item.title}
										type={"text"}
										value={state.value[item.key]|| ""}
										onChange={(event)=>{ dispatch(["data", {value: event.target.value, key:item.key}])} }
										autoComplete={"chrome-off"}
									/>
								</div>
							)
						})
					}
				</div>

				<div className={"create-wrap"}>
					<Button btnClass={"popup-btn create"} button={"Create"}
						onClick={()=>{
							let check = CheckInput( state.inputs, state.value );
							console.log( "check.errors: ", check.errors );

							if( !check.failed ){
								dispatch(["create",  state.value]);
							}else{
								dispatch(["error", check.errors]);
							};
						}}
					/>

					<Button btnClass={"popup-btn change-data"} button={"change data"}
						onClick={()=>{
							let check = CheckInput( state.inputs, state.value );
							console.log( "check.errors: ", check.errors );

							if( !check.failed ){
								dispatch(["changeData",  {id:state.indexId, value:state.value}])
							}else{
								dispatch(["error", check.errors]);
							};
						}}
					/>
				</div>
			</section>

		</article>
	);
};