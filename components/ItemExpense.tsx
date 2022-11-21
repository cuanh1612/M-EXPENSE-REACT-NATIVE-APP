import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { IExpense } from "../types/inputTypes";

interface IProps {
  expense: IExpense;
}

function ItemExpense({ expense }: IProps) {
  return (
    <View style={styles.itemExpenseContainer}>
      <Text style={styles.expenseType}>{expense.type}</Text>
      <View style={styles.expenseAmountContent}>
        <Ionicons name="cash-outline" color="#009688" size={20} />
        <Text style={styles.expenseAmountText}>{expense.amount}</Text>
      </View>
      <View style={styles.expenseDateTimeContent}>
        <Ionicons name="calendar" color="#009688" size={20} />
        <Text style={styles.expenseDateTimeText}>
          {expense.date + " " + expense.time}
        </Text>
      </View>
      {expense.additionalComments && (
        <View style={styles.expenseCommentContent}>
          <Ionicons name="reader" color="#009688" size={20} />
          <Text style={styles.expenseCommentText}>
            {expense.additionalComments}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  itemExpenseContainer: {
    borderWidth: 2,
    borderColor: "#009688",
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: "white",
  },
  expenseType: {
    fontWeight: "bold",
    margin: 5,
    fontSize: 18,
  },
  expenseAmountContent: {
    fdisplay: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
  },
  expenseDateTimeContent: {
    fdisplay: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
  },
  expenseCommentContent: {
    fdisplay: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
  },
  expenseAmountText: {
    marginLeft: 5,
  },
  expenseDateTimeText: {
    marginLeft: 5,
  },
  expenseCommentText: {
    fdisplay: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
  },
});

export default ItemExpense;
