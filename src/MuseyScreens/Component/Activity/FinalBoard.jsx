// import React from "react";
// // import "../Style.css";
// import HamBurger from "../../../public/assests/HamburgerMenu.png";
// import logo from "../../../public/assests/logo.png";
// import OptionsMenu from "../../../public/assests/OptionsMenu.png";
// import random01 from "../../../public/assests/random01.png";
// import random02 from "../../../public/assests/random02.png";
// import random03 from "../../../public/assests/random03.png";
// import random04 from "../../../public/assests/random04.png";
// import Delete from "../../../public/assests/delete.png";
// import random05 from "../../../public/assests/random05.png";
// import download from "../../../public/assests/download.png";
// import satisfy from "../../../public/assests/satisfy.png";
// import Unsatisfy from "../../../public/assests/unsatisfy.png";
// import close from "../../../public/assests/close.png";
// import random09 from "../../../public/assests/random09.png";
// import random07 from "../../../public/assests/random07.png";
// import random08 from "../../../public/assests/random08.png";
// import random06 from "../../../public/assests/random06.png";
// import MLogoIcon from "../../../public/assests/MLogoIcon.png";

// function FinalBoard() {
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
//             <div class="row mt-4">
//               <div class="col-md-12">
//                 <small class="show-results">Showing results for:</small>
//                 <p class="imagemsg">Mountain landscape</p>
//               </div>
//               <div class="col-6 col-xl-3">
//                 <div class="showreslutboximg">
//                   <img src={random05} />
//                   <a
//                     data-bs-toggle="modal"
//                     data-bs-target="#myModal"
//                     href
//                     class="onovrshow"
//                   >
//                     <img src={download} />
//                   </a>
//                 </div>
//               </div>
//               <div class="col-6 col-xl-3">
//                 <div class="showreslutboximg">
//                   <img src={random05} />
//                   <a
//                     data-bs-toggle="modal"
//                     data-bs-target="#myModal"
//                     href
//                     class="onovrshow"
//                   >
//                     <img src={download} />
//                   </a>
//                 </div>
//               </div>
//               <div class="col-6 col-xl-3">
//                 <div class="showreslutboximg">
//                   <img src={random05} />
//                   <a
//                     data-bs-toggle="modal"
//                     data-bs-target="#myModal"
//                     href
//                     class="onovrshow"
//                   >
//                     <img src={download} />
//                   </a>
//                 </div>
//               </div>
//               <div class="col-6 col-xl-3">
//                 <div class="showreslutboximg">
//                   <img src={random05} />
//                   <a
//                     data-bs-toggle="modal"
//                     data-bs-target="#myModal"
//                     href
//                     class="onovrshow"
//                   >
//                     <img src={download} />
//                   </a>
//                 </div>
//               </div>
//               <div class="col-md-12">
//                 <div class="satisfybox">
//                   <p>Are you satisfied with these results?</p>
//                   <div class="satisfyicon">
//                     <a href>
//                       <img src={satisfy} />
//                     </a>
//                     <a href>
//                       <img src={Unsatisfy} />
//                     </a>
//                   </div>
//                   <p class="mt-4">
//                     Sorry to hear that. Let’s see if we can improve those
//                     results.
//                   </p>
//                   <a
//                     data-bs-toggle="modal"
//                     data-bs-target="#myModal"
//                     href
//                     class="btn btn-primary mt-3"
//                   >
//                     Continue
//                   </a>
//                 </div>
//               </div>

//               {/* <!-- The Modal Second --> */}
//               <div class="modal modaldowload" id="myModal">
//                 <div class="modal-dialog">
//                   <div class="modal-content">
//                     <a href class="downloadClose" data-bs-dismiss="modal">
//                       <img src={close} />
//                     </a>
//                     <div class="modlbody">
//                       <img src={random09} />
//                       <a href class="btn btn-primary downloadbtn">
//                         Download
//                       </a>
//                       <a href="#" class="sharetxt">
//                         Share
//                       </a>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
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

//               <div class="col-md-6">
//                 <div class="sag-top">
//                   <div class="sagimagebtm">
//                     <span>
//                       <img src={random07} />
//                     </span>
//                     <span>
//                       <img src={random08} />
//                     </span>
//                   </div>
//                 </div>
//               </div>
//               <div class="col-md-6 mt-5 mt-lg-0">
//                 <div class="sag-botm">
//                   <div class="sagimagetpRgt">
//                     <img src={random06} />
//                   </div>
//                 </div>
//               </div>

//               <div class="vision-bar generaterbimg generaterbimgresults">
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
//                         <img src={Delete} /> High resolution (+2880px)
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

// export default FinalBoard;
