import React, { useEffect, useState } from 'react';
import {FlatList, SectionList, StyleSheet, Text, View} from 'react-native';
import {useQuery, useUser} from '@realm/react';

import {Title} from '../components/Title';
import {BillItem} from '../components/BillItem';
import {AddBillButton} from '../components/AddBillButton';
import {UserHeader} from '../components/UserHeader';

export function Home() {
  const user = useUser();
  const [filtredBills, setFiltredBills] = useState([])
  const bills = useQuery('Bill').filter(bill => bill.userId == user.id);

  useEffect(() => {
    const paid = bills.filter(bill => bill.paid); 
    const notPaid = bills.filter(bill => !bill.paid);

    setFiltredBills(
      [
        {title: 'Não Pago', data: notPaid},
        {title: 'Pago', data: paid}
      ]
    )
  }, [bills])


  return (
    <>
      <UserHeader />
      <View style={styles.content}>
        <AddBillButton />
        {/* <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
          data={bills}
          ListHeaderComponent={() => <Title>Contas do Mês</Title>}
          stickyHeaderIndices={[0]}
          renderItem={({item}) => <BillItem item={item} />}
        /> */}
        <SectionList 
          sections={filtredBills}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
          renderSectionHeader={({section: {title}}) => (
            <Title>{title}</Title>
          )}        
          renderItem={({item}) => <BillItem item={item} />}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 32,
    paddingBottom: 0,
    gap: 32,
    flex: 1,
  },
  flatListContent: {
    gap: 12,
    paddingBottom: 32,
    flexGrow: 1,
    overflow: 'scroll',
  },
});
