import { View, Text, TextInput, ActivityIndicator, Button, Alert } from "react-native";
import React, { useState } from "react";
import { FIREBASE_AUTH } from "../config/firebase";
import { updateProfile , createUserWithEmailAndPassword, sendEmailVerification, onAuthStateChanged } from "firebase/auth";

const Register = ({navigation}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const verifyEmail = () => {
        sendEmailVerification(auth.currentUser)
        .then(()=> {
          console.log("Email Verifications Send");
        })
        .catch(error => {
          console.log(error.message);
        })
      } 
      
    const signUp = async () => {
        setLoading(true);
        try {
            createUserWithEmailAndPassword(auth, email, password).then(result => {
                const user = result.user;
                console.log(user)
                updateProfile(user, {
                    displayName: "User1"
                })
                verifyEmail();
            })

        } catch (error: any) {
            console.log(error);
            Alert.alert("Register fail: " + error.message)
        } finally {
            setLoading(false)
        }
    }

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
                    <Button title="Register" onPress={() => signUp()} />
                    <Button title="Have already an account? Login!" onPress={() => navigation.navigate('Login')} />              
                </>}
        </View>
    )
}

export default Register