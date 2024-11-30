import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useUser, useRealm } from '@realm/react';
import { BSON } from "realm";
import CurrencyInput from 'react-native-currency-input';

import { Button } from "../components/Button";
import { GoBackHeader } from "../components/GoBackHeader";
import { WrappedTextInput } from "../components/WrappedTextInput";
import { WrappedCurrencyInput } from "../components/WrappedCurrencyInput";

export function Bill() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [dueDay, setDueDay] = useState(new Date().getDate());

  const user = useUser()
  const realm = useRealm();
  const { goBack } = useNavigation();

  const handleBill = () => {
    const bill = {
      userId: new BSON.ObjectId(user.id),
      name: name,
      description: description,
      dueDay: Number(dueDay),
      value: Number(value),
      type: ''
    }

    try {
      realm.write(() => {
        realm.create('Bill', {
          _id: new BSON.ObjectId(),
          userId: bill.userId,
          name: bill.name,
          value: bill.value,
          description: bill.description,
          dueDay: bill.dueDay,
          type: 'expense',
          paid: false,
        })
      })
    } catch (error) {
      console.log(error);
    } finally {
      goBack();
    }
  }

  return <>
    <GoBackHeader>Nova Conta</GoBackHeader>
    <View style={styles.wrapper}>
      <View style={styles.inputsWrapper}>
        <WrappedTextInput
          label="Nome"
          value={name}
          onChangeText={setName}
        />
        <WrappedCurrencyInput 
          label={"Valor"} 
          value={value} 
          onChangeValue={(text) => setValue(text)}
        />
        <WrappedTextInput
          label="Data de Vencimento"
          value={dueDay}
          onChangeText={setDueDay}
        />
      </View>

      <View>
        <Button onPress={() => handleBill()}>Adicionar</Button>
      </View>
    </View>
  </>
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 32,
    gap: 12
  },
  inputsWrapper: {
    flex: 1,
    gap: 12
  }
})