import React, { useEffect, useMemo, useState,useReducer, useRef } from "react";
import "@components/Chart/styles/chart.scss"
import {SidebarChart } from "@components/Chart/sidebar.chart";
import {RequestEmu } from "@components/Chart/request.emu";


const ChartReducer = ( state, [ type, data, data2 ], props ) => {

	if( type === "list" ){
		return{
			...state,
			list: data,
			search: { ...state.search, limit: data2 }
		}
	};

	if( type === "select" ){
		let list = [...state.list];

		let selectedData = state.list.find(( item ) => item.id === data.id ) || {};

		console.log( selectedData, "select");

		return{
			...state,
			selected: { id: data.id, data: selectedData},
			list:list
		}
	};

	if( type === "search" ){
		return{
			...state,
			search: {
				query: data,
				sort: state.search.sort,
				sortKey: state.search.sortKey,
				page: "1",
				limit: state.search.limit
			},
			pickSort: data
		}
	};
	if( type === "page" ){
		console.log(state.search.page, "page");
		return{
			...state,
			search: { ...state.search, page: data },
			select: data.index
		}
	};
	if( type === "sort" ){
		console.log( data, "pickSort");
		return{
			...state,
			search: {
				query: state.search.query,
				sort: state.search.sort === "desc" ? "asc" : "desc",
				sortKey: state.search.sortKey,
				page: "1",
				limit: state.search.limit
			},
			pickSort: data
		}
	};

	if( type === "remove" ){
		let list = [...state.list];

		list = list.filter((item)=>item.id!== data.id );

		return{
			...state,
			list:list,
		}
	};

	if( type === "resizeText" ){

		let widthRow = data.widthRow.current.offsetWidth;
		let userText = state.userText;
		let mailText = state.mailText;

		if( widthRow < 1081 ){
			userText = "text-user";
			mailText = "text-mail";
		}else{
			userText = "";
			mailText = "";
		}
		console.log("resizeText" ,widthRow);

		return{
			...state,
			userText: userText,
			mailText: mailText
		}
	}

	return state;
};


export const Chart = () => {

	const [ state, dispatch ] = useReducer( ChartReducer, {
		search: {
			query: "",
			sort: "desc",
			sortKey: "tokens",
			page: 1,
			limit: 1,
			index:""
		},
		list: [],
		tableHeader:[
			{title:"Пользователь", icon:"/assets/images/find-user.svg", key:"Пользователь" },
			{title: "Email", icon:"/assets/images/mail.svg",  key:"Email"},
			{title: "Роль",  icon:"/assets/images/user-1.svg", key:"Роль"},
			{title: "Подписка", icon:"/assets/images/dollar.svg", key:"Подписка", sub:true},
			{title: "Токены", icon:"", key:"Токены", sort: true },
			{title: "Действия",  icon:"/assets/images/actions.svg", key:"Действия"}
		],

		selected: {
			id: "",
			data: {},
		},

		select:"",
		pickSort:false,
		resizeText:"",
		userText:"",
		mailText:""
	});

	const widthRow = useRef("");


	const getList = ( query, sortKey, sort, page ) => {

		RequestEmu.list( query, sortKey, sort, page, ( response ) => {

			if( !response.data  )
				return;

			let listing = [];
			console.log( response.data );

			for( let line of response.data ){

				listing.push({
					email: line.email,
					name: line.name,
					role: line.role,
					id: line.id,
					key: line.id,
					subscription: line.subscription,
					tokens: line.tokens
				});
			}

			dispatch([ "list", listing, parseInt( response.pages ) || 1 ]);
		});

	};

	useEffect(() => {
		getList( state.search.query, state.search.sortKey, state.search.sort, state.search.page );
	}, [ state.search.query, state.search.sortKey, state.search.sort, state.search.page ]);

	const resizeWindow = () => {
		dispatch([ "resizeText",{ widthRow: widthRow }]);
	};

	useEffect(() => {
		window.addEventListener( "resize", resizeWindow );
		return () => {
			window.removeEventListener( "resize", resizeWindow );
		}
	},[ widthRow ]);

	let getPages = useMemo(() => {
		let list = [];

		for( let index = 0; index < state.search.limit; index++ ){

				list.push(
					<span className={"pages-wrap-item " + ( state.search.page === index+1   ? "pages-select": "" )} key={ index }  onClick={() => {dispatch([ "page", index+1 ]);}}>
						{ index + 1  }
					</span>
				);
		};
		return list;
	}, [ state.search ]);



	return(
		<article className={"content"}>

			<section className={"content-title"}>
				<div className={"content-title-text"}>Поиск пользователя</div>

				<div className={"input"}>
					<p className={"input-icon"}>{}</p>
					<input className={"input-folder"} placeholder={"Поиск"} onChange={( e ) => {
						dispatch([ "search", e.target.value ]);
					}}/>
				</div>
			</section>

			<section className={"table"}>
				<div className={"table-header"}>
					{
						state.tableHeader.map(( item ) => {

							return(
								<p className={"table-item"} key={item.key}>
									<span className={"table-item-text"}>{item.title}</span>
									<span className={"table-item-icon " + (item.sort ? "hidden": "" ) + ( item.sub ? "sub-size" : "") }  style={{backgroundImage:"url(" + item.icon +")"  }}>{""}</span>
									{
										item.sort ?
										<span className={"table-item-arrow " + ( !state.pickSort ? "": " desc-sort")} onClick={() => dispatch(["sort",  !state.pickSort]) }>
											{item.arrow}
										</span> : null
									}
								</p>
							)
						})
					}
				</div>

				<div className={"table-list"}>
					{
						state.list.map(( item, index ) => {

						return (
							<div key={ item.key } className={"table-list-row"} ref={widthRow}>

								<div className={"table-list-items"}>
									<div className={"table-list-items-text " +( state.userText )}>{item.name}</div>
									<div className={"table-list-items-text " +( state.mailText )}>{item.email}</div>
									<div className={"table-list-items-text"}>{item.role}</div>
									<div className={"table-list-items-text"}>{item.subscription}</div>
									<div className={"table-list-items-text"}>{item.tokens}</div>
								</div>

								<p className={"table-list-btns" }>
									<span className={"table-list-btns-edit"} onClick={() => {dispatch([ "select",{id:item.id}]);} }>{}</span>
									<span className={"table-list-btns-trash"} onClick={()=>{ dispatch(["remove",{id:item.id}])}}>{}</span>
								</p>
							</div>)
					})}
				</div>
			</section>

			<div  className={"pages"}>
				<p className={"pages-wrap"}>{ getPages }</p>
			</div>

			<SidebarChart id={ state.selected.id } data={ state.selected.data } mail={ state.selected.data.email }/>
		</article>
	)
};