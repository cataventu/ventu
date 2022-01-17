import React from 'react';
import {
  Page, Document, View, Text, StyleSheet, Image,
} from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { backgroundColor: '#ffffff', fontSize: 9, padding: '25px 25px 25px 25px' },
  container: {
    display: 'flex', flexWrap: 'wrap', flexDirection: 'row', height: '94%',
  },
  col_esq: {
    width: '60%', alignSelf: 'flex-start', display: 'flex', flexDirection: 'column',
  },
  col_dir: {
    width: '40%', alignSelf: 'flex-start', display: 'flex', flexDirection: 'column-reverse',
  },

  header: {
    width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'baseline', padding: '16px 16px 16px 16px',
  },
  line: {
    width: '100%', height: '1px', backgroundColor: '#212121', marginBottom: '16px',
  },
  header_p1: {
    fontSize: 10, fontWeight: 'light', paddingRight: '4px', fontStyle: 'italic',
  },
  header_p2: { fontSize: 16, fontWeight: 'bold', paddingLeft: '4px' },

  logo: { width: '60px', height: 'auto' },
  footer: {
    backgroundColor: '#212121', color: '#FFF', width: '100%', height: '6%', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontSize: 6,
  },

  row_esq: {
    width: '100%', flexDirection: 'row', justifyContent: 'flex-start', padding: '6px 6px 6px 6px',
  },
  row_dir: {
    width: '100%', flexDirection: 'row', justifyContent: 'flex-end', padding: '6px 6px 6px 6px',
  },
  titulo: { fontWeight: 'bold', color: '#121212' },
  texto: { fontWeight: '200', color: '#898989', paddingLeft: '6px' },
});

export default function PdfDocument(props) {
  return (
    <Document>
      <Page style={styles.page}>

        <View style={styles.container}>

          <View style={styles.header}>
            <Text style={styles.header_p1}>Consulta</Text>
            <Text style={styles.header_p2}>Municipio</Text>

          </View>
          <View style={styles.line} />

          <View style={styles.col_esq}>
            <View style={styles.row_esq}>
              <Text style={styles.titulo}>Pais:</Text>
              <Text style={styles.texto}>{ props.data.pais }</Text>
            </View>

            <View style={styles.row_esq}>
              <Text style={styles.titulo}>Municipio:</Text>
              <Text style={styles.texto}>{ props.data.municipio }</Text>
            </View>

            <View style={styles.row_esq}>
              <Text style={styles.titulo}>UF:</Text>
              <Text style={styles.texto}>{ props.data.uf }</Text>
            </View>

            <View style={styles.row_esq}>
              <Text style={styles.titulo}>IBGE:</Text>
              <Text style={styles.texto}>{ props.data.ibge }</Text>
            </View>

            <View style={styles.row_esq}>
              <Text style={styles.titulo}>DDD:</Text>
              <Text style={styles.texto}>{ props.data.ddd }</Text>
            </View>
          </View>

          <View style={styles.col_dir}>

            <View style={styles.row_dir}>
              <Text style={styles.titulo}>Id:</Text>
              <Text style={styles.texto}>{ props.data.id }</Text>
            </View>

            <View style={styles.row_dir}>
              <Text style={styles.titulo}>Situação:</Text>
              <Text style={styles.texto}>{ props.data.situacao }</Text>
            </View>

            <View style={styles.row_dir}>
              <Text style={styles.titulo}>Inclusão:</Text>
              <Text style={styles.texto}>{ props.data.inc_dhsis }</Text>
            </View>

            <View style={styles.row_dir}>
              <Text style={styles.titulo}>Atualização:</Text>
              <Text style={styles.texto}>{ props.data.alt_dhsis }</Text>
            </View>

          </View>

        </View>

        <View style={styles.footer}>
          <Image source="logo.png" style={styles.logo} />
          <Text>Rua Fradique Coutinho, 212</Text>
          <Text>Cj. 12 – Pinheiros – São Paulo/SP</Text>
          <Text>Tel.: +55 11 3280-8076</Text>
        </View>

      </Page>
    </Document>
  );
}
