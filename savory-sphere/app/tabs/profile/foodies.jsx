import { Text, View, StyleSheet, ScrollView, TouchableOpacity, FlatList, TextInput } from "react-native";
import Constants from 'expo-constants';
import { COLORS } from "../../../src/utils/constants";
import { Ionicons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { Image } from 'expo-image'
import { useEffect, useState } from "react";

const FoodiesPage = () => {
    const [search, setSearch] = useState('');
    const foodies = useSelector((state) => state.user.foodies);
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={{ paddingHorizontal: 24, fontSize: 28, color: 'white', fontWeight: 'bold' }}>Foodies</Text>
                <View style={{ paddingHorizontal: 24, marginTop: 10 }}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="ios-notifications" size={18} color="white" style={{ marginRight: 10 }} />
                        <Text style={{ fontSize: 18, color: 'white', paddingVertical: 4 }}>0 Pending Requests</Text>
                    </TouchableOpacity>
                    <View style={{ width: '100%', height: 1, borderBottomWidth: 0.2, borderColor: 'white', marginVertical: 4 }}></View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Ionicons name="ios-person-add" size={18} color="white" style={{ marginRight: 10 }} />
                        <TextInput style={{ fontSize: 18, color: 'white', paddingVertical: 4 }} placeholder="Add Foodies" placeholderTextColor={'white'} onChangeText={setSearch}/>
                    </View>
                    {
                        search && search.length > 3 ? (
                            <View style={{alignItems:'center'}}>
                                {/* <View style={{ width: '70%', height: 1, borderBottomWidth: 0.2, borderColor: 'white', marginVertical: 4 }}></View> */}
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    {/* <Ionicons name="ios-person-add" size={18} color="white" style={{ marginRight: 10 }} /> */}
                                    <Text style={{textAlign: 'center', fontSize: 18, color: 'white', paddingVertical: 4 }}>No results found.</Text>
                                </View>
                            </View>
                        ) : <></>
                    }
                </View>
            </View>
            <FlatList contentContainerStyle={{ padding: 24, }}
                renderItem={({ item, index }) => {
                    return (
                        <View style={{ flexDirection: 'row', alignItems: 'center' }} key={index}>
                            <Image style={{ width: 30, height: 30, borderRadius: 15, marginRight: 16 }} source={{ uri: item.url }} />
                            <Text style={{ fontSize: 18 }}>{item.name}</Text>
                        </View>
                    )
                }}
                data={foodies}
                ItemSeparatorComponent={() => <View style={{ width: '100%', height: 1, borderBottomWidth: 0.2, borderColor: 'black', marginVertical: 4 }}></View>}
            />
        </View>
    );
}

export default FoodiesPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingTop: Constants.statusBarHeight + 20,
        backgroundColor: COLORS.PRIMARY,
        paddingBottom: 20,
        // borderBottomLeftRadius: 10,
        // borderBottomRightRadius: 10,
    }
});
