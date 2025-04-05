import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';

const students = [
  { id: '1', name: 'Suman Kumar', skills: 'React, Node.js', progress: '80%' },
  { id: '2', name: 'Anita Sharma', skills: 'Python, ML', progress: '65%' },
];

export default function StudentList() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "All Students" }} />
      <Text style={styles.title}>Student Profiles</Text>
      <FlatList
        data={students}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>Skills: {item.skills}</Text>
            <Text>Profile Progress: {item.progress}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  card: { backgroundColor: '#f0f0f0', padding: 15, borderRadius: 10, marginBottom: 10 },
  name: { fontSize: 18, fontWeight: '600' },
});
