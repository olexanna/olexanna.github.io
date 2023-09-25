import React, { useEffect, useMemo, useState,useReducer, useRef } from "react";
import "@components/Calc2/styles/calc2.scss"

let calcOperators = {
	"-":()=>{},
	"+":()=>{},
	"*":()=>{},
	"/":()=>{},
	"%":()=>{},
	".":()=>{},
};


let calcResult =(args)=>{
	let comp = [];
	let string = "";

	for( let index in args ){

		if( calcOperators[args[index]] ){

			if(string)
				comp.push(parseFloat(string));
				comp.push(args[index]);

			string = "";
			continue;
		}
		string += args[index];
	};

	if(string)
		comp.push( parseFloat(string) );

	return comp;
};


const Calc2Reducer=( state, [ type, data ] )=>{

	if( type === "val" ){
		let args = calcResult( state.args );
		let result = [];
		let memory = [...state.memory];

		if( data.key == "equally" ){
			let string = args.join("");
			let calc = null;

			try{
				calc = eval(string);
			}catch( e ){
				calc = null;
			}

			result = calc ? [calc] : [];
			parseFloat(result);

			memory.push({ args: args, result: result, key: +new Date() });
		}
		else if( data.key == "delete" ){
			result = [];
			args = [];
		}
		else if( data.key == "erase" ){

			if( args.length ){
				let lastValue = args[ args.length - 1 ];

				if( calcOperators[ lastValue ] ){
					args.pop();
				}else{
					lastValue = lastValue.toString();
					lastValue = lastValue.slice( 0, -1 );
					args[ args.length - 1 ] = lastValue;
				}
			}
		}
		else if( data.key == "sqrt" ){

			if( args.length ){
				args[ args.length - 1 ] = Math.sqrt( args[ args.length - 1 ] );
			}
		}
		else if( data.key == "extent" ){

			if( args.length ){
				args[ args.length - 1 ] *= args[ args.length - 1 ];
			}
		}
		else if( data.key == "percent" ){

			if( args.length ){
				args[ args.length - 1 ] /=100;
			}
		}
		else if( data.value ){
			args.push( data.value );
		}

		args = calcResult( args );

		return{
			...state,
			args:args,
			memory:memory,
			result:result
		}
	}

	if( type === "swipe" ){

		return{
			...state,
			swipe:data,
			marginLeft: data ? 25 : 0
		}
	}

	if( type === "memory" ){
		let args = [ ...data.args ];

		return{
			...state,
			args: args,
			swipeHistory: false
		}
	}

	if( type === "swipeHistory" ){

		return{
			...state,
			swipeHistory: data
		}
	}

	if( type === "historySelected" ){

		return{
			...state,
			historySelected: data.key
		}
	}

	if( type === "clear" ){
		let memory = [];

		console.log("clear");

		return{
			...state,
			memory: memory
		}
	}
};


const Calc2Nums = [
	{ value:"9", key:"nine" },
	{ value:"8", key:"eight" },
	{ value:"7", key:"seven" },
	{ value:"6", key:"six" },
	{ value:"5", key:"five" },
	{ value:"4", key:"four" },
	{ value:"3", key:"three" },
	{ value:"2", key:"two" },
	{ value:"1", key:"one" },
	{ value:"." , key: "point"} ,
	{ value:"%", key: "percent"},
	{ value:"0", key:"zero" },
];
const Calc2Operators = [
	{ value:"-" , key:"minus", title:<span>&#8722;</span>, operator: true },
	{ value:"+", key:"plus",title:<span>&#43;</span> , operator: true  },
	{ value:"/", key:"split", title:<span> &divide;</span>,  operator: true },
	{ value: "*", key:"multiply", title: <span>&#215;</span>, operator: true },
	{ value: "=" , key:"equally", title:"=", total: true },
	{ value: "", key:"delete", title: "AC", low: true },
	{ value: "", key:"erase", title: <span>&#8592;</span>,low: true },
	{ value: "", key: "sqrt", title: <span>&#8730;<sup>2</sup></span>, low: true },
	{ value: "", key: "extent", title: <span> x<sup>2</sup> </span>, low: true },
];


export const Calc2 = ( props ) => {

	const [ state, dispatch ] = useReducer( Calc2Reducer, {
		args:[],
		result:[],
		memory:[],
		swipe: false,
		marginLeft: 0,
		swipeHistory:false,
		historySelected:"",
		lightTheme: false
	});

	return(
			<article className={"calc2 " + (state.swipe ? "calc2-light" : " ")}>

				<div className={"calc2-memory "  + (state.swipeHistory ? "calc2-memory-height" : " ") + (!state.swipeHistory ? " " : " ") + (state.swipe ? " calc2-memory-light" :"'") }>
					<p className={"calc2-memory-clear"  }  onClick={()=>dispatch([ "clear"])}>
						<svg fill="none" height="141" viewBox="0 0 120 141" width="120" xmlns="http://www.w3.org/2000/svg" className={ (state.swipeHistory  ? " calc2-theme-fill-light": "" )}>
							<g clipPath="url(#clip0)">
								<path d="M11.5444 32.2823C9.35715 31.9305 7.54822 31.7222 5.77811 31.3361C2.60909 30.6453 0.988478 29.1086 0.949674 26.938C0.909576 24.6587 2.59479 22.7092 5.87569 22.292C10.5613 21.6963 15.3053 21.5295 20.0298
								 21.2921C22.5844 21.1628 25.1505 21.2695 28.108 21.2695C27.6792 19.2916 27.3722 17.7509 27.0087 16.2245C26.2429 13.1665 26.65 9.93253 28.1496 7.15974C30.1545 3.31135 33.2097 0.966791 37.5694 0.821263C45.5316 0.555646
								  53.4969 0.406041 61.4656 0.372408C66.7407 0.347184 72.0174 0.592906 77.2929 0.718385C78.0463 0.736495 78.8024 0.733267 79.5532 0.788891C84.9341 1.18602 88.3773 3.94844 89.6146 9.22106C90.1746 11.6084 90.2464 14.1134
								   90.4974 16.5699C90.6267 17.8376 90.6642 19.1143 90.7561 20.58C91.624 20.7109 92.499 20.7908 93.3766 20.8193C99.1889 20.655 104.999 20.4131 110.812 20.2863C112.309 20.2218 113.808 20.3725 115.263 20.734C116.431 21.0072 117.48
								    21.649 118.255 22.5645C119.03 23.48 119.49 24.6206 119.566 25.8177C119.767 27.0519 119.583 28.318 119.038 29.4433C118.493 30.5687 117.614 31.4986 116.521 32.1065C115.619 32.6562 114.629 33.0624 113.507 33.6199C113.507 36.7542
								     113.4 39.8628 113.525 42.9615C114.262 61.3478 115.277 79.7315 114.594 98.1391C114.347 104.796 113.896 111.473 112.986 118.065C112.481 121.727 111.005 125.296 109.663 128.789C109.028 130.464 108.025 131.975 106.727 133.211C105.431 134.447
								     103.872 135.375 102.168 135.928C99.0207 137.007 95.789 137.824 92.5068 138.369C89.515 138.752 86.5044 138.965 83.4893 139.006C71.7672 139.589 60.0488 140.279 48.3201 140.659C43.3757 140.869 38.4223 140.655 33.5143 140.02C20.8881
								      138.243 14.0254 131.285 12.027 118.648C11.4349 115.148 11.1056 111.607 11.042 108.058C10.9084 87.7206 10.86 67.383 10.8971 47.0453C10.9036 42.2177 11.309 37.3887 11.5444 32.2823ZM21.2127 33.0682C21.7948 43.107 22.226 92.2559 23.3888
								       107.055C23.7316 111.419 24.7367 115.741 25.5968 120.052C26.4544 124.348 29.3576 126.846 33.5194 127.519C38.1759 128.271 42.9121 128.996 47.6074 128.961C59.3399 128.874 71.0738 128.47 82.7966 127.939C87.285 127.736 91.7507
								        126.893 96.212 126.238C97.0249 126.136 97.7855 125.78 98.3837 125.22C98.9826 124.66 99.3887 123.925 99.5452 123.121C100.163 120.625 100.962 118.14 101.257 115.602C102.95 101.021 102.602 86.3863 102.154 71.7566C101.802
								         60.2522 101.392 48.7496 101.003 37.2464C100.967 36.2116 100.896 35.1728 100.848 34.268C73.4015 33.8676 48.8905 33.4724 21.2146 33.0682H21.2127ZM38.4805 21.0379C52.0096 21.5275 65.2704 21.5062 78.6168 20.8833V11.9383C65.1229
								          11.4855 51.879 10.9991 38.4805 12.3115V21.0379Z" fill=""/>
								          <path d="M82.2128 77.7577C82.0718 70.8105 81.7413 63.7697 81.4212 56.9597L81.4147 56.8303C81.2996 54.3613 81.1871 51.8924 81.0758 49.4233C81.0267 48.5606 80.8643
								           47.7079 80.594 46.8872C80.0009 45.0115 78.6628 44.0226 76.9309 44.1862C75.8819 44.2729 74.0749 44.8129 73.7534 47.4479C73.7017 47.922 73.6758 48.3986 73.6758 48.8754C73.5724 57.4389 72.7905 85.75 72.7827 86.0385C72.6365
								            92.8447 72.4852 99.8798 72.3817 106.859C72.328 108.781 72.5014 110.703 72.8991 112.583C73.0912 113.579 73.6286 114.476 74.4164 115.115C75.2047 115.754 76.1929 116.094 77.207 116.076C77.326 116.076 77.4463 116.072 77.5673 116.063C78.5691 116.035 79.5282 115.652 80.2739 114.982C81.0189 114.312 81.502 113.4 81.6365 112.406C81.9916 110.339 82.1863 108.247 82.2186 106.15L82.2535 101.336C82.3105 93.6124 82.3725 85.6265 82.2128 77.7577Z" fill=""/>
								            <path d="M47.601 44.6397H47.5978C46.9525 44.6372 46.3163 44.7915 45.7438 45.0896C45.1714 45.3876 44.6799 45.8204 44.3118 46.3504C43.6882 47.4661 43.3364 48.7129 43.2848 49.9899C43.1749 51.7201 43.0595 53.4495 42.9418 55.2211C42.5376 61.3145 42.1187 67.6158 41.9389 73.8347C41.6802 82.6789 41.5929 91.666 41.5056 100.358C41.4794 103.018 41.4512 105.678 41.421 108.338C41.4195 109.427 41.5717 110.511 41.8736 111.557C42.5791 114.058 44.2769 115.611 46.3038 115.611H46.3685C48.4918 115.575 50.1886 113.898 50.6898 111.339C50.9369 109.985 51.0414 108.609 51.0012 107.234C50.8886 100.171 50.7506 93.1097 50.62 86.4012L50.5016 80.3356L50.6371 73.1316C50.7845 65.3281 50.9234 57.9518 51.0353 50.539C51.1016 49.296 50.9176 48.0524 50.494 46.882C50.2342 46.2985 49.8341 45.7884 49.3294 45.3972C48.8246 45.0059 48.2308 44.7458 47.601 44.6397Z" fill=""/></g><defs><clipPath id="clip0"><rect fill="" height="141" transform="translate(0.777344)" width="119"/></clipPath></defs></svg>
					</p>

					<p  className={"calc2-memory-block"}>
					{
						state.memory.map((item, index)=>{
							return(
								<span
								  className={"calc2-memory-block-item "+
								  	( state.swipe ? item.key === state.historySelected ? "calc2-block-light-select ": " " : item.key === state.historySelected ? " calc2-memory-item-select": " " ) +
									( state.swipe ? " calc2-memory-block-light" : " ")}
								  key={item.key}
								  onClick={()=>dispatch([ "memory", item])}
								  onMouseUp={()=>dispatch([ "historySelected", { key: item.key}])}
								>
									{ item.args.join( "" ) + "=" + item.result }
								</span>
							)
						})
					}
					</p>
				</div>

				<div className={"calc2-theme-wrap " }>
					<p className={"calc2-theme-memory"}  onClick={() => dispatch([ "swipeHistory", !state.swipeHistory ]) }>
						<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className={(state.swipeHistory  ? " calc2-theme-fill-light": "" )}>
							<path d="M12.25 2a9.81 9.81 0 0 0-7.48 3.46L3.41 4.25a1 1 0 0 0-1.07-.16 1 1 0 0 0-.59.91v4a1 1 0 0 0 1 1h4.5a1 1 0 0 0 .93-.64 1 1 0 0 0-.27-1.11L6.26 6.78a7.86 7.86 0 0 1 6-2.78 8 8 0 1 1-7.54 10.67 1 1 0 0 0-1.89.66A10 10 0 1 0 12.25 2Z"
								  fill="">
							</path>
							<path d="M16 16a1 1 0 0 1-.6-.2l-4-3a1 1 0 0 1-.4-.8V8a1 1 0 0 1 2 0v3.5l3.6 2.7a1 1 0 0 1 .2 1.4 1 1 0 0 1-.8.4Z" fill="" >{}</path>
						</svg>
					</p>

					<div className={"calc2-theme-block"}>
						<p className={"calc2-theme " +(state.swipe ? "calc2-theme-light": " ")} onClick={()=> dispatch([ "swipe", !state.swipe])}>
							<span className={"calc2-theme-swipe " +(state.swipe ? "calc2-theme-swipe-light": " ")} style={{marginLeft: state.marginLeft + "px"}}>{}</span>

							<span className={"calc2-theme-moon "}>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
									<path d="M343.1 315c-1.8.1-3.5.1-5.3.1-29.1 0-56.5-11.3-77.1-31.9-20.6-20.6-31.9-48-31.9-77.1 0-16.6 3.7-32.6 10.6-47.1 3.1-6.4 6.8-12.5 11.1-18.2-7.6.8-14.9 2.4-22 4.6-46.8 14.8-80.7 58.5-80.7 110.2 0 63.8 51.7 115.5 115.5 115.5 35.3 0 66.8-15.8 88-40.7 4.8-5.7 9.2-11.9 12.8-18.5-6.8 1.7-13.8 2.8-21 3.1z" fill="#55408d" className="fill-000000"></path>
								</svg>
							</span>

							<span className={"calc2-theme-sun "+(state.swipe ? "calc2-theme-sun-light": " ")}>
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
									<path d="M256 159.1c-53.02 0-95.1 42.98-95.1 95.1S202.1 351.1 256 351.1s95.1-42.98 95.1-95.1S309 159.1 256 159.1zM509.3 347L446.1 255.1l63.15-91.01c6.332-9.125 1.104-21.74-9.826-23.72l-109-19.7l-19.7-109c-1.975-10.93-14.59-16.16-23.72-9.824L256 65.89L164.1 2.736c-9.125-6.332-21.74-1.107-23.72 9.824L121.6 121.6L12.56 141.3C1.633 143.2-3.596 155.9 2.736 164.1L65.89 256l-63.15 91.01c-6.332 9.125-1.105 21.74 9.824 23.72l109 19.7l19.7 109c1.975 10.93 14.59 16.16 23.72 9.824L256 446.1l91.01 63.15c9.127 6.334 21.75 1.107 23.72-9.822l19.7-109l109-19.7C510.4 368.8 515.6 356.1 509.3 347zM256 383.1c-70.69 0-127.1-57.31-127.1-127.1c0-70.69 57.31-127.1 127.1-127.1s127.1 57.3 127.1 127.1C383.1 326.7 326.7 383.1 256 383.1z" />
								</svg>
							</span>
						</p>
					</div>
				</div>

				<section className={"calc2-inp-wrap " }>
					<div className={"calc2-inp"}>
						<p className={"calc2-inp-val " + (state.swipe ? "calc2-inp-val-light" : " ")}>{state.args.join('')}</p>

						<p className={"calc2-inp-block"}>
							<span className={"calc2-inp-block-equally " + (state.swipe ? "calc2-block-equally-light" : " ")}>{"="}</span>
							<span className={"calc2-inp-block-result " + (state.swipe ? "calc2-inp-result-light" : " ")}>{state.result.join('')}</span>
						</p>
					</div>
				</section>

				<section className={"calc2-result "}>
					<div className={"calc2-result-high "}>
						{
							Calc2Operators.map(( item)=>{
								if( !item.low )return null;

								return(
									<p className={"calc2-result-high-item "+ (state.swipe ? "calc2-item-high-light" : " ")} key={item.key} onClick={() => dispatch([ "val", { value: item.value, key: item.key, title: item.title  } ]) }>
										{ item.title || item.value }
									</p>
								)
							})
						}
					</div>

					<div className={"calc2-result-low"}>
						<div className={"calc2-operator "}>
							{
								Calc2Operators.map(( item)=>{
									if( item.low|| item.total )return null;

									return(
										<p className={"calc2-operator-item " + (state.swipe ? "calc2-operator-item-light" : " ")} key={item.key} onClick={() => dispatch([ "val", { value: item.value, key: item.key,title: item.title } ]) }>
											{ item.title || item.value  }
										</p>
									)
								})
							}
						</div>

						<div className={"calc2-btn"}>
							{
								Calc2Nums.map(( item)=>{
									return(
										<p className={"calc2-btn-item "+ (state.swipe ? "calc2-btn-item-light" : " ")} key={item.key} onClick={() => dispatch([ "val", { value: item.value, key: item.key} ]) }>
											{item.value}
										</p>
									)
								})
							}
						</div>
					</div>

					<div className={"calc2-result-equally "+ (state.swipe ? "calc2-result-equally-light" : " ")}>
						{
							Calc2Operators.map(( item)=>{
								if( item.total )

								return(
									<span className={"calc2-result-equally-item " } key={item.key} onClick={() => dispatch([ "val", { value: item.value, key: item.key, title: item.title } ]) }>
										{ item.title || item.value  }
									</span>
								)
							})
						}
					</div>
				</section>

			</article>
	);
};