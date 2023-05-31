import React,{useState} from "react";
import { Modal } from "react-bootstrap";
function FinalBoard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <div class="mainWraper">
        <section class="rendering-board-section">
          <div class="container">
            <h2>Test renderings board</h2>
            <div class="row mt-4">
              <div class="col-md-12">
                <small class="show-results">Showing results for:</small>
                <p class="imagemsg">Mountain landscape</p>
              </div>
              <div class="col-6 col-xl-3">
                <div class="showreslutboximg">
                  <img src={'assests/random05.png'} />
                  <a
                    data-bs-toggle="modal"
                    data-bs-target="#myModal"
                    href
                    class="onovrshow"
                  >
                    <img src={'assests/download.png'} />
                  </a>
                </div>
              </div>
              <div class="col-6 col-xl-3">
                <div class="showreslutboximg">
                  <img src={'assests/random05.png'} />
                  <a
                    data-bs-toggle="modal"
                    data-bs-target="#myModal"
                    href
                    class="onovrshow"
                  >
                    <img src={'assests/download.png'} />
                  </a>
                </div>
              </div>
              <div class="col-6 col-xl-3">
                <div class="showreslutboximg">
                  <img src={'assests/random05.png'} />
                  <a
                    data-bs-toggle="modal"
                    data-bs-target="#myModal"
                    href
                    class="onovrshow"
                  >
                    <img src={'assests/download.png'} />
                  </a>
                </div>
              </div>
              <div class="col-6 col-xl-3">
                <div class="showreslutboximg">
                  <img src={'assests/random05.png'} />
                  <a
                    data-bs-toggle="modal"
                    data-bs-target="#myModal"
                    href
                    class="onovrshow"
                  >
                    <img src={'assests/download.png'} />
                  </a>
                </div>
              </div>
              <div class="col-md-12">
                <div class="satisfybox">
                  <p>Are you satisfied with these results?</p>
                  <div class="satisfyicon">
                    <a href>
                      <img src={'assests/satisfy.png'}/>
                    </a>
                    <a href>
                      <img src={'assests/Unsatisfy.png'}/>
                    </a>
                  </div>
                  <p class="mt-4">
                    Sorry to hear that. Let’s see if we can improve those
                    results.
                  </p>
                  <a
                    data-bs-toggle="modal"
                    data-bs-target="#myModal"
                    href
                    class="btn btn-primary mt-3"
                  >
                    Continue
                  </a>
                </div>
              </div>

              {/* <!-- The Modal Second --> */}
           
              {/*<!-- The Modal Third -->*/}
              <div class="modal continueEditImg" id="myModal">
                 <div class="modal-dialog">
                 <div class="modal-content">
             
                   {/*<!-- Modal Header -->*/}
                   <div class="modal-header border-bottom-0">
                     <h4 class="modal-title">What did you like about this image?</h4>
                     <a href class="" data-bs-dismiss="modal"><img src= {'assests/close.png'}/></a>                                
                     </div>
             
                   { /* <!-- Modal body -->*/}
                     <div class="modal-body">
                         <div class="row">
                             <small class="show-results mb-3">Image 1 of 7</small>
                             <div class="col-md-6">
                                <div class="continuemodalboximg"><img src={'assests/random01.png'}/></div>
                             </div>
                             <div class="col-md-6">
                                <div class="checkedfrm">
                                   <label class="containercb">
                                     <input type="checkbox"/>
                                     <span class="checkmark"></span>
                                   </label>
                                   <span>Colors</span>
                                </div>
                                <div class="checkedfrm">
                                 <label class="containercb">
                                   <input type="checkbox"/>
                                   <span class="checkmark"></span>
                                 </label>
                                 <span>Architecture</span>
                              </div>
                              <div class="checkedfrm">
                                 <label class="containercb">
                                   <input type="checkbox"/>
                                   <span class="checkmark"></span>
                                 </label>
                                 <span>Shapes</span>
                              </div>
                              <div class="checkedfrm">
                                 <label class="containercb">
                                   <input type="checkbox"/>
                                   <span class="checkmark"></span>
                                 </label>
                                 <span>Flowers</span>
                              </div>
                              <div class="checkedfrm">
                                 <label class="containercb">
                                   <input type="checkbox" id="myCheck" onclick="myFunction()"/>
                                   <span class="checkmark"></span>
                                 </label>
                                 <span>Other :</span>
                                
                              </div>
                              <div id="Other" style={{display:'none'}}>
                                 <input type="text" placeholder="Triangle pattern" name="" />
                             </div>
                             <div class="c-btb-wrap">                                
                                 <a href class="btn btn-primary">Next image</a>
                                 <a href class="btn btn-primary primary-border">Done</a>
                             </div>
                             </div>
                         </div>
                     </div>
             
                   
             
                 </div>
                 </div>
             </div>
            </div>
            <div class="row">
              <div class="col-md-8">
                <p class="imagemsg">7 images in this board</p>
              </div>
              <div class="col-md-4">
                <div class="trbwrap">
                  <a href class="btn btn-primary">
                    Add more images
                  </a>
                  <div class="dropdown">
                    <a
                      href="#"
                      role="button"
                      id="dropdownMenuLink"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src={'assests/OptionsMenu.png'} />
                    </a>

                    <ul
                      class="dropdown-menu"
                      aria-labelledby="dropdownMenuLink"
                    >
                      <li class="moreoption">More options</li>
                      <li>
                        <a class="dropdown-item" href="#">
                          Delete board
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item" href="#">
                          Share
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div class="row mt-4 redboarbtm">
              <div class="col-md-6">
                <div class="sag-top">
                  <div class="sagimagetp">
                    <img src={'assests/random01.png'} />
                  </div>
                </div>
              </div>
              <div class="col-md-6 mt-5 mt-lg-0">
                <div class="sag-top">
                  <div class="sagimagetpRgt">
                    <img src={'assests/random02.png'} />
                  </div>
                  <div class="sagimagebtmRgt">
                    <span>
                      <img src={'assests/random03.png'} />
                    </span>
                    <span>
                      <img src={'assests/random04.png'} />
                    </span>
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="sag-top">
                  <div class="sagimagebtm">
                    <span>
                      <img src={'assests/random07.png'} />
                    </span>
                    <span>
                      <img src={'assests/random08.png'} />
                    </span>
                  </div>
                </div>
              </div>
              <div class="col-md-6 mt-5 mt-lg-0">
                <div class="sag-botm">
                  <div class="sagimagetpRgt">
                    <img src={'assests/random06.png'} />
                  </div>
                </div>
              </div>

              <div class="vision-bar generaterbimg generaterbimgresults">
                <img src={'assests/MLogoIcon.png'} />
                <span>Mountain landscape</span>
                <a href class="btn btn-secondary">
                  Generate
                </a>
              </div>

              <div class="advanced-option-bar">
                <div class="dropdown">
                  <button
                    class="btn btn-adoption dropdown-toggle"
                    type="button"
                    id="dropdownMenu2"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Advanced options
                  </button>
                  <ul class="dropdown-menu" aria-labelledby="dropdownMenu2">
                    <li>
                      <button class="dropdown-item" type="button">
                        <img src={'assests/delete.png'} /> Landscape size only
                      </button>
                    </li>
                    <li>
                      <button class="dropdown-item" type="button">
                        <img src={'assests/delete.png'} /> Portrait size only
                      </button>
                    </li>
                    <li>
                      <button class="dropdown-item" type="button">
                        <img src={'assests/delete.png'} /> High resolution (+2880px)
                      </button>
                    </li>
                    <li>
                      <button class="dropdown-item" type="button">
                        <img src={'assests/delete.png'} /> Mixed ratios
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default FinalBoard;
