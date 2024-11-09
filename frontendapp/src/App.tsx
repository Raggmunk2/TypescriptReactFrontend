import React, { useState, useEffect } from 'react';
import './App.css';
import Product from './Item';


function App() {
    type ProductType = {
        id: number;
        title: string;
        price: number;
        description: string;
        category: string;
        image: string;
      
    }
    const [search, setSearch] = useState("all")
    const [products, setProducts] = useState([])

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:3000/products", {
                method: "GET",
                mode: "cors",
                headers: {
                    'Content-type': "application/json"
                }
            })

            if(!response.ok){
                throw new Error("Network not okey");
                
            }
            const data = await response.json();
            setProducts(JSON.parse(data))
            
            /* JSON.parse(data).map((p : ProductType) => (
                console.log(p.id)
            )) */
        } catch (error) {
            
        }
    }

    useEffect(() => {
        fetchData()
        console.log("här du här")
   
    }, [])
    console.log("products: " + products)
  return (
    <div className="App">
        hej
        {products.map((p: ProductType) => (
            <Product id={p.id} title={p.title} price={p.price} description={p.description} category={p.category }image={p.image} />

        ))}
{/*       <DataLoader setProducts={setProducts} urlParam={search}/> */}
        
    </div>
  );
}

export default App;
