import React from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebase';

export default function LoginScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <Text style={{ fontSize: 24, marginBottom: 16 }}>Sign In</Text>
      <TextInput value={email} onChangeText={setEmail} autoCapitalize="none" placeholder="Email" style={{ width: '100%', borderWidth: 1, padding: 8, marginBottom: 8 }} />
      <TextInput value={password} onChangeText={setPassword} secureTextEntry placeholder="Password" style={{ width: '100%', borderWidth: 1, padding: 8, marginBottom: 8 }} />
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
      <Button title="Sign In" onPress={signIn} />
    </View>
  );
}
