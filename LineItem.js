import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';


const LineItem = ({ line_item, removeLineItemInCart }) =>
    <View style={{ height: 80, marginTop:10 }}>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
            <View>
                <Image source={{ uri: line_item.variant.image.src }} resizeMode='contain' style={{ width:100,height: 80 }} />
            </View>
            <View >
                <View>
                    <Text style={{width:150}} >{line_item.title}</Text>
                </View>
            </View>
            <View>
                <View>
                    <Text style={{width:100}}>$ {(line_item.variant.price)}</Text>
                </View>
            </View>
            <TouchableOpacity
                onPress={() => removeLineItemInCart(line_item.id)}>
                <Text style={{ fontSize: 20 }}>×</Text>
            </TouchableOpacity>
        </View>
    </View>

export default LineItem;