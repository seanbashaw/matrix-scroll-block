<?php
// This file is generated. Do not modify it manually.
return array(
	'matrix-scroll-block' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/matrix-scroll-block',
		'version' => '0.1.0',
		'title' => 'Matrix Scroll Block',
		'category' => 'widgets',
		'description' => 'Creates a cool scrolling effect with text/links.',
		'example' => array(
			
		),
		'supports' => array(
			'interactivity' => true,
			'color' => array(
				'background' => false,
				'text' => true
			),
			'html' => false,
			'typography' => array(
				'fontSize' => true
			)
		),
		'textdomain' => 'matrix-scroll-block',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'render' => 'file:./render.php',
		'viewScript' => 'file:./js/view.js'
	)
);
