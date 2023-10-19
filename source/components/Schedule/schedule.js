import React, { useEffect, useMemo, useState,useReducer, useRef } from "react";
import "@components/Schedule/styles/schedule.scss"



const ScheduleReducer=( state, [ type, data ] )=> {

	if(type =="data"){

		let value = {
			...state.value,
			[data.key]:data.value
		};

		return{
			...state,
			value:value
		}
	};

	if(type == "create"){
		let value = { ...state.value };
		let errors = {...state.errors};
	 	let abort  = null;

		for(let key in value){

			let item =  value[ key];

			if(item === ""){
				abort = key;
				break;
			}
			value[ key] = "";
			errors[ key ] = "";
		}
		if( abort ){
			return{
				...state,
				errors:{}
			}
		}

		let list  = [...state.list];

		list.push({
			...data,
			id:  Math.floor( Math.random() *  100000.0 )
		});

		return{
			 ...state,
			value:value,
			list:list,
			errors:errors
		}
	};

	if(type=="errors"){

		return{
			...state,
			errors:data
		}
	};

	if(type == "remove"){
		let list = [...state.list];
		list = list.filter((item)=> item.id != data.id );

		return{
			...state,
			list:list
		}
	};

	if(type == "edit"){
		let list = [...state.list];
		let value ={};

		if( data.key ){
			let line = list.find((item)=>item.id == data.key);

			for(let item of state.inputs){
				 value[item.key] =  line ? line[item.key] : "";
			}
		}

		return{
			...state,
			list:list,
			value: value,
			indexRow:data.key
		}
	};

	if(type == "changeData"){
		let list = [...state.list];
		let value = { ...state.value };
		let errors = {...state.errors};

		for(let key in value){
			value[key] = "";
			errors[key] = ""
		}

		let indexLine = list.findIndex((item)=> item.id == data.id);
		console.log(indexLine, "changeData");

		if( indexLine > -1 ){
			list[indexLine] = {...list[indexLine], ...data.value }
		}

		return{
			...state,
			list:list,
			value:value,
			errors: errors
		}
	};

	if(type == "tooltip"){
		return{
			...state,
			toolIndex:data.id,
			toolType:data.type
		}
	}

	return state;
};



const checkErrors = (obj)=>{
	let result = {
		errors:{},
		count:0,
		failed:false
	};

	for( let key in obj){
		let item =  obj[key];

		if( item ){
			result.count++;
			console.log(result.count);
			continue;
		}

		result.errors[key] = "error";
		result.failed = true;
		console.log(result.errors[key],result.failed);
	}
	if( !result.count )
		result.failed = true;
	console.log(result.errors);
	return result;
};

export const Schedule = ( props ) => {

	const [ state, dispatch ] = useReducer( ScheduleReducer, {
		inputs:[
			{id:0, value:"", key:"name", placeholder:"name"},
			{id:1, value:"", key:"surname", placeholder:"surname"},
			{id:2, value:"", key:"patronymic", placeholder:"patronymic"},
			{id:3, value:"", key:"age", placeholder:"age"},
			{id:4, value:"", key:"sex", placeholder:"sex"}
		],
		list:[],
		value:{
			name: "",
			surname: "",
			patronymic: "",
			age: "",
			sex: ""
		},
		errors:{},
		failed: false,
		indexRow: null,
		buttons:[
			{id:0, type:"edit", title:"edit", tooltip:"edit"},
			{id:1, type:"remove", title:"remove", tooltip:"remove"},
		],
		toolIndex:null,
		toolType: false
	});

	return(
		<article className={"table"}>
			<section  className={"inp"}>
				{
					state.inputs.map((item)=>{
						return(
						<div className={"inp-wrap"} key={item.key}>
							<p className={"inp-error" + (state.errors[item.key] ? " flex" : "")}>
								{ state.errors[item.key]  ?  "error:fill" : ""  }
							</p>
							<input className={"inp-item"+ (state.errors[ item.key ] ? " error" : "")}

								placeholder={item.placeholder}
								value={state.value[item.key] ||""}
								onChange={(event)=> dispatch([ "data", { value: event.target.value, key: item.key} ])}
							/>
						</div>
						)
					})
				}

				<div className={"inp-btn"}>
				<div className={"inp-create"}
			 		onClick={()=>{
			 				let check  = checkErrors(state.value );

							if(  !check.failed){
								dispatch( [ "create", state.value ] )
							}else{
								dispatch( [ "errors", check.errors] )
							}
						}
			 		}>{"Create"}</div>

				<div className={"inp-create"}
					 onClick={()=>{
						 let check  = checkErrors(state.value );

						 if(  !check.failed){
							 dispatch( [ "changeData",{id:state.indexRow,value: state.value}] )
						 }else{
							 dispatch( [ "errors", check.errors] )
						 }
					 }
					 }>{"Change Data"}</div>
				</div>
			</section>

			<section className={"row-list"}>
				{
					state.list.map((line, indexLine)=>{
						return(
							<div className={"row"}  key={line.id}>
								{
									state.inputs.map((item)=>{
										return(
											<p className={"row-item"} key={line.id + " :"  + item.key}>{line[item.key]}</p>
										)
									})
								}
								<div className={"row-btn"}>
									{
										state.buttons.map((item, indexBtn)=>{
											return(
												<p className={"row-btn-item"}
												   onClick={()=>{
													   if( item.type == "edit" ){
														    dispatch( [ "edit", {key: line.id}] )
													   }else if( item.type == "remove" ){
														   dispatch( [ "remove", {id: line.id}] )
													   }}
												   }
												key={item.id}
												   onMouseOver={()=>{dispatch( [ "tooltip", {id:line.id, type: item.type }])}}
												   onMouseOut={()=>{dispatch( [ "tooltip", {id:null, type: item.type }] )}}
												>
													<span className={"row-btn-tooltip" + (state.toolIndex == line.id && state.toolType == item.type ? " flex": "")}>{item.tooltip}</span>
													<span >{item.title}</span>
												</p>
											)
										})

									}
								</div>
							</div>
						)
					})
				}
			</section>
		</article>
	);
};