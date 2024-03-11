import React, { useState, useEffect, useReducer } from 'react';
import ReactDOM from 'react-dom';


const DemoAreaReducer = ( state, [ type, data ], props ) => {

	if( type === "expenses" ){
		return{
			...state,
			expenses: data
		}
	};

	return state;
};


export const DemoArea = (props) => {
	const [ state, dispatch ] = useReducer( DemoAreaReducer, {
		expenses: []
	});

	const getDate = ( dateTokens )=>{
		return new Date( dateTokens ).toLocaleString();
	};

	const getChart = ( id  ) => {

		if( !id )
			return;

		RequestEmu.transactions( id, (response)=>{

			if( !response  )
				return;

			let expenses = [];

			for( let line of response){

				expenses.push({
					amount: line.amount,
					date: getDate( line.created_at ),
					id: line.id,
					key: line.id
				});
			}

			dispatch([ "expenses", expenses ]);
			console.log(expenses );
		});
	};

	useEffect(() => {
		getChart( props.id);
	}, [ props.id ]);

	console.log( state.expenses );


}



