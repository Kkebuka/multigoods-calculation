
let ctnArray = [];
let totalCbmArray= [];
const totalCtnArray= [];

class Book{
    constructor(item, no_ctn, cbm, price){
        this.item = item;
        this.no_ctn = no_ctn;
        this.cbm = cbm;
        this.price = price;
    }
}


class UI{

    TotalArray(totCtn, totCbm){
        ctnArray.push(parseFloat(no_ctn.value))
        // let totalCtn = ctnArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        // console.log(totalCtn)

        
        totalCbmArray.push((parseFloat(totCtn)));
        // let CbmTotal = totalCbmArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        // console.log(CbmTotal)

        
        totalCtnArray.push(parseFloat(totCbm));
        // let ctnTotal = totalCtnArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        // console.log(ctnTotal)
        

    }

    showMessage(message, className){
        const div = document.createElement('div');
        div.className = `alert ${className}`
        div.appendChild(document.createTextNode(message))
        const parentDiv = document.querySelector('.container');
        const beforeElent = document.querySelector('#book-form');
        parentDiv.insertBefore(div, beforeElent);
        setTimeout(function(){
            div.remove()
        }, 2000)
    }

    addBookToList(newCbm, newCtnPrice){
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${item.value}</td>
        <td>${no_ctn.value}</td>
        <td>${cbm.value}</td>
        <td>${newCbm}</td>
        <td>${price.value}</td>
        <td>${newCtnPrice}</td>
        <td><a href="#" class="delete">x</a></td>
        `

        const parent = document.querySelector('#book-list')
        parent.appendChild(row);
     }
    clearList(){
        item.value = '',
        no_ctn.value = '',
        cbm.value = '';
        price.value = '';
    }
   
    clearBook(target){
        if(target.className === 'delete'){
            let removeCtn = target.parentElement.parentElement.children[1].innerHTML;
            removeCtn = parseFloat(removeCtn);
            let index = ctnArray.indexOf(removeCtn);
            index = ctnArray.indexOf(removeCtn, index);
            ctnArray.splice(index, 1);

            let removeTotalCbm = target.parentElement.parentElement.children[3].innerHTML;
            removeTotalCbm = parseFloat(removeTotalCbm);
            index = totalCbmArray.indexOf(removeTotalCbm);
            index = totalCbmArray.indexOf(removeTotalCbm, index);
            totalCbmArray.splice(index, 1);

            let removeTotalCtn = target.parentElement.parentElement.children[5].innerHTML;
            removeTotalCtn = parseFloat(removeTotalCtn);
            index = totalCtnArray.indexOf(removeTotalCtn);
            index = totalCtnArray.indexOf(removeTotalCtn, index);
            totalCtnArray.splice(index, 1);


            target.parentElement.parentElement.remove();
            console.log(parseFloat(removeCtn));
            console.log(ctnArray);
            console.log(parseFloat(removeTotalCbm));
            console.log(totalCbmArray);
            console.log(parseFloat(removeTotalCtn));
            console.log(totalCtnArray);
        }
    }

    totalCalculation(){
        
        let totalCtn = ctnArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        console.log(totalCtn)
        
        let CbmTotal = totalCbmArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        console.log(CbmTotal)
        
        let ctnTotal = totalCtnArray.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        console.log(ctnTotal)
        
        const totalRow = document.createElement('tr');
            totalRow.innerHTML = `
            <td>Total=</td>
            <td>${totalCtn}</td>
            <td>-</td>
            <td>${CbmTotal}</td>
            <td>-</td>
            <td>${ctnTotal.toFixed(2)}</td>
            <td><a href="#" class="delete">x</a></td>
            `
            const parent = document.querySelector('#book-list')
            parent.appendChild(totalRow);
    }

    newElement(){
        const submit = document.querySelector('.nsubmit')
        const oldButton = document.querySelector('#done');
        const btnContainer = document.querySelector('.btn_container');
        btnContainer.replaceChild(submit, oldButton);
        submit.style.display = 'block'
    }
}





document.querySelector('#book-form').addEventListener('submit', function(e){
    const item = document.querySelector('#item').value,
        no_ctn = document.querySelector('#no_ctn').value,
        cbm = document.querySelector('#cbm').value,
        price = document.querySelector('#price').value;

    const book = new Book(item, no_ctn, cbm, price);
    
    
   
    
    const ui = new UI();
    if(item ==='' || no_ctn === '' || cbm === '' || price ==='') {
        ui.showMessage('Please fill the fields', 'error');
   
} else{
    const totalCbm = (no_ctn * cbm).toFixed(2);
    const totalPrice = (no_ctn * price).toFixed(2);

   
    ui.addBookToList(totalCbm, totalPrice)
    ui.TotalArray(totalCbm, totalPrice)
    ui.clearList()
    ui.showMessage('Book Added ', 'success');
}


    e.preventDefault()
});

document.querySelector('#book-list').addEventListener('click', function(e){

    const ui = new UI()
    ui.clearBook(e.target);

    e.preventDefault()
})




document.querySelector('#done').addEventListener('click', function(){





    const ownerName = document.querySelector('#name_id').value; 
    const ownerContainer = document.querySelector('.owner_container');
    ownerContainer.appendChild(document.createTextNode(ownerName));
    let nameID = document.querySelector('#name_id');
    nameID.style.display = 'none'
    const ui = new UI()
   
    ui.totalCalculation();

    ui.newElement();




});

// document.querySelector('.nsubmit').addEventListener('click', function(e){
    //  
    // const ownerName = document.querySelector('#name_id').value;


    $(document).ready(function () { 
        
        var form = $('.table'),  
        cache_width = form.width(),  
        a4 = [595.28, 841.89]; // for a4 size paper width and height  
    
        document.querySelector('.nsubmit').addEventListener('click', function(){  
            $('body').scrollTop(0);  
            
            createPDF();  
        });  
        
        function createPDF() {  
            getCanvas().then(function (canvas) { 
                const ownerName = document.querySelector('#name_id').value;
                var  
                 img = canvas.toDataURL("image/png"),  
                 doc = new jsPDF({  
                     unit: 'px',  
                     format: 'a4'  
                 });  
                doc.addImage(img, 'JPEG', 20, 20);  
                doc.save(`${ownerName}.pdf`);  
                form.width(cache_width);  
            });  
        }  
          
        function getCanvas() {  
            form.width((a4[1] * 1.33333) - 80).css('max-width', 'none');  
            return html2canvas(form, {  
                imageTimeout: 2000,  
                removeContainer: true  
            });  
        
        }
    })
    //  e.preventDefault();
// })