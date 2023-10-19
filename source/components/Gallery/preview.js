import React, { useEffect, useReducer, useContext, createContext, useRef } from "react";
import "@components/Gallery/styles/gallery.scss"
import {DotContext } from "@components/Gallery/gallery";





export const Preview = ( props )=> {

	let { dotIndex,dotDispatch}  = useContext(DotContext);
	let slider = useRef( null );
	let sliderWrap = useRef( null );


	return(
		<section className={"dot-wrap-test"} >
			<div  className={"dot-preview"} >
				<p  className={"dot-preview-left"} onClick={() => dotDispatch(["left"])}>{"<"}</p>

				<div className={"dot-preview-wrap"} ref={sliderWrap}>
				<div  className={"dot-preview-list"} style={{marginLeft: -(dotIndex) + "px"}} ref={slider}>
				{
					props.list.map((item, index)=>{
						return(
							<p  className={"dot-preview-list-item" + (props.indexItem === index? "  ":" ") }
									style={{ backgroundImage:"url(../assets/images/space-" + index + ".jpg"+ ")"}}
									key={item.key}
									onClick={() => dotDispatch(["dotClick", {index:index}])}
							>
							{props.dot}
							</p>
						)
					})
				}
				</div>
				</div>

				<p  className={"dot-preview-right"} onClick={() => dotDispatch(["right",{slider:slider, sliderWrap:sliderWrap}])}>{">"}</p>
			</div>
		</section>
	)
};
