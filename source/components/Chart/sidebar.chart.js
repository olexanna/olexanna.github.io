import React, { useEffect, useMemo, useState,useReducer, useRef } from "react";
import "@components/Chart/styles/sidebar.chart.scss"
import {Graph } from "@components/Chart/graph";
import { RequestEmu } from "@components/Chart/request.emu";


const OperationType = {
	"REPLENISH": "Пополнение",
	"WRITE_OFF": "Списание",
};
const OperationTypeStyle = {
	"REPLENISH": "operation-replenish",
	"WRITE_OFF": "operation-writeOff",
};
const OperationAmountStyle = {
	"REPLENISH": "+",
	"WRITE_OFF": "-",
};
const OperationAmountSign = {
	"REPLENISH": "replenish-amount",
	"WRITE_OFF": "writeOff-amount",
};

const SidebarChartReducer = ( state, [ type, data ], props ) => {

	if( type === "transactions" ){
		return{
			...state,
			transactions: data
		}
	};

	if( type === "visible" ){
		return{
			...state,
			 visible: data
		}
	};

	return state;
};


export const SidebarChart = ( props ) => {

	const [ state, dispatch ] = useReducer( SidebarChartReducer, {
		transactions: [],
		visible: false,

		header:[
			{title: "Тип", key:"Тип"},
			{title: "Сумма", key:"Сумма"},
			{title: "Дата", key:"Дата"}
		]
	});

	 const getDate = ( dateTokens )=>{
	 	const months = ["01","02","03","04","05","06","07","08","09","10","11","12"];

		let date = new Date( dateTokens );
		let day = date.getDate();
		let month = months[date.getMonth()];
		let year = date.getFullYear();

		let parsedDateObj = day +"-" +month + "-" +year;
		return  parsedDateObj;
	};

	const getTime = ( dateTokens )=>{
		let time = new Date( dateTokens );

		let hours = time.getHours();
		let minutes = time.getMinutes();
		let sec = time.getSeconds();

		let parseTime = hours + ":" + minutes + ":" +  sec;
		return parseTime;
	};

	const getTransactions = ( id ) => {

		if( !id )
			return;

		RequestEmu.transactions( id, ( response ) => {

			if( !response )
				return;

			let transactions = [];

			for( let line of response ){

				transactions.push({
					type: line.type,
					amount: line.amount,
					date:getDate(line.created_at ),
					time:getTime(line.created_at ),
					id: line.id,
					key: line.id
				});
			}

			dispatch([ "transactions", transactions ]);
		});

	};

	useEffect(() => {
		getTransactions( props.id );
	}, [ props.id ]);

	useEffect(() => {
		dispatch([ "visible",  false ])
	}, [ props.id ]);


	return(
	<section className={ "sidebar-backdrop " + ( props.id  &&  !state.visible ?  " block" :  "hidden")  }>

		<section className={ "sidebar  "}>
			<p className={"props.id"}>{}</p>

			<p className={"chart-title"}>
				<span className={"chart-title-text"}>Использование токенов</span>
				<span className={"chart-title-close " } onClick={() => {dispatch([ "visible",  !state.visible ])} }>{}</span>
			</p>

			<div className={"chart"}>
				<div className={"chart-d"}>
					<div className={"chart-d-schedule"}>
						<Graph id={props.id}/>
					</div>

					<p className={"chart-d-mail"}>
						<span className={"chart-d-mail-i"}>{}</span>
						<span className={"chart-d-mail-title"}>{props.mail}</span>
					</p>
				</div>
			</div>

		<section className={"tokens"}>
			<p className={"tokens-title"}>История операций</p>

			<div  className={"tokens-header"}>
				{
					state.header.map((item)=>{
						return(
							<p className={"tokens-header-item"} key={item.key}>{item.title}</p>
						)
					})
				}
			</div>

			<div className={"tokens-wrap"}>{}
			{
				state.transactions.map((item)=>{

					return(
						<div className={"tokens-block "} key={item.key}>
							<p className={"tokens-block-type"}>
								<span  className={"tokens-block-type-i" + " " +  OperationTypeStyle[ item.type ] }>{}</span>
								<span className={"tokens-block-type-text"}>
									{
										OperationType[ item.type ] || ""
									}
								</span>
							</p>

							<p className={"tokens-block-item" } >
								<span  className={OperationAmountSign[item.type] }>{ OperationAmountStyle[item.type] + " " }</span>
								<span> {item.amount} </span>
							</p>

							<p className={"tokens-date"}>
								<span className={"tokens-date-item"}>{item.date}</span>
								<span className={"tokens-date-item"}>{item.time}</span>
							</p>
						</div>
					)
				})
			}
			</div>
		</section>
		</section>
	</section>
	);
};

