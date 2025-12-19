<?php
$matrixid = md5(json_encode($attributes['matrixText']));
echo json_encode($attributes['matrixText']);
if (!empty($attributes['matrixText'])){
	$matrixText= $attributes['matrixText'];
}else{
	$matrixText=array("0"=>"ERROR");
}
?>
<p <?php echo get_block_wrapper_attributes() . ' id="'.$matrixid.'"'; ?> >
	
</p>
<script type="text/javascript">
	matrixID = <?php echo '"'.$matrixid.'"'?>;
	setTimeout( (mID) => {
	matrixType(document.getElementById(mID),<?php echo json_encode($matrixText) ?>,0,0);
	}, 1000,matrixID);

function matrixType(matrixP,matrixText,letter,line){
	console.log(matrixText);
	if (Object.keys(matrixText).length<=line){
        	return;
	}
        if (letter==0){
        	matrixP.innerHTML="";
        }else{
        	matrixP.innerText=matrixText[line].slice(0,letter);
        }
	letter++;
   	if (matrixText[line].length>=letter){
        	setTimeout(()=>{
                	matrixType(matrixP,matrixText,letter,line);
         	}, 100);
        }else{
        	setTimeout(()=>{
                	line++;
                	matrixType(matrixP,matrixText,0,line);
           	},1000);
        }
}    
</script>
<!-- Adding matrix scripts here since importing js needs to be troubleshooted-->

