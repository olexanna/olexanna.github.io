import React, { useEffect, useMemo, useState, useReducer} from "react";
import "../eventTarget/styles/event.scss"


const EventTargetReducer = ( state, [ type, data ] ) => {


	if( type === "changeHeaderValue" ){
		let header = [...state.header];

		header[data.index].value= data.value;
		console.log(header[data.index].value, "changeHeaderValue");

		return {
			...state,
			header:header
		}
	}

	if( type === "changeValue" ){
		let list = [...state.list];

		list[ state.selectedIndex ][ data.key ] = data.value;

		return {
			...state,
			list: list
		}
	}

	if( type === "display" ){
		return {
			...state,
			display: data.display,
			selectedIndex: -1
		}
	}

	if( type === "checkBox" ){

		let list = [ ...state.list ];

		list[ data.index ].mark = data.value;
		console.log(data.value, "checkBox" );

		return {
			...state,
			list: list
		}
	}

	if( type === "remove" ){
		let list = [ ...state.list ];

		list = list.filter(( line ) => data.id !== line.id );

		return {
			...state,
			list: list
		}
	};

	if( type === "add" ){

		let list = [ ...state.list ];

		list.push({
			...data,
			id: Math.floor( Math.random() *  100000.0 )
		});

		return {
			...state,
			list: list,
			display: false
		}
	};

	if( type === "edit" ){
		return {
			...state,
			selectedIndex: data.index,
			display: true
		}
	};

	return state;
};



export const EventTarget = ( props) => {

	const [ state, dispatch ] = useReducer( EventTargetReducer, {
		header: [
			{ id:"0", title:"id", type:"hidden", key: "id" },
			{ id:"1", title:"user", value: "", key: "user" },
			{ id:"2", title:"email", value: "", key: "email" },
			{ id:"3", title:"password", value: "", key: "password" }
		],
		list: [],
		display: false,
		selectedIndex: -1
	});

	return (
		<div className={"data"}>

			<p  className={"data-btn"} onClick={()=> dispatch([ "display", { display: true }])}>Push me</p>

			<div className={"data-display " +(state.display ? "flex": "  ")}>
				<div className={"data-inp-block"}>
					<div className={"data-inp"}>
						{
							state.header.map(( header, index ) => {
								if( header.type === "hidden" ){
									return null;
								}else{
									return(
										<input
											key={header.key}
											placeholder={header.key}
											className={"data-inp-item"}
											value={ state.selectedIndex < 0 ? header.value : state.list[ state.selectedIndex ][ header.key ] }
											onChange={(event) =>
												dispatch([
													state.selectedIndex < 0 ? "changeHeaderValue" : "changeValue",
													{ value: event.target.value, key: header.key, index: index }
												])
											}
										/>
									)
								}
							})
						}
					</div>
					<p  className={"data-btn"}
						onClick={() =>
							state.selectedIndex < 0 ?
								dispatch([
								"add", {
									user: state.header[ 1 ].value,
									email: state.header[ 2 ].value,
									password: state.header[ 3 ].value
								}])
								:
								dispatch([ "display", { display: false } ])}>{ state.selectedIndex < 0 ? "Add" : "Change" }
					</p>
				</div>
			</div>

			<div className={"data-fill"}>
				<div className={"data-fill-header"}>
					{
						state.header.map(( header ) => {
							return(
								<p className={"data-fill-header-item"} key={ "header:" + header.key }> {header.title}</p>
							)
						})
					}
				</div>

				{
					state.list.map(( line, index )=>{
						return(
						<div className={"data-row-wrap"} key={ line.id }>
							<p className={"data-row-id"}>{line.id}</p>

							<div className={"data-row-block"} >
								<div className={"data-row"} >
									{
										state.header.map(( header ) => {
											if( header.type === "hidden" ){
												return null;
											}else{
											return(
												<p className={"data-row-item"} key={line.id + ":" + header.key}>
													{	line[ header.key ]  }
												</p>
											)}
										})
									}
								</div>

								<div className={"data-row-block-btns"}>
									<p
									   className={"data-row-block-check " + ( line.mark )  }
										   onClick={()=>dispatch([ "checkBox", {  index: index,  value: line.mark === "data-checked"  ? " " :  "data-checked"} ]) }
									>{}</p>

									<p
										className={"data-row-block-edit" }
										onClick={() => dispatch([ "edit", { index: index } ]) }
									>{"edit"}</p>

									<p
										className={"data-row-block-edit" }
										onClick={()=>dispatch([ "remove", { id: line.id } ]) }
									>{"remove"}</p>
								</div>
							</div>
						</div>)})
				}
			</div>
		</div>
	);
};