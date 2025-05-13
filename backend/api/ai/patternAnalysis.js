// Analyze user's past expense data
const expenses = fetchExpenses(user_id); // Fetch last 3 months
const categorized = categorizeByType(expenses);

return {
  categories: categorized,
  monthly_average: calculateMonthlyAverage(categorized),
  anomaly_detected: detectAnomalies(categorized)
};
