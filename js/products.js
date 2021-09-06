var productsArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;
const ORDER_ASC_BY_COST = "AZ";
const ORDER_DESC_BY_COST = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_BY_COST)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_DESC_BY_COST){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_BY_PROD_COUNT){
        result = array.sort(function(a, b) {
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);

            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }

    return result;
}
function showProductsList(){

    let htmlContentToAppend = "";
    
    for(let i = 0; i < productsArray.length; i++){
        let products = productsArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(products.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(products.cost) <= maxCount))){

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + products.imgSrc + `" alt="` + `" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ products.name +`</h4>
                        <small class="text-muted">` + products.soldCount + ` artículos vendidos</small>
                    </div>
                    <p> ` + products.description + `</p>
                    <p> ` + products.currency + products.cost + `</p>
                </div>
            </div>
        </div>
        `

        document.getElementById("elemento1").innerHTML = htmlContentToAppend;
    }
}
}

function sortAndShowProducts(sortCriteria, array){
    currentSortCriteria = sortCriteria;

    if(array != undefined){
        productsArray = array;
    }

    productsArray = sortProducts(currentSortCriteria, productsArray);

    //Muestro las categorías ordenadas
    showProductsList();
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productsArray = resultObj.data;
            //Muestro las categorías ordenadas
            showProductsList();
        }
    });
});
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDER_ASC_BY_COST, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_BY_COST);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DESC_BY_COST);
    });

    document.getElementById("sortByProductCount").addEventListener("click", function(){
        sortAndShowProducts(ORDER_BY_PROD_COUNT);
    });

    document.getElementById("clearRangeProductFilter").addEventListener("click", function(){
        document.getElementById("rangeProductFilterCountMin").value = "";
        document.getElementById("rangeProductFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;
    

        showProductsList();
});

    document.getElementById("rangeProductFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
        minCount = document.getElementById("rangeProductFilterCountMin").value;
        maxCount = document.getElementById("rangeProductFilterCountMax").value;

        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
            minCount = parseInt(minCount);
        }
        else{
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
            maxCount = parseInt(maxCount);
        }
        else{
            maxCount = undefined;
        }

        showProductsList();
    });
});
