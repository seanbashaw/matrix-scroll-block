<?php 
$matrixid = md5(time());
?>
<!-- Adding matrix scripts here since importing js needs to be troubleshooted-->
<p <?php echo get_block_wrapper_attributes().' id="'.$matrixid.'"'; ?> >
	<?php esc_html_e( 'Hello welcome to the matrix.', 'matrix-scroll-block' ); ?>
</p>

<script type="text/javascript">
window.onload =function() {
let matrixID = <?php echo '"'.$matrixid.'"'?>;
let matrix = document.getElementById(matrixID);
//matrix.innerText = "";

}
</script>

