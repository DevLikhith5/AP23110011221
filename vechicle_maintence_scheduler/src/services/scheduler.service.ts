//Intution

//it is just like a pattern of dynamic programming 
//with take or not take approach and try to maximize the rewrd or impact in this case 
//here the capacity is mechanic hours 
//the weight is duration of the task 
//the value is the impact of the task 
//we use a 2d array/ or aslo we can use memoization  to store the maximum impact of taking or not taking the task 
//the array is of size (n+1)*(capacity+1) where n is the number of tasks and capacity is the mechanic hours 
//dp state 
// dp[i] = max impact culd be achevable in i hours
// transition 
// dp[i] = max(dp[i-1], dp[i-weight]+value)