import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Stack } from 'expo-router';

const jobs = [
  { id: '1', title: 'Frontend Intern', company: 'TechNova', skills: 'React, JS' },
  { id: '2', title: 'Backend Intern', company: 'NodeStack', skills: 'Node.js, MongoDB' },
];

export default function JobMatches() {
  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Job Matches" }} />
      <Text style={styles.title}>Your Job Matches</Text>
      <FlatList
        data={jobs}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.jobTitle}>{item.title}</Text>
            <Text>Company: {item.company}</Text>
            <Text>Skills: {item.skills}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
  card: { backgroundColor: '#eee', padding: 15, borderRadius: 10, marginBottom: 15 },
  jobTitle: { fontSize: 18, fontWeight: '600' },
});
