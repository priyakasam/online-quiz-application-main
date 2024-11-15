const logout=()=>{

    const link=document.createElement("a");
    link.href="index.html";
    link.innerText="LogOut";
    link.style.padding="3px";
    link.style.borderRadius="5px";
    link.style.border="1px solid white";
    link.style.color="black";
    link.style.textDecoration="none";
    link.style.margin="10px";

    const ast=document.querySelector(".btn");
        if(document.querySelector(".btn2").nextSibling===null){
        ast.appendChild(link);
        }else{
            
            document.querySelector(".btn2").nextSibling.remove();
        }
    
}