import React, { useEffect, useMemo, useState, useReducer } from "react";
import ".//styles/table.scss"
import { TableBody } from "@components/Table-Test/body";
import { TableHeader } from "@components/Table-Test/header";
import { TableInputs } from "@components/Table-Test/table.inputs";


const TableRTestReducer = ( state, [ type, data ] ) => {

	if( type === "remove" ){
		let list = state.list.filter(( row ) => row.id !== data.id );

		return {
			...state,
			list: list
		};
	}

	if( type === "add" ){
		let list = [ ...state.list ];

		list.push({
			...data,
			id: Math.floor( Math.random() *  100000.0 )
		});

		return {
			...state,
			list: list
		};
	}

	if( type === "edit" ){
		return {
			...state,
			selectedKey: data.key,
			display: true
		}
	}

	if( type === "changeValue" ){
		let list = [ ...state.list ];
		let index = list.findIndex(( item ) => item.id === data.key );

		if( index > -1 )
			list[ index ] = { ...list[ index ],  ...data.value };

		return {
			...state,
			list: list,
			display: true
		}
	}

	return state;
};


export const TableTest = ( props ) => {

	const [ state, dispatch ] = useReducer( TableRTestReducer, {
		header: [
			{ id: "0", title: "id", key: "id", type: "system" },
			{ id: "1", title: "user", value: "", key: "user" },
			{ id: "2", title: "email", value: "", key: "email" },
			{ id: "3", title: "password", value: "", key: "password" },
			{ id: "4", title: "actions", key: "actions", type: "actions" },
		],
		list: [],
		selectedKey: null,
		display: false
	});

	return(
		<div className={ "table" }>
			<TableInputs header={ state.header } reducer={ dispatch } list={ state.list } selectedKey={ state.selectedKey }/>
			<TableHeader header={ state.header } reducer={ dispatch } list={ state.list }/>
			<TableBody header={ state.header } list={ state.list } reducer={ dispatch }/>
		</div>
	)
};