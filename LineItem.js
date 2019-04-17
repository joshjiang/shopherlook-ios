import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';


const LineItem = ({ line_item }) =>
    <View style={{ height: 80 }}>
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>
            <View>
                <Image source={{ uri: line_item.variant.image.src }} resizeMode='contain' style={{ height: 80 }}/>
            </View>
            <View >
                <View>
                    <Text>{line_item.title}</Text>
                </View>
            </View>
            <View>
                <View>
                    <Text>$ {(line_item.variant.price)}</Text>
                </View>
            </View>
            <TouchableOpacity><Text style={{ fontSize: 20 }}>×</Text></TouchableOpacity>
        </View>
    </View>

export default LineItem;