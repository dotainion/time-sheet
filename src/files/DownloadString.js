export const download = (filename, textInput) =>{
    var element = document.createElement("a");
    const dateType = "data:text/plain;charset=utf-8, ";
    element.setAttribute("href", dateType + encodeURIComponent(textInput));
    element.setAttribute("download", filename);
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}