var penColor='black';
var pixel=document.getElementsByClassName("pixel");

/*function setPixelColor(pixel)
{
  pixel.style.backgroundColor=penColor;
}*/

function setPixelColor(pixel){
/*
	if (pixel.style.backgroundColor == '') {pixel.style.backgroundColor=penColor;}
    else if (pixel.style.backgroundColor != penColor) {pixel.style.backgroundColor=penColor;}
	else {pixel.style.backgroundColor='white';}
*/
	if (pixel.style.backgroundColor == '') {pixel.style.backgroundColor=penColor;}
    else if (pixel.style.backgroundColor != penColor) {pixel.style.backgroundColor=penColor;}
	else {pixel.style.backgroundColor='white';}
}

function setPenColor(pen){
  penColor=pen;
}

function setPixelBit(bit){
	bitTrim=bit.split("-");
	cellBit=bitTrim[1];
	pxBit=bitTrim[0];
	
	if (document.getElementById(bit).style.backgroundColor != 'black') {
        console.log(cellBit);
		pxBitAdd(cellBit,pxBit);
		
    } else { pxBitSubtract(cellBit,pxBit);}
}

function mouseOver(cell){
	
}

function mouseLeave(cell){
	
}

function pxBitAdd(cell,bit){
	getCellData(cell,bit);
	pxNewBit=Number(pxOldCell)+Number(pxBit);
	pxCell.innerHTML=Number(pxNewBit);
	console.log("old bit:"+Number(pxOldCell)+"/bit clicked:"+Number(pxBit)+"/new bit:"+Number(pxNewBit));
}

function pxBitSubtract(cell,bit){
	getCellData(cell,bit);
	pxNewBit=Number(pxOldCell)-Number(pxBit);
	if (pxOldCell <= "0"){}
	else { pxCell.innerHTML=Number(pxNewBit);}
	console.log("old bit:"+Number(pxOldCell)+"/bit clicked:"+Number(pxBit)+"/new bit:"+Number(pxNewBit));
}

function getCellData(cell,bit){
	pxOldCell=document.getElementById(cell).textContent;
	pxCell=document.getElementById(cell);
	return pxOldCell;
	return pxCell;	
}

function bitReset(cell){
	pxCell=document.getElementById(cell);
	pxCell.innerHTML="0";
}

function expBinary(){
		var fileName = window.prompt("Please enter file name");
    fileName();
}

$(document).ready(function () {

            console.log("READY")
            function exportTableToCSV($table, filename) {
                var $headers = $table.find('tr:has(th)')
                    ,$rows = $table.find('tr:has(td)')

                    // Temporary delimiter characters unlikely to be typed by keyboard
                    // This is to avoid accidentally splitting the actual contents
                    ,tmpColDelim = String.fromCharCode(11) // vertical tab character
                    ,tmpRowDelim = String.fromCharCode(0) // null character

                    // actual delimiter characters for CSV format
                    ,colDelim = ','
                    ,rowDelim = '\r\n';

                    // Grab text from table into CSV formatted string
                    var csv = '';
                    //csv += formatRows($headers.map(grabRow));
                    //csv += rowDelim;
                    csv += formatRows($rows.map(grabRow)) + '';

                    // Data URI
                    var csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);

                // For IE (tested 10+)
                if (window.navigator.msSaveOrOpenBlob) {
                    var blob = new Blob([decodeURIComponent(encodeURI(csv))], {
                        type: "text/csv;charset=utf-8;"
                    });
                    navigator.msSaveBlob(blob, filename);
                } else {
                    $(this)
                        .attr({
                            'download': filename
                            ,'href': csvData
                            //,'target' : '_blank' //if you want it to open in a new window
                    });
                }

                //------------------------------------------------------------
                // Helper Functions 
                //------------------------------------------------------------
                // Format the output so it has the appropriate delimiters
                function formatRows(rows){
                    return rows.get().join(tmpRowDelim)
                        .split(tmpRowDelim).join(rowDelim)
                        .split(tmpColDelim).join(colDelim);
                }
                // Grab and format a row from the table
                function grabRow(i,row){
                     
                    var $row = $(row);
                    //for some reason $cols = $row.find('td') || $row.find('th') won't work...
                    var $cols = $row.find('td'); 
                    if(!$cols.length) $cols = $row.find('th');  

                    return $cols.map(grabCol)
                                .get().join(tmpColDelim);
                }
                // Grab and format a column from the table 
                function grabCol(j,col){
                    var $col = $(col),
                        $text = $col.text();

                    return $text.replace('"', '""'); // escape double quotes
                }
            }

            // This must be a hyperlink
            $("#export").click(function (event) {
                // var outputFile = 'export'
                var outputFile = window.prompt("What do you want to name your output file (Note: This won't have any effect on Safari)") || 'export';
                outputFile = outputFile.replace('.csv','') + '.txt'
                 
                // CSV
                exportTableToCSV.apply(this, [$('#dvData > table'), outputFile]);
                
                // IF CSV, don't do event.preventDefault() or return false
                // We actually need this to be a typical hyperlink
            });
        });
