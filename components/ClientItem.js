import React from "react";
import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const ClientItem = ({ client, handleDelete }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        onPress={() => navigation.navigate("ClientFormScreen", { id: client._id })}
      >
        <Text style={styles.itemTitle}>{`${client.firstName} ${client.lastName}`}</Text>
        <Text style={styles.itemTitle}>{`${client.dni}`}</Text>
        <Text style={{ color: "#ce0058" }}>{client.email}</Text>
        <Text style={{ color: "#ce0058" }}>{client.phone}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ backgroundColor: "#ce0058", padding: 7, borderRadius: 5 }}
        onPress={() => handleDelete(client._id)}
      >
        <Text style={{ color: "#fff" }}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: "#ffa300",
    padding: 20,
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 5,
  },
  itemTitle: {
    color: "#ffffff",
    fontSize: 24,
    fontFamily: "Amor Sans Pro",
    fontWeight: "bold",
  },
});
export default ClientItem;