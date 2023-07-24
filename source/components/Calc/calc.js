import React, { useEffect, useMemo, useState,useReducer, useRef } from "react";
import "@components/Calc/styles/calc.scss"

const CalcOperators = {
	"+": ( a, b ) => {},
	"-": ( a, b ) => {},
	"*": ( a, b ) => {},
	"/": ( a, b ) => {},
	"%": ( a, b ) => {},
};
const CalcCompute = ( args ) =>{
	let computed = [];
	let string = "";

	for( let index in  args){

		if( CalcOperators[ args[ index ] ] ){

			if( string )
				computed.push( parseFloat( string ) );
				computed.push( args[ index ] );

			string = "";
			continue;
		};

		string += args[ index ];
	};

	if( string )
		computed.push( parseFloat( string ) );


	return computed;
};


const CalcReducer = ( state, [ type, data ], props ) => {

	if( type === "val" ){

		let args = [ ...state.args ];
		let computed = CalcCompute( args );

		if( data.value == "del" ){
			args = [];

		}else if( data.value == "=" ){
			let string = computed.join("");
			let calc = eval( string );
			args = [ calc ];

		}else if(data.value == "C" ){
			args.splice(-1,1);

		}else if( data.value == null|| undefined){
			args = [];

		}else if( data.value =="%" ){

			for( let index in computed ){

				if( CalcOperators[ computed[ index ] ] )
					continue;

				computed[ index ] /= 100.0;
			};

			args = computed;

		}else{
			args.push( data.value );
		};

		computed = CalcCompute( args );

		return{
			...state,
			args: args,
			computed: computed,
		}
	};
};



export const Calc = ( props ) => {

	const [ state, dispatch ] = useReducer( CalcReducer, {
		buttons:[
			{id:0, value: "del", key: "del", type:"del"},
			{id:1, value: "-", key: "minus", type:"minus"},
			{id:2, value: "+", key: "plus", type:"plus"},
			{id:3, value: "%", key: "percent", type:"percent"},
			{id:4, value: "*", key: "multiply", type:"multiply"},
			{id:5, value: "0", key: "zero"},
			{id:6, value: "1", key: "one"},
			{id:7, value: "2", key: "two"},
			{id:8, value: "3", key: "three"},
			{id:9, value: "4", key: "four"},
			{id:10, value: "5", key: "five"},
			{id:11, value: "6", key: "six"},
			{id:12, value: "7", key: "seven"},
			{id:13, value: "8", key: "eight"},
			{id:14, value: "9", key: "nine"},
			{id:15, value: "=", key: "equal"},
			{id:16, value: "C", key: "erase"},
			{id:17, value: ".", key: "point"},
			{id:18, value: "/", key: "split"},
		],
		computed: [],
		args: []
	});

	return(
		<article className={"calc"}>
			<div className={"calc-display"}>{ state.computed.join( "" ) }</div>

			<section className={"calc-btn"}>

				<div className={"calc-btn-wrap"}>
				{
					state.buttons.map((item)=>{
						return(
							<p className={"calc-btn-wrap-item"}
							   key={item.key}

							   onClick={() => dispatch([ "val", { value: item.value, key: item.key } ]) }>
								{item.value}
							</p>
						)
					})
				}
				</div>
			</section>
		</article>
	);
};