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
import {Button,PanelBody, TextControl,RangeControl, ToggleControl, __experimentalInputControl as InputControl} from '@wordpress/components';


/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit *
 * @return {Element} Element to render.
 */
const trashicon = <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
</svg>;

export default function Edit({clientId,attributes, setAttributes}){
	const {matrixID, matrixText = [], matrixSpeed,startDelay,betweenDelay,onView} = attributes;
	const matrixP = useRef(null);
	const typerTimer = useRef(null);
	const observer = useRef(null);
	const blockProps = useBlockProps({
	 id: matrixID,
	'data-matrix': JSON.stringify(matrixText),
	'data-speed': matrixSpeed,
	'data-onview': onView,
	'data-startDelay': startDelay,
	'data-betweenDelay': betweenDelay
	});
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
                        let v = (1000/matrixSpeed);
                        typerTimer.current = setTimeout(()=>{
                                matrixType(letter,line);
                        },v);
                }else{
                        typerTimer.current = setTimeout(()=>{
                                line++;
                        matrixType(0,line);
                        },betweenDelay*1000);
                }
        }
       

	useEffect( () => {
		observer.current = new IntersectionObserver((entries)=>{
			for (const entry of entries){
				if (entry.isIntersecting && onView){
					typerTimer.current = setTimeout( () => {
						matrixType(0,0);
					},startDelay*1000);
					observer.current.unobserve(entry.target);
				}
			}
		});
	}, []);
	useEffect( () => {	
		if (!attributes.matrixID){
		setAttributes({matrixID:"block-"+clientId});
		}
		if (onView){
			observer.current.observe(matrixP.current);
		}else{
		typerTimer.current = setTimeout( () => {
        		matrixType(0,0);
		}, startDelay*1000);
		}
		return ()=>{
		clearTimeout(typerTimer.current);
		}
	},[matrixText,matrixSpeed,onView,startDelay,betweenDelay]);
	return (
	<>
		<InspectorControls>
			<PanelBody title={__('Typing Settings','matrix-scroll-block')}>
		<RangeControl
			__next40pxDefaultSize
			label="Characters Per Second"
			value={matrixSpeed}
			onChange={(val)=>setAttributes({matrixSpeed:val})}
			min={1}
			max={20}
			/>
		<RangeControl
			__next40pcDefaultSize
			label="Start delay"
			value={startDelay}
			min={0.0}
			onChange={(val)=>setAttributes({startDelay:val})}
			max={10.0}
			/>
		<RangeControl
			__next40pxDefaultSize
			label="Between delay"
			value={betweenDelay}
			onChange={(val)=>setAttributes({betweenDelay:val})}
			min={0.0}
			max={10.0}
		/>

		<ToggleControl
			label="Start typing when in view"
			help = {
				onView ? 'Will start typing when user can see.' : 'Will start typing on page load.' }
			checked = {onView}
			onChange = {(val) => setAttributes({onView:val})
			
			}
		/>
		</PanelBody>

			<PanelBody title={__('Matrix Text','matrix-scroll-block')}>
			{Object.entries(matrixText).map(([key,value])=>
				
				<InputControl 
		__nextHasNoMarginBottom
		__next40pxDefaultSize
		key={key}
		value={value || ''}
		suffix={<Button
			onClick = {()=>{
				setAttributes({matrixText:matrixText.toSpliced(key,1)})}}
			>{trashicon}</Button>}
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
		<p { ...blockProps} style={{"min-height":"1.5em"}}>
			<span ref={matrixP}/>
		</p>
		</>
	);
}

