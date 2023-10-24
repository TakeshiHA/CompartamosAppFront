import React, {useEffect, useState} from 'react';
import {
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';
import {getCities} from '../services/cities';
import {saveClient, getClient, updateClient} from '../services/clients';
import Layout from '../components/Layout';
import {Picker} from '@react-native-picker/picker';

const ClientFormScreen = ({navigation, route}) => {
  const [client, setClient] = useState({
    dni: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    cityId: '',
  });
  const [cities, setCities] = useState([]);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    getCitiesFunc();
    handleClientUpdate();
  }, []);

  const handleClientUpdate = async () => {
    if (route.params && route.params.id) {
      setEditing(true);
      navigation.setOptions({headerTitle: 'Updating Task'});
      await getClientFunc();
    }
  };

  const getCitiesFunc = async () => {
    const response = await getCities();
    setCities(response.data);
  };

  const getClientFunc = async () => {
    const response = await getClient(route.params.id);
    setClient(prevClient => ({
      ...prevClient,
      ...response.data,
    }));
  };

  const renderCities = () => {
    return cities.map(city => {
      return <Picker.item key={city._id} label={city.name} value={city._id}/>;
    });
  };

  const handleSubmit = async () => {
    try {
      if (!editing) {
        const response = await saveClient(client);

        if (response.ok) {
          navigation.navigate('HomeScreen');
          setEditing(false);
        } else {
          Alert.alert('Error', response.data.message);
        }
      } else {
        const response = await updateClient(route.params.id, {...client});

        if (response.ok) {
          navigation.navigate('HomeScreen');
          setEditing(false);
        } else {
          Alert.alert('Error', response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (name, value) => setClient({...client, [name]: value});

  return (
    <Layout>
      <TextInput
        style={styles.input}
        placeholder="DNI"
        keyboardType="numeric"
        placeholderTextColor="#000000"
        place
        value={client.dni}
        onChangeText={text => {
          // Validar que solo se permitan números y que la longitud sea 8
          if (/^\d{0,8}$/.test(text)) {
            handleChange('dni', text);
          }
        }}
      />

      <TextInput
        style={styles.input}
        placeholder="Nombres"
        placeholderTextColor="#000000"
        value={client.firstName}
        onChangeText={text => handleChange('firstName', text.toUpperCase())}
      />

      <TextInput
        style={styles.input}
        placeholder="Apellidos"
        placeholderTextColor="#000000"
        value={client.lastName}
        onChangeText={text => handleChange('lastName', text.toUpperCase())}
      />

      <TextInput
        style={styles.input}
        placeholder="Correo"
        placeholderTextColor="#000000"
        value={client.email}
        onChangeText={text => handleChange('email', text)}
      />

      <TextInput
        style={styles.input}
        placeholder="Teléfono"
        placeholderTextColor="#000000"
        value={client.phone}
        onChangeText={text => {
          // Validar que solo se permitan números y que la longitud sea 8
          if (/^\d{0,9}$/.test(text)) {
            handleChange('phone', text);
          }
        }}
      />

      <Picker
        placeholder="Selecciona una ciudad"
        selectedValue={client.cityId}
        style={styles.picker}
        onValueChange={itemValue => handleChange('cityId', itemValue)}>
        {renderCities()}
      </Picker>

      {!editing ? (
        <TouchableOpacity style={styles.buttonSave} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Save Client</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.buttonUpdate} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Update Client</Text>
        </TouchableOpacity>
      )}
    </Layout>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '90%',
    marginBottom: 7,
    fontSize: 14,
    borderWidth: 1,
    borderColor: '#e58e26',
    height: 30,
    color: '#ce0058Naomy',
    textAlign: 'center',
    padding: 4,
    borderRadius: 5,
  },
  picker: {
    width: '90%',
    marginBottom: 7,
    fontSize: 14,
    borderWidth: 1,
    color: '#ffffff',
    fontWeight:"bold",
    textAlign: 'center',
    borderRadius: 20,
    backgroundColor: '#e58e26', // Cambia el color de fondo según tu preferencia
    padding: 4, // Ajusta el relleno según lo necesites
  },
  buttonSave: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 3,
    color: '#ffffff',
    fontWeight:"bold",
    backgroundColor: '#e58e26',
    width: '90%',
  },
  buttonUpdate: {
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5,
    marginBottom: 3,
    backgroundColor: '#e58e26',
    width: '90%',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default ClientFormScreen;
