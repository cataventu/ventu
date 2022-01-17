const ficha = {
  id: 1,
  id_projeto: 5,
  codigo: 'PRO - 2020',
  descricao: 'Descricao do projeto',
  fuso: 'TODO ROTEIRO ESTÁ - 2HRS DE BRASÍLIA',

  num_convidados: 40,
  num_coordenadores: 5,
  num_batedores: 0,
  num_motoristas: 1,
  num_interpretes: 2,

  voo_regs: [
    {
      descricao: 'Grupo 01',
      tableData: [
        {
          cia: 'AA',
          flight: '96201',
          date: '28/set',
          from: 'GRU',
          to: 'DFW',
          depart: '20:50',
          arrival: '05:20',
        },
        {
          cia: 'AA',
          flight: '96201',
          date: '28/set',
          from: 'GRU',
          to: 'DFW',
          depart: '20:50',
          arrival: '05:20',
        },
      ],
    },
    {
      descricao: 'Grupo 02',
      tableData: [
        {
          cia: 'AA',
          flight: '96201',
          date: '28/set',
          from: 'GRU',
          to: 'DFW',
          depart: '20:50',
          arrival: '05:20',
        },
        {
          cia: 'AA',
          flight: '96201',
          date: '28/set',
          from: 'GRU',
          to: 'DFW',
          depart: '20:50',
          arrival: '05:20',
        },
      ],
    },
  ],

  passageiros_tag_regs: [
    {
      tag: '01',
      nome_completo: 'PASCOAL AITA NETO',
      malas: '',
    },
    {
      tag: '02',
      nome_completo: 'CARLOS EDUARDO',
      malas: '',
    },
    {
      tag: '03',
      nome_completo: 'LUCAS PEDRO',
      malas: '',
    },
    {
      tag: '04',
      nome_completo: 'NICHOLE ABDALA',
      malas: '',
    },
    {
      tag: '05',
      nome_completo: 'DANILO CAMARGO',
      malas: '',
    },
    {
      tag: '06',
      nome_completo: 'LUCAS LIMA',
      malas: '',
    },
  ],

  passageiros_alfa_regs: [
    {
      tag: '02',
      nome_completo: 'CARLOS EDUARDO',
      malas: '',
    },
    {
      tag: '05',
      nome_completo: 'DANILO CAMARGO',
      malas: '',
    },
    {
      tag: '06',
      nome_completo: 'LUCAS LIMA',
      malas: '',
    },
    {
      tag: '03',
      nome_completo: 'LUCAS PEDRO',
      malas: '',
    },
    {
      tag: '04',
      nome_completo: 'NICHOLE ABDALA',
      malas: '',
    },
    {
      tag: '01',
      nome_completo: 'PASCOAL AITA NETO',
      malas: '',
    },
  ],

  birthdays: [
    {
      descricao: '13/11/2020',
      nome_completo: 'THAIS MACHADO',
    },
  ],

  allergies: [
    {
      descricao: 'Iodo',
      nome_completo: 'LUIS EDUARDO SALOMÃO GOMES',
    },
    {
      descricao: 'Camarão e frutos do mar',
      nome_completo: 'FABIO PRATA',
    },
  ],

  food_restrictions: [
    {
      descricao: 'Olmecor 40mg / Indapensr 1,5mg / Pressat 5mg',
      nome_completo: 'AIRTON FRANCISCO DE JESUS',
    },
    {
      descricao: 'Prezol 10mg/Colageno',
      nome_completo: 'FABIO PRATA',
    },
  ],

  medicines: [
    {
      descricao: 'Olmecor 40mg / Indapensr 1,5mg / Pressat 5mg',
      nome_completo: 'AIRTON FRANCISCO DE JESUS',
    },
    {
      descricao: 'Prezol 10mg/Colageno',
      nome_completo: 'FABIO PRATA',
    },
    {
      descricao: 'AS, Aradois, Resuvastatin',
      nome_completo: 'GLADIR TOMAZELLI',
    },
  ],

  elderly_young: [
    {
      descricao: '61 anos',
      nome_completo: 'HAMILTON GUTERRES JARDIM',
    },
    {
      descricao: '62 anos',
      nome_completo: 'CARLOS ERNESTO AUGUSTIN',
    },
    {
      descricao: '64 anos',
      nome_completo: 'CELITO MISSIO / SEISUKE ITO',
    },
  ],

  tempo_mov_regs: [
    {
      hora: '07:00',
      titulo: 'Despertar',
      categoria: '#F88',
      local: 'Texto local',
      descricao: 'Descrição do TM',
      destaque: 'Texto de destaque',
      servicos: true,
      servico_regs: [
        { id: 1, descricao: 'Serviço 1' },
        { id: 1, descricao: 'Serviço 2' },
        { id: 1, descricao: 'Serviço 3' },
      ],
      imagem: true,
    },
    {
      hora: '08:00',
      titulo: 'Café da manha',
      categoria: '#FFA',
      local: 'Texto local',
      descricao: 'Descrição do TM',
      destaque: '',
      servicos: true,
      servico_regs: [
        { id: 1, descricao: 'Serviço 1' },
        { id: 1, descricao: 'Serviço 2' },
        { id: 1, descricao: 'Serviço 3' },
      ],
      imagem: false,
    },
    {
      hora: '10:30',
      titulo: 'Viagem',
      categoria: '#A8F',
      local: 'Texto local',
      descricao: 'Descrição do TM',
      destaque: 'Texto de destaque',
      servicos: false,
      servico_regs: [],
      imagem: false,
    },
  ],

  contato_regs: [
    {
      pjuridica: 'VENTU VIAGENS E EVENTOS',
      endereco: 'Rua fradique coutinho, 212, cj 12 - Pinheiros, São Paulo - 05416-000',
      email: 'samuel@ventu.com.br',
      telefone: '55 (11) 3280-8076',
      obs: 'Linha de observação',
    },
    {
      pjuridica: 'VENTU VIAGENS E EVENTOS',
      endereco: 'Rua fradique coutinho, 212, cj 12 - Pinheiros, São Paulo - 05416-000',
      email: 'samuel@ventu.com.br',
      telefone: '55 (11) 3280-8076',
      obs: 'Linha de observação',
    },
  ],

  malas_regs: [
    {
      tag: '01',
      nome_completo: 'PASCOAL AITA NETO',
      malas: '',
    },
    {
      tag: '02',
      nome_completo: 'CARLOS EDUARDO',
      malas: '',
    },
    {
      tag: '03',
      nome_completo: 'LUCAS PEDRO',
      malas: '',
    },
    {
      tag: '04',
      nome_completo: 'NICHOLE ABDALA',
      malas: '',
    },
    {
      tag: '05',
      nome_completo: 'DANILO CAMARGO',
      malas: '',
    },
    {
      tag: '06',
      nome_completo: 'LUCAS LIMA',
      malas: '',
    },
  ],

  emergencia_regs: [
    {
      tag: '01',
      nome_completo: 'AIRTON FRANCISCO',
      nome: 'SONIA FÁTIMA',
      parentesco: 'ESPOSA',
      telefone: '(99) 99999-9999',
    },
    {
      tag: '01',
      nome_completo: 'AIRTON FRANCISCO',
      nome: 'SONIA FÁTIMA',
      parentesco: 'ESPOSA',
      telefone: '(99) 99999-9999',
    },
    {
      tag: '01',
      nome_completo: 'AIRTON FRANCISCO',
      nome: 'SONIA FÁTIMA',
      parentesco: 'ESPOSA',
      telefone: '(99) 99999-9999',
    },
  ],

  passaporte_regs: [
    {
      tag: '01',
      nome_completo: 'AIRTON FRANCISCO',
      passaporte: '123456-789',
      pais: 'BRASIL',
      dt_emissao: '12/11/2020',
      dt_validade: '12/11/2020',
    },
    {
      tag: '01',
      nome_completo: 'AIRTON FRANCISCO',
      passaporte: '123456-789',
      pais: 'BRASIL',
      dt_emissao: '12/11/2020',
      dt_validade: '12/11/2020',
    },
    {
      tag: '01',
      nome_completo: 'AIRTON FRANCISCO',
      passaporte: '123456-789',
      pais: 'BRASIL',
      dt_emissao: '12/11/2020',
      dt_validade: '12/11/2020',
    },
  ],

};

export default ficha;
