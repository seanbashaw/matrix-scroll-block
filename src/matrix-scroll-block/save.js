import {useRef,useEffect} from 'react';
import {RawHTML} from '@wordpress/element';
import {useBlockProps} from '@wordpress/block-editor';
export default function Save({attributes}){
	const {matrixText = [],matrixID,matrixSpeed,onView,startDelay,betweenDelay} = attributes;
	const blockProps = useBlockProps.save({
		id: matrixID,
		'data-matrix': JSON.stringify(matrixText),
		'data-speed': matrixSpeed,
		'data-onView': onView,
		'data-startDelay': startDelay,
		'data-betweenDelay': betweenDelay
	});
		return <p {...blockProps} style={{"min-height":"1em"}}>
		</p>;
};
