import React from 'react';
import './Header.css';
import utpl_alumnos from '../../assets/images/utpl-alumnos.png'

function Header() {

  const onClick = (e) => {
    e.preventDefault()
    console.log('onclick..')
  }

  return (
    <>
      <div className="scaleable-wrapper" id="scaleable-wrapper">
        <div className="very-specific-design" id="very-specific-design">

          <nav className="navbar-dark bg-utpl">
            <a className="marg-logo cursor-default" href="#" onClick={onClick}>
              <img src={utpl_alumnos} className="img-utpl-logo" alt="logo UTPL" />
            </a>
            <ul className="nav navbar-nav navbar-right" id="loginNav">
              <li>Ingresar</li>
            </ul>
            <div id="areas"></div>
          </nav>

          <div className="container-custom">
            <div className=" body-content">

              <div className="row">
                <div className="col">
                  <div id="navigationcontrolSmall">
                    <span className="navArrowLeftSmall navArrowLeftSmallDisabled cursor-default"></span>
                    <span className="navArrowRightSmall navArrowRightSmallDisabled cursor-default"></span>
                    <span className="menucontainer">

                      <span id="menuTrackInst" className="menutrack">
                        <span className="menuitem">
                          <div className="menuSmall">
                            <a href="@ViewBag.ambiente@ViewBag.infoEstu">Información personal</a>
                          </div>
                        </span>
                        <span className="menuItemSeperator"></span>
                        <span className="menuitem">
                          <div className="menuSmall menuSmallHighlight">
                            <a href="@ViewBag.ambiente@ViewBag.alumnos">Alumnos</a>
                          </div>
                        </span>
                        <span className="menuItemSeperator"></span>
                        <span className="menuitem">
                          <div className="menuSmall">
                            <a href="@ViewBag.ambiente@ViewBag.becasMatr">Becas y Ayudas Estudiantiles</a>
                          </div>
                        </span>
                        <span className="menuItemSeperator"></span>
                        <span className="menuitem">
                          <div className="menuSmall menuSmallHighlight">
                            <a href="@ViewBag.ambiente@ViewBag.servEstu">Servicios</a>
                          </div>
                        </span>
                        <span className="menuItemSeperator"></span>
                        <span className="menuitem">
                          <div className="menuSmall menuSmallHighlight">
                            <a href="@ViewBag.ambiente@ViewBag.prosEstu">Prospectos</a>
                          </div>
                        </span>
                      </span>

                    </span>
                  </div>
                </div>
              </div>

              <div className="row">

                <div className="col-lg-9">
                  <div className="col-lg-12" id="pagetitle">
                    Carga de Requisitos de Matrícula
                  </div>
                  <div className="col-lg-12 sub_menu_servicio">
                    <div className="backurl">
                      <a href="@ViewBag.ambiente@ViewBag.inicio" title="REGRESAR A MENÚ"></a>
                    </div>
                    <div className="breadCrumb hasBackURL">
                      <a href="@ViewBag.ambiente@ViewBag.inicio" className="">Inicio</a>
                      <div className="breadcrumbSeperator">&gt;</div>
                      <a href="#" onClick={onClick} className="selected cursor-default">Carga de Requisitos de Matrícula</a>
                    </div>
                  </div>
                </div>

                <div className="col-lg-3">
                  <p id="name-student">
                    {/* @if (User.Identity.Name != null)
                    {
                        @User.Identity.Name.ToUpper() <br> @ViewBag.date
                    } */}
                    Alexander Joel Sánchez Narváez
                  </p>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export { Header }
