export const IsInside = ( elem, owner ) => {

	let parent = elem;

	while( parent && parent.nodeName !== "BODY" ){

		if( parent === owner )
			return true;

		parent = parent.parentElement;
	};

	return false;
};
