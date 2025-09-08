// import React from "react";
// import headphonesDark from "../../assets/motherboard2251.png";
// import smartWatch from "../../assets/pannel2251.png";
// import { useNavigate } from "react-router-dom";
// import { useContext } from "react";
// import { ProductContext } from "../../Context/ProductContext/ProductContext";
// import { Link } from "react-router-dom";

// const ProductShowcase = () => {

//   const navigate = useNavigate();

//    const { productDetails } = useContext(ProductContext);

//    const accessoriesProducts = productDetails.filter(
//     (product) => product.category.toLowerCase() === "accessories"
//   );


//   const navigateToProduct = (id) => {
//     navigate(`/product/${id}`);
//   };


//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 sm:p-6 lg:p-8">
//       {/* Motherboard Section */}
//       <div className="bg-[#F1F4FF] p-6 md:p-10 lg:p-16 py-10 rounded-lg flex flex-col relative overflow-hidden group h-full">
//         <h5 className="text-indigo-600 font-extrabold uppercase text-sm tracking-wide">
//           Best Motherboard
//         </h5>
//         <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C2C54] leading-tight mt-2">
//           Find your <br /> motherboard!
//         </h2>
//         <button className="bg-indigo-600 hover:bg-indigo-700 transition-colors px-6 py-2 w-full sm:w-auto my-4 text-white rounded-lg uppercase text-sm sm:text-base">
//            <Link to="/products">Shop Now</Link>
//         </button>
        
//         {/* 3D Motherboard with Permanent Shadow */}
//         <div className="absolute right-0 w-[30vw] md:w-[25vw] lg:w-[20vw] h-[25vh]"
//           style={{ bottom: '15%' }}>
//           <div className="relative w-full h-full">
//             {/* Glow effect behind product */}
//             <div className="absolute inset-0 bg-indigo-200/20 blur-[20px] rounded-lg right-[2rem] md:right-[4rem]"></div>
            
//             {/* Main product image with strong drop shadow */}
//             <img
//               src={headphonesDark}
//               alt="Motherboard"
//               className="absolute w-full h-full object-contain right-[2rem] md:right-[4rem] z-10"
//               style={{
//                 // transform: 'rotateY(5deg) rotateX(5deg) rotate(5deg)',
//                 filter: 'drop-shadow(16px 16px 20px rgba(0,0,0,0.25))',
//                 transformOrigin: 'center center',
//                 transformStyle: 'preserve-3d'
//               }}
//             />
            
//             {/* Contact shadow (permanent) */}
//             <div 
//               className="absolute bottom-[-5px] right-[2rem] md:right-[4rem] w-[70%] h-[8px] bg-black/20 blur-[8px] rounded-full"
//               style={{
//                 transform: 'rotateX(75deg) scaleY(0.3)',
//                 transformOrigin: 'center top',
//                 filter: 'blur(8px)'
//               }}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Panel Section */}
//       <div className="bg-[#485AD8] p-6 md:p-10 lg:p-16 text-white rounded-lg flex flex-col relative overflow-hidden min-h-[20rem] sm:min-h-[25rem] md:min-h-[30rem]">
//         <h5 className="text-white font-semibold uppercase text-sm tracking-wide">
//           Best Panel for you in 2025
//         </h5>
//         <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mt-2">
//           Panel <br /> for you!
//         </h2>
//         <button className="bg-white hover:bg-gray-100 transition-colors px-6 py-2 w-full sm:w-auto my-4 text-black rounded-lg uppercase text-sm sm:text-base">
//           <Link to="/products">Shop Now</Link>
//         </button>
        
//         {/* 3D Panel with Permanent Shadow */}
//         <div className="absolute right-0 w-[30vw] md:w-[25vw] lg:w-[20vw] h-[25vh]"
//           style={{ bottom: '15%' }}>
//           <div className="relative w-full h-full">
//             {/* Glow effect behind product */}
//             <div className="absolute inset-0 bg-blue-200/20 blur-[20px] rounded-lg right-[1rem] md:right-[3rem]"></div>
            
//             {/* Main product image with strong drop shadow */}
//             <img
//               src={smartWatch}
//               alt="Panel"
//               className="absolute w-full h-full object-contain right-[1rem] md:right-[3rem] -bottom-8 z-10"
//               style={{
//                 // transform: 'rotateY(5deg) rotateX(5deg) rotate(5deg)',
//                 filter: 'drop-shadow(16px 16px 20px rgba(0,0,0,0.3))',
//                 transformOrigin: 'center center',
//                 transformStyle: 'preserve-3d'
//               }}
//             />
            
//             {/* Contact shadow (permanent) */}
//             <div 
//               className="absolute bottom-[-5px] right-[1rem] md:right-[3rem] w-[70%] h-[8px] bg-black/25 blur-[8px] rounded-full"
//               style={{
//                 transform: 'rotateX(75deg) scaleY(0.3)',
//                 transformOrigin: 'center top',
//                 filter: 'blur(8px)'
//               }}
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductShowcase;
