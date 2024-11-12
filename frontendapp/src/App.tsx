import React, { useState, useEffect } from 'react';
import './App.css';
import Product from './Item';

function App() {
    // Setting the type for a product
    type ProductType = {
        id: number;
        name: string;
        price: number;
        description: string;
        category: string;
        image: string;
      
    }
    // UseStates for product and useRef for inputRef
    const [products, setProducts] = useState<ProductType[]>([]);  // Typed state for products
    const [searchQuery, setSearchQuery] = useState<string>(''); // State for the search query


   
    // Function to fetch data from backed API & sets the products to be rendered
    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:3000/products")
            
            if(!response.ok){
                throw new Error("Network not okey");
                
            }
            const data = await response.json();

            setProducts(JSON.parse(data))
        
        
        } catch (error) {
            console.log(error)
        }
    }
    // To handle the change of the input field (search)
    useEffect(() => {
        const fetchSearchResults = async () => {
            if (searchQuery) {
                try {
                    const response = await fetch(`http://localhost:3000/search?search=${searchQuery}`);

                    if (!response.ok) {
                        throw new Error("Network not ok");
                    }

                    const data = await response.json();
                    if (Array.isArray(data)) {
                        setProducts(data); // Update products with search result
                    } else {
                        setProducts(JSON.parse(data))
                    }
                } catch (error) {
                    console.log(error);
                }
            } else {
                fetchData(); // If searchQuery is empty, fetch all products
            }
        };

        fetchSearchResults(); // Call the function to fetch search results

    }, [searchQuery]); // This useEffect will run every time searchQuery changes
    


    return (
        <div className='flex flex-col justify-center items-center'>

            {/* Search bar using tailwind css */}
            <div className="px-4 py-4 flex flex-col justify-center items-center">
                <div className="border border-blue-500 bg-blue-200 rounded-full p-1 pl-2 pr-2 w-96 flex justify-between">
                    <input type="text" placeholder="Search..." className="bg-blue-200 rounded-full p-1 pl-5 pr-5 w-80" onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
                        value={searchQuery}/>
                    <button className="text-blue-200 bg-blue-200 mr-2">
                        <i className="fa-solid fa-magnifying-glass text-md text-blue-500"></i>
                    </button>
                </div>

            </div>
            {/* Divs and rendering of the products using tailwind css grid */}
            <div className="m-1 p-10 grid grid-rows-3 grid-flow-col gap-6">
                
                {products.map((p: ProductType) => (
                    <Product key={p.id} id={p.id} name={p.name} price={p.price} description={p.description} category={p.category }image={p.image} />
                    
                ))} 
                
            </div>

        </div>
    );
}

export default App;
