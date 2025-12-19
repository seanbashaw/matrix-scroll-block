import {useRef,useEffect} from 'react';
import {RawHTML} from '@wordpress/element';
import {useBlockProps} from '@wordpress/block-editor';
export default function Save({attributes}){
	const {matrixText = [],matrixID} = attributes;
	const blockProps = useBlockProps.save({
		id: matrixID,
		'data-matrix': JSON.stringify(matrixText)
	});
	return <p {...blockProps}>
		</p>;
};
