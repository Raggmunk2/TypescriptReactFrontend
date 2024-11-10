import React, { useState, useEffect, useRef } from 'react';
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
    const [products, setProducts] = useState([])
    const inputRef = React.useRef<HTMLInputElement>(null);
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
        
        } catch (error) {
            
        }
    }

    useEffect(() => {
        fetchData()
    }, [])
    const handleSubmit =  async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (inputRef.current !== null) {
            const response = await fetch(`http://localhost:3000/search-products?search=${inputRef.current.value}`, {
                method: "GET",
                mode: "cors",
                headers: {
                    'Content-type': "application/json",
                    'Access-Control-Allow-Origin': "*",
                    'Access-Control-Allow-Methods': "GET, POST"
                }
            }) 
            
            if(!response.ok){
                throw new Error("Network not okey");
                
            }
            const data = await response.json();
            setProducts(JSON.parse(data))
            
        }
    }
  return (
    <div className='flex flex-col justify-center items-center'>
        <div className="px-4 py-4 flex flex-col justify-center items-center">
            <div className="px-4 py-4 flex flex-col justify-center items-center">
                <form onSubmit={handleSubmit} className="px-4 py-4 flex flex justify-center items-center">
                    
                    <div className="border border-blue-500 bg-blue-200 rounded-full p-1 pl-2 pr-2 w-96 flex justify-between">
                        <input type="text" placeholder="Search..." ref={inputRef} className="bg-blue-200 rounded-full p-1 pl-5 pr-5 w-80" />
                        <button className="text-blue-200 bg-blue-200 mr-2">
                            <i className="fa-solid fa-magnifying-glass text-md text-blue-500"></i>
                        </button>
                    </div>

                        
                </form>
            </div>
            
        </div>
        <div className="px-4 py-4 flex flex-col justify-center items-center">
        <div className="m-1 p-10 grid grid-rows-5 grid-flow-col gap-6">
            
            {products.map((p: ProductType) => (
                <Product key={p.id} id={p.id} title={p.title} price={p.price} description={p.description} category={p.category }image={p.image} />
                
            ))} 
            
        </div>
        </div>
    </div>
  );
}

export default App;
