import React, { useEffect, useMemo, useState, useReducer } from "react";


const TableInputsReducer = ( state, [ type, data ], props ) => {

	if( type === "reconstruct" ){

		let keyValue = {};

		if( data.key ){
			let line = data.list.find(( item ) => item.id === data.key );

			for( const headerRow of data.header ){
				keyValue[ headerRow.key ] = line ? line[ headerRow.key ] : "";
				console.log(keyValue[ headerRow.key ], "line", "reconstruct" );
			}
		}else{
			for( const headerRow of data.header ){
				keyValue[ headerRow.key ] = "";
			}
		}
		return {
			...state,
			keyValue
		}
	};

	if( type === "visible" ){

		return {
			...state,
			visible: data
		}
	};

	 if( type === "change" ){

		let keyValue = {
			...state.keyValue,
			[data.key]: data.value
		};

		 return {
			 ...state,
			 keyValue
		 }
	};

	 return state;
};


export const TableInputs = ( props ) =>{
	let header = props.header;
	let reducer = props.reducer;
	let list = props.list;
	let selectedKey = props.selectedKey;

	const [ state, dispatch ] = useReducer( TableInputsReducer, {
		visible: false,
		keyValue: {}
	});

	useEffect(() => {
		dispatch([ "reconstruct", { header: header, list: list, key: selectedKey } ]);
	}, [ header, list, selectedKey ]);

	useEffect(() => {
		dispatch([ "visible", selectedKey ? true : false ]);
	}, [selectedKey ]);

	return(
		<div className={"table-inp" }>
			<p className={"table-inp-open"} onClick={() => reducer([ "edit", { key: "-1" } ]) }>Open</p>
			<p className={"table-inp-close"} onClick={() => reducer([ "edit", { key: null } ]) }>X</p>

			<div className={"table-inp-wrap"+ ( !state.visible ? " hidden" : "" ) }>
				<div className={ "table-inp-block" }>
					{
						header.map(( headerRow) => {

							if( headerRow.type === "system" || headerRow.type === "actions" )
								return null;

							return(
							<input
								className={"table-inp-item"}
								key={ headerRow.key }
								value={ state.keyValue[ headerRow.key ] || ""}
								onChange={( e ) => {
									dispatch([ "change" , { key: headerRow.key, value: e.target.value } ])
								}}/>
							);
						})
					}
				</div>

				<p className={"table-inp-add"} onClick={() => reducer([ "add", state.keyValue ]) }>Add</p>
				<p className={"table-inp-add"} onClick={() => reducer([ "changeValue", { key: selectedKey, value: state.keyValue }]) }>Change</p>
			</div>
		</div>
	);
};