import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: '#F8F9FA', 
  },
  header: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    textAlign: 'center',
    marginBottom: 15, 
    color: '#333',
  },
  subHeader: { 
    fontSize: 16, 
    marginVertical: 5, 
    color: '#555',
  },
  foodItem: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    padding: 12, 
    borderBottomWidth: 1, 
    borderBottomColor: '#ddd',
    alignItems: 'center' 
  },
  caloriesText: { 
    color: '#333',
  },
  bar: { 
    height: 15, 
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
    color: '#444',
  },
  input: { 
    height: 50, 
    borderWidth: 1, 
    borderColor: '#ddd', 
    borderRadius: 10, 
    paddingHorizontal: 15, 
    marginBottom: 12, 
    backgroundColor: '#fff',
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    backgroundColor: '#fff',
    marginBottom: 12,
    paddingHorizontal: 10,
    height: 50,
    justifyContent: 'center',
    elevation: 2, // เพิ่มเงาให้ดูมีมิติ
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  picker: {
    fontSize: 16,
    color: '#333',
  },
  historyItem: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    padding: 10, 
    borderBottomWidth: 1, 
    alignItems: 'center' 
  },
  button: { 
    backgroundColor: '#007AFF', 
    padding: 8, 
    borderRadius: 5, 
    marginHorizontal: 5, 
  },
  disabledButton: { 
    backgroundColor: '#ccc' 
  },
  buttonText: { 
    color: 'white', 
    textAlign: 'center', 
    fontSize: 16,
  },
  quantityContainer: { 
    flexDirection: 'row', 
    alignItems: 'center' 
  },
  quantityText: { 
    fontSize: 16, 
    marginHorizontal: 10 
  },
  warningText: { 
    color: 'red', 
    fontSize: 14, 
    marginTop: 10 
  },
  historyDetails: { 
    flex: 1 
  },
  historyItemText: { 
    fontSize: 14, 
    marginVertical: 2 
  },
  historyNutritionText: { 
    fontSize: 14, 
    marginVertical: 2, 
    color: '#555' 
  },
  deleteButton: { 
    backgroundColor: '#FF3B30', 
    padding: 5, 
    borderRadius: 5 
  },
  deleteButtonText: { 
    color: 'white', 
    fontSize: 14 
  },
  categoryContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 'auto',
    paddingVertical: 0,
    marginTop: -40,
    marginBottom: 5, 
  },
  categoryButton: {
    width: 90,
    height: 35, 
    marginHorizontal: 0,
    borderRadius: 5,
    backgroundColor: '#f0f0f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryButtonActive: {
    backgroundColor: '#007AFF',
  },
  categoryText: {
    fontSize: 14,
    textAlign: 'center',
  },
  categoryTextActive: {
    color: 'white',
  },
  foodListContainer: {
    flex: 3,
    marginTop: -50,
    marginBottom: 7,
  },
  nutritionBar: { 
    marginVertical: 2, 
  },
  nutritionContainer: {
    flex: 1,
    marginBottom: 160,
  },
  buttonContainer: {
    marginTop: 0, 
    marginBottom: -10, 
  },
});
