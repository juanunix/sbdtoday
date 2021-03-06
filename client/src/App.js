import React, { Component } from 'react';
import './App.css';
import axios from "axios";
var Scroll = require('react-scroll');
var Link = Scroll.Link;

class App extends Component {
  constructor(props) {
    super(props);
    this.actualizarDesdeSBD = this.actualizarDesdeSBD.bind(this);
    this.actualizarDesdeBitcoin = this.actualizarDesdeBitcoin.bind(this);
    this.actualizarDesdeBolivares = this.actualizarDesdeBolivares.bind(this);
		this.actualizarDesdeSteem = this.actualizarDesdeSteem.bind(this);
    this.SBDtoBTC = 0;
    this.BTCtoUSD = 0;
    this.USDtoVEF = 0;
		this.STEEMtoBTC = 0;
    this.BTCtoVEF = 0;
  }

  componentDidMount() {
    // Obtiene el precio actual del dolar desde DolarToday a través del API
    axios.get('/api/USD-VEF')
      .then(response => {
        this.USDtoVEF = response.data;
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);}})

    // Obtiene el precio actual Bitcoin a través de Bitfinex a través del API
    axios.get('/api/BTC-USD')
      .then(response => {
        this.BTCtoUSD = response.data;
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);}})

    // Obtiene el precio actual del SBD a través de Bittrex a través del API
    axios.get('/api/SBD-BTC')
      .then(response => {
        this.SBDtoBTC = response.data.result.Last;
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);}})

		// Obtiene el precio actual del SBD a través de Bittrex a través del API
	  axios.get('/api/STEEM-BTC')
	    .then(response => {
	      this.STEEMtoBTC = response.data.result.Last;
	    })
	    .catch(function (error) {
	      if (error.response) {
	        console.log(error.response.data);
	        console.log(error.response.status);
	        console.log(error.response.headers);
				}
			});

	}


  actualizarDesdeSBD (e) {
    var bitcoins = document.getElementById("bitcoin");
    var bolivares = document.getElementById("bsf");
		var steem = document.getElementById("steem");
    bitcoins.value = e.target.value*this.SBDtoBTC;
    bolivares.value = e.target.value * this.SBDtoBTC * this.USDtoVEF;
		steem.value = (e.target.value*this.SBDtoBTC)/this.STEEMtoBTC;
  }

  actualizarDesdeBitcoin (e) {
    var sbd = document.getElementById("sbd");
    var bolivares = document.getElementById("bsf");
		var steem = document.getElementById("steem");
    sbd.value = e.target.value/this.SBDtoBTC;
    bolivares.value = e.target.value*this.USDtoVEF;
		steem.value = e.target.value/this.STEEMtoBTC;

  }

  actualizarDesdeBolivares (e) {
    var bitcoins = document.getElementById("bitcoin");
    var sbd = document.getElementById("sbd");
		var steem = document.getElementById("steem");
    bitcoins.value = (e.target.value/this.USDtoVEF);
    sbd.value = (e.target.value/this.USDtoVEF)/this.SBDtoBTC;
		steem.value = bitcoins.value/this.STEEMtoBTC;

  }

	actualizarDesdeSteem (e) {
    var bitcoins = document.getElementById("bitcoin");
    var sbd = document.getElementById("sbd");
		var bolivares = document.getElementById("bsf");
		bitcoins.value = (e.target.value * this.STEEMtoBTC);
		bolivares.value = e.target.value * this.STEEMtoBTC * this.USDtoVEF;
    sbd.value = (e.target.value * this.STEEMtoBTC)/this.SBDtoBTC;
  }



  render() {
    return (
      <div className="container-fluid">
        <Link className="flecha hidden-lg" to="informacion" spy={true} smooth={true} offset={0} duration={1000} delay={100}>
          <span className="glyphicon glyphicon-chevron-down"></span>
        </Link>
        <div className="row principal">
          <div className="col-lg-4 col-md-5 col-sm-6 col-xs-10 monedas">
            <img  src={require("./assets/logo.png")} style={{width: "100%", height: "70%", paddingBottom: "15px"}} alt="Logo de SBDToday"/>
            <label htmlFor="sbd">SBD </label><input type="text" id="sbd" onKeyUp={this.actualizarDesdeSBD}/><br/>
						<label htmlFor="steem">STEEM </label><input type="text" id="steem" onKeyUp={this.actualizarDesdeSteem}/><br/>
            <label htmlFor="bitcoin">Bitcoin </label><input type="text" id="bitcoin" onKeyUp={this.actualizarDesdeBitcoin}/><br/>
            <label htmlFor="bsf">Bolívares </label><input type="text" id="bsf" onKeyUp={this.actualizarDesdeBolivares}/>
          </div>
          <div className="col-lg-7 visible-lg">
              <h2>¿Qué es SBDToday?</h2>
              <p>SBDToday surge como una idea pensada para los usuarios venezolanos que hacen vida en la comunidad de Steemit con el fin de que éstos puedan tener un valor de referencia sobre cuántos Bolívares y Bitcoins representan sus ganancias en SBD.<br/><br/>
              <p>Este proyecto cuenta con el apoyo y patrocinio del grupo <a href="https://steemit.com/@provenezuela">@provenezuela</a> en Steemit.</p> <br/>
              <div style={{display: "flex", justifyContent: "center"}}>
                <a href="https://steemit.com/@provenezuela" alt="Perfil de steemit de provenezuela"><img className="img-responsive" src={require("./assets/logopv.png")} alt="Logo de provenezuela"/></a>
              </div>
              <br/>
              Si te gusta esta aplicación y quieres apoyar al talento venezolano, puedes expresar tu aprecio mediante una pequeña <a href="https://steemit.com/@jfuenmayor96/f" alt="Perfil en Steemit de Julio Fuenmayor">donación</a> en Steemit.
              </p>
              <h2>¿Cómo hacen la conversión?</h2>
              <p>Cada vez que se ingresa a SBDToday se descarga la última información disponible de las tasas de cambio proporcionadas por las APIs de <b>Bittrex</b> para convertir de <b>SBD a Bitcoin</b> y la de <b>Bitfinex</b> para convertir de <b>Bitcoin a Dólares</b>. En ningún momento SBDToday establece algún tipo de tasa de cambio. Todos los valores aquí presentes deben ser considerados como valores de referencia.</p>
          </div>

        </div>
        <div className="row informacion hidden-lg" id="informacion">
          <div className="col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1" style={{color: "black"}}>
            <h1>SBDToday</h1>
          </div>
          <div className="col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1" style={{color: "black"}}>
            <h2>¿Qué es SBDToday?</h2>
            <p>SBDToday surge como una idea pensada para los usuarios venezolanos que hacen vida en la comunidad de Steemit con el fin de que éstos puedan tener un valor de referencia sobre cuántos Bolívares y Bitcoins representan sus ganancias en SBD.</p><br/><br/>
            <p>Este proyecto cuenta con el apoyo y patrocinio del grupo <a href="https://steemit.com/@provenezuela">@provenezuela</a> en Steemit.</p> <br/>
            <div style={{display: "flex", justifyContent: "center"}}>
              <a href="https://steemit.com/@provenezuela" alt="Perfil de steemit de provenezuela"><img className="img-responsive" src={require("./assets/provenezuela.png")} alt="Logo de provenezuela"/></a>
            </div>
            <br/>
            <p>Si te gusta esta aplicación y quieres apoyar al talento venezolano, puedes expresar tu aprecio mediante una pequeña <a href="https://steemit.com/@jfuenmayor96/f" alt="Perfil en Steemit de Julio Fuenmayor">donación</a> en Steemit.</p>
          </div>
          <div className="col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1" style={{color: "black", paddingTop: "15px", paddingBottom: "15px"}}>
            <h2>¿Cómo funciona?</h2>
            <p>Es tan simple como colocar el valor que deseas convertir en el recuadro correspondiente a su moneda, y automáticamente los otros dos campos se actualizarán con su respectiva conversión.</p>
          </div>
          <div className="col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3 col-xs-10 col-xs-offset-1" style={{color: "black", paddingTop: "15px", paddingBottom: "45px"}}>
            <h2>¿Cómo hacen la conversión?</h2>
            <p>Cada vez que se ingresa a SBDToday se descarga la última información disponible de las tasas de cambio proporcionadas por las APIs de <b>Bittrex</b> para convertir de <b>SBD a Bitcoin</b> y la de <b>Bitfinex</b> para convertir de <b>Bitcoin a Dólares</b>. En ningún momento SBDToday establece algún tipo de tasa de cambio. Todos los valores aquí presentes deben ser considerados como valores de referencia.</p>
          </div>
        </div>

        <div className="row">
          <footer>
            <div className='col-lg-6 col-md-6 visible-lg visible-md hidden-xs hidden-sm' style={{backgroundColor: "#1A5099", height: "48px", paddingTop: "13px"}}>
              <p style={{marginBottom: "0px"}}> <img src={require("./assets/calendario.png")} style={{height: "32px", width: "28px", transform: "translateY(-5px)"}} alt=""/> SBDToday 2017. Aplicación diseñada por Julio Fuenmayor. Todos los derechos reservados.</p>
            </div>
            <div className="col-lg-6 col-md-6 visible-lg visible-md hidden-xs hidden-sm" style={{backgroundColor: "#1A5099", height: "48px"}}>
                <p style={{textAlign: "right"}}>
                    <a href="https://jfuenmayor96.github.io" alt="Portafolio de Julio Fuenmayor"><i className="fa fa-2x fa-briefcase" aria-hidden="true"></i></a>
                    <a href="https://linkedin.com/in/jefuenmayor" alt="Linkedin de Julio Fuenmayor"><i className="fa fa-2x fa-linkedin-square" aria-hidden="true"></i></a>
                    <a href="https://github.com/jfuenmayor96" alt="Github de Julio Fuenmayor"><i className="fa fa-2x fa-github" aria-hidden="true"></i></a>
                </p>
            </div>
            <div className="col-sm-12 col-xs-12 visible-sm visible-xs hidden-lg hidden-md" style={{backgroundColor: "#1A5099"}}>
                <p style={{textAlign: "center"}}>
                    <a href="https://jfuenmayor96.github.io" alt="Portafolio de Julio Fuenmayor"><i className="fa fa-2x fa-briefcase" aria-hidden="true"></i></a>
                    <a href="https://linkedin.com/in/jefuenmayor" alt="Linkedin de Julio Fuenmayor"><i className="fa fa-2x fa-linkedin-square" aria-hidden="true"></i></a>
                    <a href="https://github.com/jfuenmayor96" alt="Github de Julio Fuenmayor"><i className="fa fa-2x fa-github" aria-hidden="true"></i></a>
                </p>
            </div>
            <div className='col-sm-12 col-xs-12 visible-sm visible-xs hidden-lg hidden-md' style={{textAlign: "center", backgroundColor: "#1A5099", height: "auto", paddingTop: "10px"}}>
              <p><img src={require("./assets/calendario.png")} style={{height: "32px", width: "28px", transform: "translateY(-5px)"}} alt=""/> SBDToday 2017. Aplicación diseñada y desarrollada por Julio Fuenmayor. Todos los derechos reservados.</p>
            </div>
          </footer>
        </div>
      </div>
    );
  }
}

export default App;
