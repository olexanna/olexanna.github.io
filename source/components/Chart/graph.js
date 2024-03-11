import React, { useState, useEffect, useReducer } from 'react';
import ReactDOM from 'react-dom';
import {RequestEmu } from "@components/Chart/request.emu";
import { GraphCanvas } from "@components/canvas";

const GraphReducer = ( state, [ type, data ], props ) => {

	if( type === "expenses" ){
		return{
			...state,
			expenses: data
		}
	};

	return state;
};


export const getDate = ( dateTokens )=>{
	return new Date( dateTokens ).toLocaleString();
};

export const Graph = (props) => {
	const [ state, dispatch ] = useReducer( GraphReducer, {
		expenses: []
	});

	const GetTransactions = ( id )=>{

		RequestEmu.transactions( id, (response)=> {

			if( !id )
				return;

			let expenses = [];

			for( let line of response ){
				expenses.push( {
					amount: line.amount,
					date: getDate( line.created_at ),
					id: line.id,
					key: line.id
				} );
			}

			dispatch( [ "expenses", expenses ] );

		});

	};

	useEffect(() => {
		GetTransactions( props.id );
	}, [props.id]);

	return(
		<GraphCanvas width={"404"} height={"324"} array={ state.expenses }>{}</GraphCanvas>
	);

};



