// import React from "react";
// // import "../Style.css";
// import HamBurger from "../../../public/assests/HamburgerMenu.png";
// import logo from "../../../public/assests/logo.png";
// import OptionsMenu from "../../../public/assests/OptionsMenu.png";
// import random01 from "../../../public/assests/random01.png";
// import random02 from "../../../public/assests/random02.png";
// import random03 from "../../../public/assests/random03.png";
// import random04 from "../../../public/assests/random04.png";
// import MLogoIcon from "../../../public/assests/MLogoIcon.png";
// import Delete from "../../../public/assests/delete.png";


// function Page5() {
//   return (
//     <div>
//       <div class="mainWraper">
//         <section class="Menusection">
//           <div class="container">
//             <div class="menuHeader">
//               <div>
//                 <input type="checkbox" id="openSideMenu" class="openSideMenu" />
//                 <label for="openSideMenu" class="menuIconToggle">
//                   <span>
//                     <img src={HamBurger} />
//                   </span>
//                 </label>
//                 <nav>
//                   <ul>
//                     <li>
//                       <a href="#">Menu Item 1</a>
//                     </li>
//                     <li>
//                       <a href="#">Menu Item 2</a>
//                     </li>
//                     <li>
//                       <a href="#">Menu Item 3</a>
//                     </li>
//                     <li>
//                       <a href="#">Menu Item 4</a>
//                     </li>
//                   </ul>
//                 </nav>
//               </div>
//               <div>
//                 <a class="navbar-brand" href="#">
//                   <img src={logo} />
//                 </a>
//               </div>
//               <div>
//                 <a href class="sign-in">
//                   <span class="userName">
//                   WW
//                   </span>
//                 </a>
//               </div>
//             </div>
//           </div>
//         </section>

//         <section class="headerInnerbox">
//           <div class="addbox">Banner Image</div>
//         </section>

//         <section class="rendering-board-section">
//           <div class="container">
//             <h2>Test renderings board</h2>
//             <div class="row">
//               <div class="col-md-8">
//                 <p class="imagemsg">7 images in this board</p>
//               </div>
//               <div class="col-md-4">
//                 <div class="trbwrap">
//                   <a href class="btn btn-primary">
//                     Add more images
//                   </a>
//                   <div class="dropdown">
//                     <a
//                       href="#"
//                       role="button"
//                       id="dropdownMenuLink"
//                       data-bs-toggle="dropdown"
//                       aria-expanded="false"
//                     >
//                       <img src={OptionsMenu} />
//                     </a>

//                     <ul
//                       class="dropdown-menu"
//                       aria-labelledby="dropdownMenuLink"
//                     >
//                       <li class="moreoption">More options</li>
//                       <li>
//                         <a class="dropdown-item" href="#">
//                           Delete board
//                         </a>
//                       </li>
//                       <li>
//                         <a class="dropdown-item" href="#">
//                           Share
//                         </a>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div class="row mt-4 redboarbtm">
//               <div class="col-md-6">
//                 <div class="sag-top">
//                   <div class="sagimagetp">
//                     <img src={random01} />
//                   </div>
//                 </div>
//               </div>
//               <div class="col-md-6 mt-5 mt-lg-0">
//                 <div class="sag-top">
//                   <div class="sagimagetpRgt">
//                     <img src={random02} />
//                   </div>
//                   <div class="sagimagebtmRgt">
//                     <span>
//                       <img src={random03} />
//                     </span>
//                     <span>
//                       <img src={random04} />
//                     </span>
//                   </div>
//                 </div>
//               </div>
//               <div class="vision-bar generaterbimg">
//                 <img src={MLogoIcon} />
//                 <span>Mountain landscape</span>
//                 <a href class="btn btn-secondary">
//                   Generate
//                 </a>
//               </div>

//               <div class="advanced-option-bar">
//                 <div class="dropdown">
//                   <button
//                     class="btn btn-adoption dropdown-toggle"
//                     type="button"
//                     id="dropdownMenu2"
//                     data-bs-toggle="dropdown"
//                     aria-expanded="false"
//                   >
//                     Advanced options
//                   </button>
//                   <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
//                     <li>
//                       <button class="dropdown-item" type="button">
//                         <img src={Delete} /> Landscape size only
//                       </button>
//                     </li>
//                     <li>
//                       <button class="dropdown-item" type="button">
//                         <img src={Delete} /> Portrait size only
//                       </button>
//                     </li>
//                     <li>
//                       <button class="dropdown-item" type="button">
//                         <img src={Delete} /> High resolution
//                         (+2880px)
//                       </button>
//                     </li>
//                     <li>
//                       <button class="dropdown-item" type="button">
//                         <img src={Delete} /> Mixed ratios
//                       </button>
//                     </li>
//                   </ul>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }

// export default Page5;
