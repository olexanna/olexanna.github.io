import React, { useState, useEffect, useReducer, useRef, useMemo } from 'react';
import "@components/canvas.scss"

export const GraphCanvas = ( props ) => {
	let { width, height, array } = props;
	let canvasRef = useRef( null );
	let [ hovered, setHovered ] = useState({ coords: null, data: null });

	if( !array )
		array = [];

	//#Visual Setting
	const padding = [ 68, 20, 20, 20 ];
	const textPaddingLeft = 20;
	const strokeColor = "rgb(28 96 232)";
	const fillColor = "rgb(27 91 218 / 44%)";
	const textStyle = "14px serif";
	const textColor = "rgb(28 96 232)";
	const lineColor = "rgb(28 96 232 / 30%)";
	const paddingOffset = [
		width - (padding[ 0 ] + padding[ 2 ]),
		height - (padding[ 1 ] + padding[ 3 ])
	];
	//^

	const computedLines = useMemo(() => {

		if( !canvasRef.current )
			return { coords: [], data: [] };

		let canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");
		let maxWidth = 0;
		let minWidth = 9999999999;
		let maxHeight = 0;
		let deltaWidth = 1;
		let computedCoords = [];
		let computedData = [];

		const line = ( a ) => { return ctx.lineTo( a[ 0 ], a[ 1 ] ) };
		const move = ( a ) => { return ctx.moveTo( a[ 0 ], a[ 1 ] ) };
		const calc = ( x, y ) => {
			return [ ((x - minWidth) / deltaWidth) * ctx.canvas.width, (1.0 - (y / maxHeight)) * ctx.canvas.height ];
		};
		const calcOffset = ( x, y ) => {
			return [
				(((x - minWidth) / deltaWidth) * paddingOffset[ 0 ]) + padding[ 0 ],
				((1.0 - ((y) / maxHeight)) * paddingOffset[ 1 ]) + (padding[ 1 ])
			];
		};

		let data = [];

		for( let item of array ){
			data.push([ +(new Date( item.date )), item.amount, item ]);
		};

		data.sort(( a, b ) => a[ 0 ] - b[ 0 ] );

		for( let item of data ){

			if( item[ 1 ] > maxHeight )
				maxHeight = item[ 1 ];

		};

		maxWidth = (data.length ? data[ data.length - 1 ][ 0 ] : 0);
		minWidth = (data.length ? data[ 0 ][ 0 ] : 0);
		deltaWidth = maxWidth - minWidth;
		//maxHeight *= 1.3;

		//#Fill background
		ctx.beginPath();
		ctx.fillStyle = fillColor;

		if( data.length ){
			move( calcOffset( minWidth, 0 ) );
		};

		for( const item of data ){
			line( calcOffset( item[ 0 ], item[ 1 ] ) );
			computedCoords.push( calcOffset( item[ 0 ], item[ 1 ] ) );
			computedData.push( item[ 2 ] );
		};

		line( calcOffset( maxWidth, 0 ) );

		ctx.fill();
		ctx.closePath();
		//^
		//#Border-line background
		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.strokeStyle = strokeColor;

		for( const item of data ){
			line( calcOffset( item[ 0 ], item[ 1 ] ) );
		};

		ctx.stroke();
		ctx.closePath();
		//^

		//let lines = [13000,11000,9000,7000,5000,0];
		let lines = [];
		let lineValue = 0;
		let lineDeltaValue = (maxHeight / 6.0) - ((maxHeight / 6.0) % 100);

		for( let n = 0; n < 7; n++ ){
			lines.push( lineValue );
			lineValue += lineDeltaValue;
		};

		for( const item of lines ){
			ctx.beginPath();
			move(calcOffset( 0, 0 ));

			//Text
			const c = calcOffset( minWidth, item );
			ctx.font = textStyle;
			ctx.strokeStyle = textColor;
			ctx.strokeText( item.toString(), c[ 0 ] - (padding[ 0 ] - textPaddingLeft), c[ 1 ] );
			//
			//Line
			ctx.strokeStyle = lineColor;
			line(calcOffset( minWidth, item ));
			line(calcOffset( maxWidth, item ));
			//

			ctx.stroke();
			ctx.closePath();
		};

		return { coords: computedCoords, data: computedData };
	}, [ array, width, height ]);

	return (
		<div className={ "canvas" }>
			<canvas width={ width } height={ height } ref={ canvasRef } onMouseMove={( e ) => {
				let rect = e.target.getBoundingClientRect();
				let x = (e.clientX - rect.left);
				let y = (e.clientY - rect.top);
				let maxX = paddingOffset[ 0 ];
				let maxY = paddingOffset[ 1 ];

				let needle = null;
				let coords = null;
				let index = -1;

				for( const item of computedLines.coords ){
					index++;

					if( x > item[ 0 ] )
						continue;

					needle = computedLines.data[ index ];
					coords = item;
					break;
				};

				if( x < padding[ 0 ] ){
					needle = null;
					coords = null;
				};

				setHovered({ coords: coords, data: needle });

			}}>{}</canvas>
			<div className={ "canvas-point" + (hovered.data ? "" : " hidden") } style={{
				left: (hovered.coords ? hovered.coords[ 0 ] : 0) + "px",
				top: (hovered.coords ? hovered.coords[ 1 ] : 0) + "px",
			}}>
				<div className={ "canvas-point-dot" }>{}</div>
				<div className={ "canvas-point-tooltip" }>{
					(hovered.data ? (
						<div>{ hovered.data.amount }</div>
					) : null)
				}</div>
			</div>
		</div>
	);
};