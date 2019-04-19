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
                    <Text style={{width:70, paddingTop:10}}>$ {(line_item.variant.price)}</Text>
                </View>
            </View>
            <TouchableOpacity
                onPress={() => removeLineItemInCart(line_item.id)}>
                <Text style={{color:'red', fontSize: 30, paddingRight:30}}>×</Text>
            </TouchableOpacity>
        </View>
    </View>

export default LineItem;