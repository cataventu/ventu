///////// IMPORTS ///////////////
/////////////////////////////////
import React, { useEffect, useState } from 'react';
import {
  DossieTitulo, DossieLinha, DossieGroupSpecsItem,
} from '../../components';

const GroupSpecs = ({ dados }) => {
  const [birthdays, set_birthdays] = useState([]);
  const [allergies, set_allergies] = useState([]);
  const [food_restrictions, set_food_restrictions] = useState([]);
  const [medicines, set_medicines] = useState([]);
  const [elderly_young, set_elderly_young] = useState([]);

  useEffect(() => {
    if (dados !== undefined) {
      const {
        birthdays,
        allergies,
        food_restrictions,
        medicines,
        elderly_young,
      } = dados;

      set_birthdays(birthdays);
      set_allergies(allergies);
      set_food_restrictions(food_restrictions);
      set_medicines(medicines);
      set_elderly_young(elderly_young);
    }
  }, [dados]);

  return (
    <>
      <DossieTitulo titulo="Group Specs" />
      <DossieLinha position="left">
        <DossieGroupSpecsItem titulo="Birthdays" conteudo={birthdays} />
        <DossieGroupSpecsItem titulo="Allergies" conteudo={allergies} />
        <DossieGroupSpecsItem titulo="Food Restrictions" conteudo={food_restrictions} />
        <DossieGroupSpecsItem titulo="Medicines" conteudo={medicines} />
        <DossieGroupSpecsItem titulo="Elderly and super young" conteudo={elderly_young} />
      </DossieLinha>
    </>
  );
};

export default GroupSpecs;
