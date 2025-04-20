import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f7f9fc',
      alignItems: 'center',
      justifyContent: 'flex-start',
      padding: 24,
    },
    title: {
      fontSize: 24,
      fontWeight: '700',
      marginBottom: 24,
      color: '#1e1e1e',
    },
    input: {
      width: '100%',
      padding: 16,
      backgroundColor: '#fff',
      borderRadius: 12,
      fontSize: 16,
      borderColor: '#ddd',
      borderWidth: 1,
      marginBottom: 16,
      color: '#333',
    },
    button: {
      width: '100%',
      backgroundColor: '#2563eb',
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: 'center',
      marginBottom: 24,
    },
    buttonDisabled: {
      backgroundColor: '#94a3b8',
    },
    buttonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
    },
    resultContainer: {
      backgroundColor: '#e0f2fe',
      padding: 20,
      borderRadius: 12,
      alignItems: 'center',
    },
    resultLabel: {
      fontSize: 16,
      color: '#0369a1',
      marginBottom: 8,
    },
    resultPrice: {
      fontSize: 22,
      fontWeight: '700',
      color: '#0284c7',
    },
  });