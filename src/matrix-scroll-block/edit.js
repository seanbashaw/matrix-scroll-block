/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {InspectorControls, useBlockProps } from '@wordpress/block-editor';
import {useEffect,useRef,useState} from 'react';
import {v4 as uuidv4} from 'uuid';
/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import {Button,PanelBody, TextControl, ToggleControl} from '@wordpress/components';


/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit *
 * @return {Element} Element to render.
 */
export default function Edit({clientId,attributes, setAttributes}){
	const {matrixID="huh", matrixText = []} = attributes;
	const matrixP = useRef(null);
	const blockProps = useBlockProps({
	 id: matrixID,
	'data-matrix': JSON.stringify(matrixText)
	});
	useEffect( () => {
		if (!attributes.matrixID){
		setAttributes({matrixID:"block-"+clientId});
		}
		let typerTimer = "";
		typerTimer = setTimeout( () => {
        		matrixType(0,0);
		}, 1000);
	function matrixType(letter,line) {
		if (Object.keys(matrixText).length<=line){
			return;
		}
		if (letter==0){
			matrixP.current.innerHTML="";
		}else{
			matrixP.current.innerText=matrixText[line].slice(0,letter);
		}
		letter++;
   		if (matrixText[line].length>=letter){
	   		typerTimer = setTimeout(()=>{
				matrixType(letter,line);
	   		},100);
	   	}else{
	   		typerTimer = setTimeout(()=>{
				line++;
	        	matrixType(0,line);
	   		},1000);
	   	}
	}
	return ()=>clearTimeout(typerTimer);
	},[matrixText]);
	return (
	<>
		<InspectorControls>
			<PanelBody title={__('Matrix Text','matrix-scroll-block')}>
			{Object.entries(matrixText).map(([key,value])=>
				
				<TextControl 
		__nextHasNoMarginBottom
		__next40pxDefaultSize
		key={key}
		value={value || ''}
		onChange = {(nvalue)=>{
			let newarray = [...matrixText];
			newarray[key]=nvalue;
			setAttributes({matrixText:newarray});
		}}

		/>
			)}
			<Button
			variant="primary"
			onClick = {()=>{setAttributes({matrixText:[...matrixText,""]});}}
		>
		Add Row
		</Button>
		</PanelBody>
		
		</InspectorControls>
		<p { ...useBlockProps()}>
			<span ref={matrixP}/>
		</p>
		</>
	);
}

