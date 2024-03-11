'use strict';
function TemplateProcessor(template) {
  this.template = template;
}
TemplateProcessor.prototype.fillIn = function (dict) {
  let filledTemplate = this.template;
  const regex = /{{[^{]*}}/g;               
  const match = this.template.match(regex); 

  match.forEach((placeholder) => {
    const property = placeholder.replace("{{", "").replace("}}", ""); 

    if (dict[property]) {
       
      filledTemplate = filledTemplate.replace(placeholder, dict[property]); 
    } else {
    
      filledTemplate = filledTemplate.replace(placeholder, ""); 
    }
});
  return filledTemplate;
};