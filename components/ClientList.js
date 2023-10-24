import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, Alert, RefreshControl } from "react-native";
import { useIsFocused } from "@react-navigation/native";

import { deleteClient, getClients } from "../services/clients";
import ClientItem from "./ClientItem";

const ClientList = ({ navigation }) => {
  const [clients, setClients] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const isFocused = useIsFocused();

  const getClientsFunc = async () => {
    try {
      const clients = await getClients();
      setClients(clients.data);
    } catch (error) {
    }
  };

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    // wait(2000).then(() => setRefreshing(false));
    await getUsers();
    setRefreshing(false);
  }, []);

  const handleDelete = (id) => {
    Alert.alert("Delete Client", "Are you sure you want to delete the client", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Ok",
        onPress: async () => {
          await deleteClient(id);
          await getClientsFunc();
        },
      },
    ]);
  };

  useEffect(() => {
    getClientsFunc();
  }, [isFocused]);

  const renderItem = ({ item }) => (
    <ClientItem client={item} handleDelete={handleDelete} />
  );

  return (
    <SafeAreaView style={{ flex: 1, width: "90%" }}>
      <FlatList
        data={clients}
        renderItem={renderItem}
        keyExtractor={(client) => client._id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#78e08f"]}
            progressBackgroundColor="#0a3d62"
          />
        }
      />
    </SafeAreaView>
  );
};

export default ClientList;