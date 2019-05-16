//console.log('entra al app.js')
class Product {
    constructor(name,price,year){
        this.name = name;
        this.price = price;
        this.year = year;
    }
}

class UI{
    addProduct(product){//en esta parte creamos un elemento en html que se crea apartir del producto
        const productLIst= document.getElementById('product-list');
        const element = document.createElement('div');
        //este es el diseño de que elemento va dentro del año
        element.innerHTML = `
            <div class="card text-center mb-4" >
                <div class="card-body">
                    <p><strong>Product Name</strong>: ${product.name}</p>
                    <p><strong>Product Price</strong>: ${product.price}</p>
                    <p><strong>Product Year</strong>: ${product.year}</p>
                    <p><a href="#" class="btn btn-danger" name="delete">Delete</a></p>
                </div>
            </div>
        `;
        //23:43 nos quedamos en la agregada del boton de borrar
        productLIst.appendChild(element);
    }

    resetForm(){
        document.getElementById('product-form').reset();
    }

    deleteProduct(element){
        if(element.name === 'delete'){
            element.parentElement.parentElement.parentElement.remove();
            //console.log()//para ver que elemento padre tenemos
            this.showMessage('Product Deleting Suceesfully', 'danger')
        }
        

    }

    showMessage(message, cssClass){
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-4`;
        div.appendChild(document.createTextNode(message));
        //Show in the DOM
        const container = document.querySelector('.container');
        const app = document.querySelector('#App');
        container.insertBefore(div, app);
        setTimeout(function(){
            document.querySelector('.alert').remove();
        },3000);
    }
}

//DOM EVENTS e es abreviatura de evento o event

document.getElementById('product-form')
        .addEventListener('submit', function (e){
            const name = document.getElementById('name').value;
            const price = document.getElementById('price').value;
            const year = document.getElementById('year').value;
            //console.log(name,price,year)
            //console.log(new Product(name,price,year));
            const product = new Product(name,price,year); //esta parte guardas el producto creado
            const ui = new UI(); //creas una nueva muestra del producto un objeto del producto creado
            if(name === '' || price === '' || year === ''){
                return ui.showMessage('Complete the Form Please', 'danger'); //con esto ya no sigue con la funcion
            }
            ui.addProduct(product);
            ui.resetForm();
            ui.showMessage('Product Added Sucessfully', 'success')
        e.preventDefault();
})

document.getElementById('product-list').addEventListener('click', function(e){
    const  ui = new UI();
    ui.deleteProduct(e.target);
})