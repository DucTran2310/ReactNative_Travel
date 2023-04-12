import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Attractions, Avatar, Hotels, NotFound, Restaurants } from '../assets';
import { API_KEY } from '@env'
import MenuContainer from '../components/MenuContainer';
import ItemCardContainer from '../components/ItemCardContainer';
import { getPlacesData } from '../api';


const Discover = () => {

    const navigation = useNavigation();

    const [type, setType] = useState("restaurant");
    const [isLoading, setIsLoading] = useState(false);
    const [mainData, setMainData] = useState([]);
    const [bl_lat, setBl_lat] = useState(null);
    const [bl_lng, setBl_lng] = useState(null);
    const [tr_lat, setTr_lat] = useState(null);
    const [tr_lng, setTr_lng] = useState(null);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, []);

    useEffect(() => {
        setIsLoading(true);
        getPlacesData(bl_lat, bl_lng, tr_lat, tr_lng, type).then((data) => {
            setMainData(data);
            setInterval(() => {
                setIsLoading(false)
            }, 2000);
        })
    }, [bl_lat, bl_lng, tr_lat, tr_lng, type])

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

            <View className="flex-row items-center bg-white mx-4 rounded-xl py-1 px-4 shadow-lg mt-4 ">
                <GooglePlacesAutocomplete
                    GooglePlacesDetailsQuery={{ fields: "geometry" }}
                    placeholder="Search"
                    fetchDetails={true}
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        console.log(details?.geometry?.viewport);
                        setBl_lat(details?.geometry?.viewport?.southwest?.lat);
                        setBl_lng(details?.geometry?.viewport?.southwest?.lng);
                        setTr_lat(details?.geometry?.viewport?.northeast?.lat);
                        setTr_lng(details?.geometry?.viewport?.northeast?.lng);
                    }}
                    query={{
                        key: process.env['API_KEY'],
                        language: 'en',
                    }}
                />
            </View>

            {/* Menu container */}
            {
                isLoading ?
                    <View>
                        <ActivityIndicator size="large" color="#00ff00" />
                    </View>
                    :
                    <ScrollView>
                        <View className="flex-row items-center justify-between px-8 mt-8">
                            <MenuContainer
                                key={"hotel"}
                                title="Hotels"
                                imageSrc={Hotels}
                                type={type}
                                setType={setType}
                            />
                            <MenuContainer
                                key={"attractions"}
                                title="Attractions"
                                imageSrc={Attractions}
                                type={type}
                                setType={setType}
                            />
                            <MenuContainer
                                key={"restaurant"}
                                title="Restaurant"
                                imageSrc={Restaurants}
                                type={type}
                                setType={setType}
                            />
                        </View>

                        <View>
                            <View className="flex-row items-center justify-between px-4 mt-8">
                                <Text className="text-[#2c7379] text-[20px] font-bold">
                                    Top Tips
                                </Text>
                                <TouchableOpacity className="flex-row items-center justify-center space-x-2">
                                    <Text className="text-[#A0C4C7] text-[20px] font-bold">
                                        Explore
                                    </Text>
                                    <FontAwesome name="long-arrow-right" size={24} color="#A0C4C7" />
                                </TouchableOpacity>
                            </View>

                            <View className="px-2 mt-8 flex-row items-center justify-evenly flex-wrap">
                                {mainData?.length > 0 ?
                                    (
                                        <>
                                            {
                                                mainData?.map((data, index) => (
                                                    <ItemCardContainer
                                                        key={index}
                                                        imageSrc={
                                                            data?.photo?.images?.medium?.url
                                                                ? data?.photo?.images?.medium?.url
                                                                : "https://www.istockphoto.com/vi/anh/nh%C3%ACn-ra-hai-%C4%91%E1%BB%89nh-n%C3%BAi-%E1%BB%9F-ph%C3%ADa-%C4%91%C3%B4ng-b%E1%BA%AFc-%C4%91%C3%A0i-loan-n%C3%BAi-%E1%BA%A5m-tr%C3%A0-v%C3%A0-n%C3%BAi-keelung-v%C3%A0-%C4%91%E1%BA%A3o-keelung-gm1390549572-447472709"
                                                        }
                                                        title={data?.name}
                                                        location={data?.location_string}
                                                        data={data}
                                                    />
                                                ))
                                            }
                                        </>
                                    )
                                    : (
                                        <>
                                            <View className="w-full h-[400px] items-center space-y-8 justify-center">
                                                <Image
                                                    source={NotFound}
                                                    className="w-32 h-32 object-cover"
                                                />
                                                <Text className="text-2xl text-[#428288] font-semibold">
                                                    Opps...No Data Found
                                                </Text>
                                            </View>
                                        </>
                                    )
                                }
                            </View>
                        </View>
                    </ScrollView>
            }
        </SafeAreaView>
    )
}

export default Discover