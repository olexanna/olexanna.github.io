import React, { useEffect,useReducer, useContext, createContext } from "react";
import "@components/Gallery/styles/gallery.scss"
import {DotContext } from "@components/Gallery/gallery";


export const Dot = ( props )=> {

	let { dotDispatch }  = useContext(DotContext);
	let onClick = props.onClick|| (()=>{});

	return(
		<section className={"dot-wrap-test"}>
			<div  className={"dot"}>
				{
					props.list.map((item, index)=>{
						return(
							<p className={"dot-item" + (props.indexItem === index? " active":" " )  }     onClick={() => dotDispatch(["dotClick", {index:index}])} key={item.key}>
								{props.item}
							</p>
						)
					})
				}
				<p className={"gallery-stop"} onClick={onClick}>
					{"Stop"}
				</p>
			</div>
		</section>
	)
};