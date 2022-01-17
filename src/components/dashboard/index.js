import React, { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
// import { getDados } from '../../../../functions/sistema';
//  import { getPFisicaDashboard } from '../../../../functions/cadastro/pessoa-fisica'
//  import { dashboardListaData } from '../../../../redux/initials/cadastro/pfisica';

// import logo from './logo.svg';
// import './App.css';

async function App({props}) {
  const [firstLoad, setFirst] = useState(true);
  const [options, setOptions] = useState(''); // serie
  const [data, setData] = useState(''); // rotulo x valor
  const [dashboardListaData, set_dashboardListaData] = useState([]);
  // const [options, setOptions] = useState({
  //   title: 'Gráfico de Pizza'
  // })
  // const [data, setData] = useState([
  //   ['Linguagens', 'Quantidade'],
  //   ['React', 100],
  //   ['Angula', 80],
  //   ['Vue', 50],
  // ])

  // useEffect(() => {
   
  //     getDados(props, `/TsmPFISICA/DASHBOARD`, '@GET_PFISICA_DASHBOARD');
  //     console.log(getDados(props,`/TsmPFISICA/DASHBOARD`, '@GET_PFISICA_DASHBOARD'))
    
   
  //  }, [props]);

  useEffect(() => {
    const {retorno, pagina, serie_regs } = props.dashboardListaData;
   
      const _temp_serie_regs = [];
      const _temp_dashboard = [];
      const _temp_dado_regs = [];
   
      _temp_dashboard.push(
        <h6 className="text-dark">
          <b>
            {retorno}
            {' - '}
            {pagina}
          </b>
        </h6>,
      );
    
      serie_regs.forEach((item) => {
        _temp_serie_regs.push({
          // id: item.id,
          serie: item.serie,
          // grafico: item.grafico,
          // dado_regs:
        });
            item.dado_regs.forEach((item) => {
            _temp_dado_regs.push([
              // id: item.id,
             [item.rotulo, item.valor]
            ]);
      });
    });
      
      setOptions(_temp_serie_regs);
      setData(_temp_dado_regs);
 
     }, [props]);

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <div>
          <Chart
            width={'500px'}
            height={'300px'}
            chartType="PieChart"
            data={data}
            options={options}
          />
        </div>
      </header>
    </div>
  );
}

export default App;