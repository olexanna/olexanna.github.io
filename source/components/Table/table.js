import React, { useEffect, useMemo, useState,useReducer } from "react";
import "@components/Table/styles/table.scss"
import {TableBody} from "@components/Table/body";
import {TableInputs } from "@components/Table/input";
import {TableTitles } from "@components/Table/table-titles";

const TableReducer = ( state, [ type, data ] ) => {

if( type==="add" ){
		let list = [...state.list];

		list.push({
			...data,
			id: Math.floor( Math.random() *  100000.0 )
		});
		console.log(list, "action:add");
		return {
			...state,
			list: list
		};
	};

	if( type === "remove" ){
		let list = state.list.filter(( row ) => row.id !== data.id );

		return {
			...state,
			list: list
		};
	}

	if( type === "edit" ){
		console.log(data.key, "edit");

		return {
			...state,
			selectedKey : data.key,
		};
	}

	if( type === "changeData" ){
		let list = [ ...state.list ];
		let index = list.findIndex(( item ) => item.id === data.key );

		if( index > -1 )
			list[ index ] = data.value;
		console.log(list[ index ], "changeData");
		return {
			...state,
			list: list
		}
	}

	return state
};


export const Table = (props) => {

	const [ state, dispatch ] = useReducer( TableReducer, {
		row: [
			{ id:"0", placeholder:"", title: "id", key: "id", type: "system" },
			{id:"1", placeholder:"name", title: "name",  value:"", key:"name"},
			{id:"2", placeholder:"surname", title: "surname", value: "", key:"surname"},
			{id:"3", placeholder:"email",title: "email", value: "",  key:"email"},
			{id:"4", placeholder:"password", title: "password",  value: "", key:"password"},
			{ id:"5", placeholder:"", title: "actions",key: "actions", type: "actions" }
		],
		list:[],
		selectedKey: null
	});

	return(
		<section className={"table"}>
			<TableInputs inputs={state.row} list={ state.list }  reducer={dispatch} selectedKey={ state.selectedKey }/>
			<TableTitles tableTitles={state.row}/>
			<TableBody row={state.row} list={state.list}  reducer={dispatch}/>
		</section>
	)
};

