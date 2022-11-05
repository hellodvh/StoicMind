import * as SQLite from 'expo-sqlite';

//Connection to the SQLite Database  
export const DatabaseConnection = {
  getConnection: () => SQLite.openDatabase("database.db"),
};