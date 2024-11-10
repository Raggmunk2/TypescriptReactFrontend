import { ComponentType, useState } from "react";
import Modal from "react-modal";

// Interface for the product props
interface ProductProps {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
}
Modal.setAppElement('#root');
const Product = ({
  id,
  name,
  price,
  description,
  category,
  image,
}: ProductProps) => {
  

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Open the modal
  const openModal = () => {
      setIsModalOpen(!isModalOpen);
      
  };

  // Close the modal
  const closeModal = () => {
      setIsModalOpen(!isModalOpen);
  };

  return (
    <div
      key={id}
      className="grid border border-stone-300 rounded-md w-64"
      onClick={() => openModal()}
    >
      <div className="flex flex-col justify-end items-center">
        <img src={image} className="scale-75" alt="product" />
      </div>
      <div className="flex flex-col justify-end items-center pl-4 pr-4 pb-4">
        <label className="text-base font-bold text-center">{name}</label>
        <label className="text-base font-bold text-center">{category}</label>
        <label className="">Price {price} $</label>
      </div>

      <Modal
        isOpen={isModalOpen}
        contentLabel="Product Details"
        onRequestClose={closeModal}
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        className="bg-white rounded-lg w-96 h-[700px] flex flex-col justify-center px-4"
        ariaHideApp={false}
      >
        <div
          key={id}
          className=""
          onClick={() => openModal}
        >
            <div className="flex flex-col justify-center items-center">
                <img src={image} className="h-64" alt="product" />
                
                <div className="flex flex-col justify-end items-center">
                    <label className="text-base font-bold text-center">{name}</label>
                    <label className="text-base text-center">{category}</label>
                    <label className=""><b>Price:</b> {price} $</label>

                    <label className="text-center text-sm">{description}</label>
                <button className="bg-red-200 px-4 py-2 rounded-full m-2" onClick={closeModal}>Close</button>
                </div>
            </div>
        </div>
      </Modal>
    </div>
  );
};

export default Product;
