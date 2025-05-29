import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';

 type DropdownComponentProps = {
  name: string;
  data: Array<{ "codigo": number, "nome": string }>;
  fetch?: () => Promise<void> | void;
  onChange?: (item: { codigo: number; nome: string }) => void;
 }



const DropdownComponent = ({name, data, fetch, onChange}: DropdownComponentProps) => {
  const [value, setValue] = useState(null);

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      data={data}
      onFocus={() => {
        if (fetch) {
          fetch();
        }
      }}
      search
      maxHeight={300}
      labelField="nome"
      valueField="codigo"
      placeholder={name}
      searchPlaceholder="Search..."
      value={value}
      onChange={item => {
        setValue(item.codigo);
        if(onChange) onChange(item)
      }}
      
    />
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    flex: 1
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});