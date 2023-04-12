import { View, Text, SafeAreaView, Image } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Avatar } from '../assets';

const Discover = () => {

    const navigation = useNavigation();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    return (
        <SafeAreaView className="flex-1 bg-white relative">
            <View className="flex-row items-center justify-between px-8 mt-6">
                <View>
                    <Text className="text-[40px] text-[#0B646B] font-bold">Discover</Text>
                    <Text className="text-[#5272B3] text-[36px]">the beauty today</Text>
                </View>

                <View className="w-12 h-12 bg-gray-400 rounded-md items-center justify-center shadow-lg">
                    <Image
                        source={Avatar}
                        className="w-full h-full rounded-sm object-cover"
                    />
                </View>
            </View>

            <View className="flex-row items-center bg-white mx-4 rounded-xl py-1 px-4 shadow-lg mt-4">
                <GooglePlacesAutocomplete
                    GooglePlacesDetailsQuery={{ fields: "geometry" }}
                    placeholder="Search"
                    fetchDetails={true}
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        console.log(details?.geometry?.viewport);
                        // setBl_lat(details?.geometry?.viewport?.southwest?.lat);
                        // setBl_lng(details?.geometry?.viewport?.southwest?.lng);
                        // setTr_lat(details?.geometry?.viewport?.northeast?.lat);
                        // setTr_lng(details?.geometry?.viewport?.northeast?.lng);
                    }}
                    query={{
                        key: "AIzaSyAzT-e099XurjpS7q9uV3pnXO-PR0NcnvM",
                        language: 'en',
                    }}
                />
            </View>
        </SafeAreaView>
    )
}

export default Discover