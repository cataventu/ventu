/////////// IMPORTS ///////////////
/////////////////////////////////
import React, { useState, useEffect } from 'react';
import {
  Card, Container,  Table } from 'reactstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  PageTitle, ConsultaHeader, ConsultaFooter, } from '../../../../components';
import { getPJuridicaDashboard } from '../../../../functions/cadastro/pessoa-juridica';
import { Pie, Chart } from 'react-chartjs-2';

function Dashboard(props) {
  const [firstLoad, setFirstLoad] = useState(true);
  const [tbody, setTbody] = useState([]);
  
  const [rotulos1, setRotulos1] = useState([]);
  const [dados1, setDados1] = useState([]);
  const [serie1, setSerie1] = useState([]);
 

  const [rotulos2, setRotulos2] = useState([]);
  const [dados2, setDados2] = useState([]);
  const [serie2, setSerie2] = useState([]);

  const [rotulos3, setRotulos3] = useState([]);
  const [dados3, setDados3] = useState([]);
  const [serie3, setSerie3] = useState([]);

  const [rotulos4, setRotulos4] = useState([]);
  const [dados4, setDados4] = useState([]);
  const [serie4, setSerie4] = useState([]);

  const [rotulos5, setRotulos5] = useState([]);
  const [dados5, setDados5] = useState([]);
  const [serie5, setSerie5] = useState([]);

   
  const data1 = {
    labels: rotulos1,
   
    // rotulos.map(item => (
    //   item
    // )),

    datasets: [
      {
       
        data: dados1,
        // dados.map(item => (
        //   item
        // )),

        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 99, 132, 0.2)',
         
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          
          'rgba(144, 20, 32, 0.2)',
          'rgba(23, 162, 235, 0.2)',
          'rgba(55, 206, 86, 0.2)',
          'rgba(33, 9, 2, 0.2)',
          'rgba(78, 102, 255, 0.2)',
          'rgba(88, 9, 64, 0.2)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(255, 99, 132, 1)',
         
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
      
          'rgba(144, 20, 99, 0.2)',
          'rgba(23, 162, 248, 0.2)',
          'rgba(1, 206, 99, 0.2)',
          'rgba(255, 99, 132, 1)',
          'rgba(78, 102, 200, 0.2)',
          'rgba(88, 1, 64, 0.2)',
        ],
        borderWidth: 1,
                },
              ],

              
  
  };

  const data2 = {
    labels: rotulos2,
  
    // rotulos.map(item => (
    //   item
    // )),

    datasets: [
      {
        data: dados2,
        // dados.map(item => (
        //   item
        // )),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          
          'rgba(144, 20, 32, 0.2)',
          'rgba(23, 162, 235, 0.2)',
          'rgba(55, 206, 86, 0.2)',
          'rgba(33, 9, 2, 0.2)',
          'rgba(78, 102, 255, 0.2)',
          'rgba(88, 9, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
      
          'rgba(144, 20, 99, 0.2)',
          'rgba(23, 162, 248, 0.2)',
          'rgba(1, 206, 99, 0.2)',
          'rgba(255, 99, 132, 1)',
          'rgba(78, 102, 200, 0.2)',
          'rgba(88, 1, 64, 0.2)',
        ],
        borderWidth: 1,
                },
              ],
  
  };

  const data3 = {
    labels: rotulos3,
  
    // rotulos.map(item => (
    //   item
    // )),

    datasets: [
      {
        data: dados3,
        // dados.map(item => (
        //   item
        // )),

        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          
          'rgba(144, 20, 32, 0.2)',
          'rgba(23, 162, 235, 0.2)',
          'rgba(55, 206, 86, 0.2)',
          'rgba(33, 9, 2, 0.2)',
          'rgba(78, 102, 255, 0.2)',
          'rgba(88, 9, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
      
          'rgba(144, 20, 99, 0.2)',
          'rgba(23, 162, 248, 0.2)',
          'rgba(1, 206, 99, 0.2)',
          'rgba(255, 99, 132, 1)',
          'rgba(78, 102, 200, 0.2)',
          'rgba(88, 1, 64, 0.2)',
        ],
        borderWidth: 1,
                },
              ],
  
  };

  const data4 = {
    labels: rotulos4,
  
    // rotulos.map(item => (
    //   item
    // )),

    datasets: [
      {
        data: dados4,
        // dados.map(item => (
        //   item
        // )),

        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          
          'rgba(144, 20, 32, 0.2)',
          'rgba(23, 162, 235, 0.2)',
          'rgba(55, 206, 86, 0.2)',
          'rgba(33, 9, 2, 0.2)',
          'rgba(78, 102, 255, 0.2)',
          'rgba(88, 9, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
      
          'rgba(144, 20, 99, 0.2)',
          'rgba(23, 162, 248, 0.2)',
          'rgba(1, 206, 99, 0.2)',
          'rgba(255, 99, 132, 1)',
          'rgba(78, 102, 200, 0.2)',
          'rgba(88, 1, 64, 0.2)',
        ],
        borderWidth: 1,
                },
              ],
  
  };

  const data5 = {
    labels: rotulos5,
  
    // rotulos.map(item => (
    //   item
    // )),

    datasets: [
      {
        
        data: dados5,
        // dados.map(item => (
        //   item
        // )),

        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          
          'rgba(144, 20, 32, 0.2)',
          'rgba(23, 162, 235, 0.2)',
          'rgba(55, 206, 86, 0.2)',
          'rgba(33, 9, 2, 0.2)',
          'rgba(78, 102, 255, 0.2)',
          'rgba(88, 9, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
      
          'rgba(144, 20, 99, 0.2)',
          'rgba(23, 162, 248, 0.2)',
          'rgba(1, 206, 99, 0.2)',
          'rgba(255, 99, 132, 1)',
          'rgba(78, 102, 200, 0.2)',
          'rgba(88, 1, 64, 0.2)',
        ],
        borderWidth: 1,
                },
              ],
  
  };

  const options = {
    maintainAspectRatio: false,
    legend: {
      display: true,
      position: "bottom", 
     },
  };

  //////// PAGINA ////////

  useEffect(() => {
    if (firstLoad) {
      getPJuridicaDashboard(props);
   }
  setFirstLoad(false);
  }, [props, firstLoad]);

  useEffect(() => {
   
    const _temp_serie1 = [];
    const _temp_labels1 = [];
    const _temp_valor1 = [];

    const _temp_serie2 = [];
    const _temp_labels2 = [];
    const _temp_valor2 = [];

    const _temp_serie3 = [];
    const _temp_labels3 = [];
    const _temp_valor3 = [];

    const _temp_serie4 = [];
    const _temp_labels4 = [];
    const _temp_valor4 = [];

    const _temp_serie5 = [];
    const _temp_labels5 = [];
    const _temp_valor5 = [];

    const { serie_regs } = props.dashboardListaData;
  
    if (serie_regs.length > 0) {
      serie_regs.forEach((item) => {
        const {
          id, serie, dado_regs,
        } = item;
      
        if(id === 1){
        _temp_serie1.push( item.serie );

        dado_regs.forEach((item) => {
          const { id, rotulo, valor} = item;
       
          _temp_labels1.push(item.rotulo)
          _temp_valor1.push(item.valor)
          
          setSerie1(_temp_serie1);
          setRotulos1(_temp_labels1);
          setDados1(_temp_valor1);
        });
    } 
    if(id === 2){
      _temp_serie2.push( item.serie );

      dado_regs.forEach((item) => {
        const { id, rotulo, valor} = item;
    
        _temp_labels2.push(item.rotulo)
        _temp_valor2.push(item.valor)
     
        setSerie2(_temp_serie2);
        setRotulos2(_temp_labels2);
        setDados2(_temp_valor2);
      });
  } 

  if(id === 3){
    _temp_serie3.push( item.serie );

    dado_regs.forEach((item) => {
      const { id, rotulo, valor} = item;
   
      _temp_labels3.push(item.rotulo)
      _temp_valor3.push(item.valor)
      
 
      setSerie3(_temp_serie3);
      setRotulos3(_temp_labels3);
      setDados3(_temp_valor3);
    });
} 

if(id === 4){
  _temp_serie4.push( item.serie );

  dado_regs.forEach((item) => {
    const { id, rotulo, valor} = item;
 
    _temp_labels4.push([item.rotulo])
    _temp_valor4.push([item.valor])
   
    setSerie4(_temp_serie4);
    setRotulos4(_temp_labels4);
    setDados4(_temp_valor4);
  });
} 
if(id === 5){
  _temp_serie5.push( item.serie );

  dado_regs.forEach((item) => {
    const { id, rotulo, valor} = item;
 
    _temp_labels5.push(item.rotulo)
    _temp_valor5.push(item.valor)
    
    setSerie5(_temp_serie5);
    setRotulos5(_temp_labels5);
    setDados5(_temp_valor5);
  });
} 
  });
  }
    
   
    }, [props, props.dashboardListaData]);
   
  return (
    <>
      <Container fluid className="p-0 ">
        <PageTitle
          history={props.history}
       
          title="Dashboard"
          subtitle="/ Pessoa Jurídica"
          voltar
          linkTo="/cadastro/pessoa-juridica"
        />
      <Card id="dashboard-pjuridica" className={`p-3 filter `}>
          <ConsultaHeader titulo={`Dashboard ${props.dashboardListaData.pagina}`} />
   
        <div className="py-3">
           <p className="h3 p-0 m-0 text-roxo-ventu center"> {serie1} </p>
            <p> 
            <div className="chart chart-lg">
                <Pie data={data1} options={options} />
              </div>
            </p>
        </div>

        <div className="py-3">
        <p className="h3 p-0 m-0 text-roxo-ventu"> {serie2}</p>
            <p> 
            <div className="chart chart-lg">
                <Pie data={data2} options={options} />
              </div>
            </p>
        </div>

        {/* <div className="py-3">
        <p className="h3 p-0 m-0 text-roxo-ventu"> {serie3}</p>
            <p> 
            <div className="chart chart-lg">
                <Pie data={data3} options={options} />
              </div>
            </p>
        </div> */}

        {/* <div className="py-3 d-print-pagebreak">
        <p className="h3 p-0 m-0 text-roxo-ventu"> {serie4}</p>
            <p> 
            <div className="chart chart-lg">
                <Pie data={data4} options={options} />
              </div>
            </p>
        </div> */}
        
        {/* <div className="py-3  d-print-pagebreak">
        <p className="h3 p-0 m-0 text-roxo-ventu"> {serie5}</p>
            <p> 
            <div className="chart chart-lg">
                <Pie data={data5} options={options} />
              </div>
            </p>
        </div> */}
          <ConsultaFooter />
              </Card>
            </Container>
          </>
        );
}

///////// REDUX /////////////////
/////////////////////////////////
const mapState = (state) => ({
 auth: state.sistema.auth,
 serie: state.pJuridica.dashboardListaData,
 rotulo: state.pJuridica.dashboardListaData,
 valor: state.pJuridica.dashboardListaData,
 dado_regs: state.pJuridica.dashboardListaData,
 serie_regs: state.pJuridica.dashboardListaData,
 pagina: state.pJuridica.dashboardListaData,
 dashboardListaData: state.pJuridica.dashboardListaData,

  visibilityPageCadastro: state.usuario.visibilityPageCadastro,
});
export default connect(() => (mapState))(Dashboard);