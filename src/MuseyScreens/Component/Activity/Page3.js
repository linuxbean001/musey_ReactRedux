// import React from "react";
// // import "../Style.css";
// import HamBurger from "../../../public/assests/HamburgerMenu.png";
// import close from "../../../public/assests/close.png";
// import UploadArea from "../../../public/assests/UploadArea.png";
// import Randombox from "../../../public/assests/randombox-default.png";
// import logo from "../../../public/assests/logo.png";

// function Page3() {
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
//                   <span class="userName">WW</span>
//                 </a>
//               </div>
//             </div>
//           </div>
//         </section>

//         <section class="headerInnerbox">
//           <div class="addbox">Banner Image</div>
//         </section>

//         <section class="searchsection">
//           <div class="container">
//             <div class="searchbar">
//               <div class="untitleboard">
//                 <span>Untitled board 1</span>
//               </div>
//             </div>
//             <div class="start-adding-grid">
//               <div class="popupbox adpop">
//                 <p>Start adding some images to this board</p>
//                 <a
//                   href
//                   class="btn btn-primary"
//                   data-bs-toggle="modal"
//                   data-bs-target="#myModal"
//                 >
//                   Click to add images
//                 </a>
//               </div>
//               <div class="modal" id="myModal">
//                 <div class="modal-dialog">
//                   <div class="modal-content">
//                     <div class="modal-header">
//                       <h4 class="modal-title">Upload files</h4>
//                       <a href="" class="" data-bs-dismiss="modal">
//                         <img src={close} />
//                       </a>
//                     </div>
//                     <div class="modal-body">
//                       <div class="row">
//                         <div class="col-md-6">
//                           <div class="NeonUpload Neon-upload-theme-dragdropbox">
//                             <input
//                               style={{
//                                 cursor: "pointer",
//                                 zIndex: 999,
//                                 opacity: 0,
//                                 width: "320px",
//                                 height: "200px",
//                                 position: "absolute",
//                                 right: "0px",
//                                 left: "0px",
//                                 marginRight: "auto",
//                                 marginLeft: "auto",
//                               }}
//                               name="files[]"
//                               id="filer_input2"
//                               multiple="multiple"
//                               type="file"
//                             />
//                             <img src={UploadArea} />
//                           </div>
//                         </div>
//                         <div class="col-md-6">
//                           <div class="randomeimgbox">
//                             <div>
//                               <p>randomimagename.jpg</p>
//                               <div class="progress" style={{ height: "10px" }}>
//                                 <div
//                                   class="progress-bar"
//                                   style={{ width: "40%", height: "10px" }}
//                                 ></div>
//                               </div>
//                               <p>randomimagename.jpg</p>
//                               <div class="progress" style={{ height: "10px" }}>
//                                 <div
//                                   class="progress-bar"
//                                   style={{ width: "40%", height: "10px" }}
//                                 ></div>
//                               </div>
//                               <p>randomimagename.jpg</p>
//                               <div class="progress" style={{ height: "10px" }}>
//                                 <div
//                                   class="progress-bar"
//                                   style={{ width: "40%", height: "10px" }}
//                                 ></div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div class="row">
//                 <div class="col-md-6">
//                   <div class="sag-top">
//                     <div class="sagimagetp">
//                       <img src={Randombox} />
//                     </div>
//                     <div class="sagimagebtm">
//                       <span>
//                         <img src={Randombox} />
//                       </span>
//                       <span>
//                         <img src={Randombox} />
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//                 <div class="col-md-6 mt-5 mt-lg-0">
//                   <div class="sag-top">
//                     <div class="sagimagetpRgt">
//                       <img src={Randombox} />
//                     </div>
//                     <div class="sagimagebtmRgt">
//                       <span>
//                         <img src={Randombox} />
//                       </span>
//                       <span>
//                         <img src={Randombox} />
//                       </span>
//                     </div>
//                   </div>
//                   <div class="sag-botm">
//                     <div class="sagimagetpRgt">
//                       <img src={Randombox} />
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </div>
//     </div>
//   );
// }

// export default Page3;
