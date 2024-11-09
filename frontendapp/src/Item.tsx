import React, {FC} from "react";

interface ProductProps {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
  
}
const Product = ({id,title, price,description,category,image}: ProductProps) => {
    return (
        <>
        <div key={id} className="grid grid-flow-row-dense grid-col-1 grid-row-3 border border-stone-300 rounded-md" >
                    <div className="row-span-6 flex flex-col justify-end items-center">
                        <img src={image} className="scale-75" alt="product"/>
                    </div>
                    <div className="row-span-6 flex flex-col justify-end items-center pl-4 pr-4 pb-4">
                    
                    <label className="text-base font-bold text-center">{title}</label>
                    <label className="text-base font-bold text-center">{category}</label>
                    <label className="">Price {price} $</label>
                    <p>{description}</p>
                    </div>
                
                </div>
       
        </>
    )
}

export default Product