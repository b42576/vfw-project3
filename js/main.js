/* 
 * Kevin Fry
 * Full Sail - VFW1309 Project 2
 * Pricebook
 */

window.addEventListener("DOMContentLoaded", function(){
    function $(x){
        var theElement = document.getElementById(x);
        return theElement;
    }
    
    function makeTypes(){
        var formTag = document.getElementsByTagName("form"),
                selectLi = $('sizeTypes'),
                makeSelect = document.createElement('select');
                makeSelect.setAttribute("id", "sizeType");
        for(var i=0, j=sizeTypes.length; i<j; i++){
            var makeOption = document.createElement('option');
            var optText = sizeTypes[i];
            makeOption.setAttribute("value", optText);
            makeOption.innerHTML = optText;
            makeSelect.appendChild(makeOption);
        }
        selectLi.appendChild(makeSelect);
    }
    function makeStores(){
        var formTag = document.getElementsByTagName("form"),
                selectLi = $('locations'),
                makeSelect = document.createElement('select');
                makeSelect.setAttribute("id", "location");
        for(var i=0, j=stores.length; i<j; i++){
            var makeOption = document.createElement('option');
            var optText = stores[i];
            makeOption.setAttribute("value", optText);
            makeOption.innerHTML = optText;
            makeSelect.appendChild(makeOption);
        }
        selectLi.appendChild(makeSelect);
    }
    
    // find value of selected radio buttin
    function getSelectedRadio(){
        var radios = documents.forms[0].tax;
        for(var i=0; i<radios.length; i++){
            if (radios[i].checked){
                taxValue = radios[i].value;
            }
        }
    }
    
    function getData(){
        var makeDiv = document.createElement('div');
        makeDiv.setAttribute("id", "items");
        var makeList = document.createElement('ul');
        makeDiv.appendChild(makeList);
        for(var i = 0, len=localStorage.length; i<len;i++){
            var makeli = document.createElement('li');
        }
    }
    
    function toggleControls(n){
        switch(n){
            case "on":
                $('pricebookForm').style.display = "none";
                $('clear').style.display = "inline";
                $('displayLink').style.display = "none";
                $('addNew').style.display = "inline";
            break;
            case "off":
                $('pricebookForm').style.display = "block";
                $('clear').style.display = "inline";
                $('displayLink').style.display = "inline";
                $('addNew').style.display = "inline";
                $('items').style.display = "none";
            break;
            default: return false;
                
        }
    }
    function storeData(key){
        var id = Math.floor(Math.random()*100000001);
        // get form values // store in objet
        // object properties contain array with the form label and input values
        var item = {};
            item.productBrand       = ["Brand:", $('productBrand').value];
            item.productName        = ["Name:", $('productName').value];
            item.description        = ["Description:", $('productDescription').value];
            item.productRating      = ["Rating:", $('productRating').value];
            item.location           = ["Location:", $('location').value];
            item.price              = ["Price:", $('price').value];
            item.tax                = ["Taxable?", taxValue];
            item.datePurchased      = ["Date:", $('datePurchased').value];
            item.size               = ["Size:", $('size').value];
            item.sizeType           = ["Size Type:", $('sizeType').value];
            localStorage.setItem(id, JSON.stringify(item));
            alert("Item Added");
    }
    
    function getData(){
        toggleControls("on");
        if(localStorage.length === 0){
            alert("There are no items in your pricebook.");
        }
        var makeDiv = document.createElement('div');
        makeDiv.setAttribute("id", "items");
        var makeList = document.createElement('ul');
        makeDiv.appendChild(makeList);
        document.body.appendChild(makeDiv);
        $('items').style.display = "block";
        for(var i=0, len=localStorage.length; i<len;i++){
            var makeli = document.createElement('li');
            var linksLi = document.createElement('li');
            makeList.appendChild(makeli);
            var key = localStorage.key(i);
            var value = localStorage.getItem(key);
            var obj = JSON.parse(value);
            var makeSubList = document.createElement('ul');
            for(var n in obj){
                var makeSubli = document.createElement('li');
                makeSubList.appendChild(makeSubli);
                var optSubText = obj[n][0]+" "+obj[n][i];
                makeSubli.innerHTML = optSubText;
                makeSubList.appendChild(linksLi);
            }
            makeItemLinks(localStorage.key(i), linksLi);
        }
    }
    function makeItemLinks(key, linksLi){
        var editLink = document.createElement('a');
        editLink.href = "#";
        editLink.key = key;
        var editText = "Edit Item";
        editLink.innerHTML = editText;
        linksLi.appendChild(editLink);
        
        var breakTag = document.createElement('br');
        linksLi.appendChild(breakTag);
        
        var deleteLink = document.createElement('a');
        deleteLink.href = "#";
        deleteLink.key = key;
        var deleteText = "Delete Item";
        deleteLink.innerHTML = deleteText;
        linksLi.appendChild(deleteLink);
    }
    function editItem(){
        var value = localStorage.getItem(this.key);
        var item = JSON.parse(value);
        toggleControls("off");
        $('productBrand').value = item.productBrand[1];
        $('productName').value = item.productName[1];
        $('productDescription').value = item.description[1];
        $('productRating').value = item.productRating[1];
        $('location').value = item.location[1];
        $('price').value = item.price[1];
        //item.tax                = ["Taxable?", taxValue];
        var radios = document.forms[0].tax;
        for(var i=0; i<radios.length;i++){
            if(radios[i].value == "Yes" && item.tax[1] == "Yes"){
                radios[i].setAttribute("checked","checked");
            }else if(radios[i].value == "No" && item.tax[1] == "No"){
                radios[i].setAttribute("checked","checked");
            }
        }
        $('datePurchased').value = item.datePurchased[1];
        $('size').value = item.size[1];
        $('sizeType').value = item.sizeType[1];
        
        save.removeEventListener("click", storeData);
        $('submit').value = "Edit Item";
        var editSubmit = $('submit');
        editSubmit.addEventListener("click", validate);
        editSubmit.key = this.key;

    }
    function clearLocal(){
        if(localStorage.length === 0) {
            alert("There is nothing to clear.");
        }else{
            window.location.reload();
            return false;
        }
    }
    function validate(){
        
    }
    var sizeTypes = ["--Select A Size Type--","Count","Each","Pack","Fluid Ounce","Ounce(s)","Pound(s)"],
            stores = ["--Select A Store--","Shop Rite","Acme","Super Fresh","Giant","Target","Walmart"],
            sizeValue,
            taxValue;
    makeTypes();
    makeStores();
    
    var displayLink = $('displayLink');
    displayLink.addEventLister("click", getData);
    var clearLink = $('clear');
    clearLink.addEventLister("click", clearLocal);
    var save = $('submit');
    save.addEventLister("click", validate);
    
    
    
});