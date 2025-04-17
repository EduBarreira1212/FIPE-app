import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F3F4F6',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    card: {
      backgroundColor: '#FFFFFF',
      width: '100%',
      padding: 24,
      borderRadius: 16,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 4,
      alignItems: 'center',
    },
    title: {
      fontSize: 28,
      fontWeight: '600',
      marginBottom: 8,
      color: '#111827',
    },
    subtitle: {
      fontSize: 16,
      color: '#6B7280',
      marginBottom: 24,
      textAlign: 'center',
    },
    button: {
      backgroundColor: '#2563EB',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 12,
      marginTop: 12,
      width: '100%',
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '500',
      textAlign: 'center',
    },
  });
  