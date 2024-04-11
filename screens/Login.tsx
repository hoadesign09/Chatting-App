import { View, Text, TextInput, ActivityIndicator, Button, Alert, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { FIREBASE_AUTH } from "../config/firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const Login = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [test, setTest] = useState("");
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const checkEmailVerification = async (user) => {
        if (user && !user.emailVerified) {
            Alert.alert("Please verify your email before login.");
            return false;
        }
        return true;
    };

    onAuthStateChanged(auth, async (user) => {
        if (user) {
            await checkEmailVerification(user);
        }
    });

    const signIn = async () => {
        setLoading(true);
        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            const user = res.user;
            console.log(res);
            const isVerified = await checkEmailVerification(user);
            if (isVerified) {
                navigation.navigate('Home');
            }
        } catch (error:any) {
            Alert.alert("Login failed:" + error.message)
        } finally {
            setLoading(false);
        }
    };

    const user = auth.currentUser;
    if (user !== null) {
        const username = user.displayName;
        const email = user.email;
        const emailVerified = user.emailVerified;
        console.log(email, emailVerified, username)
    }


    return (
        <View>
            <TextInput value={email} placeholder="Email" autoCapitalize="none" onChangeText={(text) => setEmail(text)}></TextInput>
            <TextInput secureTextEntry={true} value={password} placeholder="Password" autoCapitalize="none" onChangeText={(text) => setPassword(text)}></TextInput>
            {loading ? <ActivityIndicator size="large" color="#0000ff" />
                : <>
                    <Button title="Login" onPress={() => signIn()} />
                    <Button title="Regiser your an account" onPress={() => navigation.navigate('Register')} />              
                </>}
        </View>
    )
}

export default Login