"use strict";

class TableTemplate {
  static fillIn(id, dict, columnName = undefined) {
    const table = document.getElementById(id);
    const rows = table.rows; 
    const header = rows[0]; 
    const headerProcessor = new TemplateProcessor(header.innerHTML); 
    header.innerHTML = headerProcessor.fillIn(dict); 
    let index;

    
    for (let i = 0; i < header.cells.length; i++) {
      const headerText = header.cells[i].innerHTML;
      if (headerText === columnName) {
        index = i;
      }
    }

    let elem;
    for (let i = 1; i < rows.length; i++) {  
        
        
        elem = columnName ? rows[i].cells[index] : rows[i];

        const cellProcesor = new TemplateProcessor(elem.innerHTML); 
        elem.innerHTML = cellProcesor.fillIn(dict); 
    }

    
    table.style.visibility = "visible";
  }
}