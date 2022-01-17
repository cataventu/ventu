import { Pie, Chart, Bar } from 'react-chartjs-2';


///////// IMPORTS ///////////////
/////////////////////////////////

import React, { useState, useEffect } from 'react';
import {
  Card,Container, Table, Label } from 'reactstrap';
import { connect } from 'react-redux';

import {
  PageTitle, ConsultaHeader, ConsultaFooter } from '../../../../components';
import { getMovimentoDashboard } from '../../../../functions/financeiro/movimento';


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
    datasets: [
      {
        label: serie1,
        data: dados1,
  //                   backgroundColor: [
  //                   '#567847',
  //                   '#d2f2a1',
  //                   '#99ca95',
  //                   '#2a723b',
  //                   '#2e3d32',
  //                   '#3cb371',
  //                   '#548B54',
  //                   '#3cb000',
  //                   '#7FFFD4',
  //                   '#50c878',
  //                   '#66cdaa',
  //                   '#32cd32',
                   
  //               ],
  //                 borderColor: 'transparent',
  //               },
  //             ],
              
  
  // };
  backgroundColor: [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    
    'rgba(144, 20, 32, 0.2)',
    'rgba(23, 162, 235, 0.2)',
    'rgba(2, 206, 86, 0.2)',
    'rgba(199, 192, 192, 0.2)',
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
    'rgba(199, 259, 100, 0.2)',
    'rgba(78, 102, 200, 0.2)',
    'rgba(88, 1, 64, 0.2)',
  ],
  borderWidth: 1,
},
],
};

  const data2 = {
    labels: rotulos2,
      datasets: [
      {  

        data: dados2,
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
     datasets: [
      {
        data: dados3,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          
          'rgba(144, 20, 32, 0.2)',
          'rgba(23, 162, 235, 0.2)',
          'rgba(2, 206, 86, 0.2)',
          'rgba(199, 192, 192, 0.2)',
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
          'rgba(199, 259, 100, 0.2)',
          'rgba(78, 102, 200, 0.2)',
          'rgba(88, 1, 64, 0.2)',
        ],
        borderWidth: 1,
      },
      ],
      };
     
  const data4 = {
    labels: rotulos4,
     datasets: [
      {
        data: dados4,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          
          'rgba(144, 20, 32, 0.2)',
          'rgba(23, 162, 235, 0.2)',
          'rgba(2, 206, 86, 0.2)',
          'rgba(199, 192, 192, 0.2)',
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
          'rgba(199, 259, 100, 0.2)',
          'rgba(78, 102, 200, 0.2)',
          'rgba(88, 1, 64, 0.2)',
        ],
        borderWidth: 1,
      },
      ],
      };
  const data5 = {
    labels: rotulos5,
      datasets: [
      {
        data: dados5,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          
          'rgba(144, 20, 32, 0.2)',
          'rgba(23, 162, 235, 0.2)',
          'rgba(2, 206, 86, 0.2)',
          'rgba(199, 192, 192, 0.2)',
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
          'rgba(199, 259, 100, 0.2)',
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

  // const Label = ({ data2}) => {
  //   return data2.map((slice, index) =>{
  //     const {pieCentroid, data2} = slice;
  //       return(
  //         <Text 
  //         key={`label-${index}`}
  //         x={pieCentroid[0]}
  //         y={pieCentroid[1]}
  //         fill="black"
  //         textAnchor={'midlle'}
  //         alignmentBaseLine={'midlle'}
  //         fontSize={22}
  //         >
  //           {dados2}
  //         </Text>
  //       )
  //   })
  // };

  //////// PAGINA ////////
 

  useEffect(() => {
    if (firstLoad) {
      getMovimentoDashboard(props);
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
          subtitle="/ Movimento"
          voltar
          linkTo="/financeiro/movimento"
        />
      <Card id="dashboard-movimento" className={`p-3 filter `}>
          <ConsultaHeader titulo={`Dashboard ${props.dashboardListaData.pagina}`} />
      
        <Table size="sm" striped className="mb-3" border="1">
          <thead>
            {tbody}
          </thead>
        </Table>
  
  <div className="py-3">
     <p className="h3 p-0 m-0 text-roxo-ventu center"> {serie1} </p>
      <p> 
       <div className="chart chart-lg">
          <Bar data={data1} options={options}/>
        </div>
      </p>
  </div>
  <div className="py-3">
  <p className="h3 p-0 m-0 text-roxo-ventu"> {serie2}</p>
      <p> 
       <div className="chart chart-lg">
          <Pie data={data2} options={options}>
            <Label />
            </Pie>
        </div>
      </p>
  </div>
  <div className="py-3">
  <p className="h3 p-0 m-0 text-roxo-ventu"> {serie3}</p>
      <p> 
       <div className="chart chart-lg">
          <Pie data={
            data3
           } options={options} />
        </div>
      </p>
  </div>
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
 serie: state.movimento.dashboardListaData,
 rotulo: state.movimento.dashboardListaData,
 valor: state.movimento.dashboardListaData,
 dado_regs: state.movimento.dashboardListaData,
 serie_regs: state.movimento.dashboardListaData,
 pagina: state.movimento.dashboardListaData,
 dashboardListaData: state.movimento.dashboardListaData,

  visibilityPageFinanceiro: state.usuario.visibilityPageFinanceiro,
});
export default connect(() => (mapState))(Dashboard);