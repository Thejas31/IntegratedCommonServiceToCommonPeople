function calculateBudget() {
    const salary = parseFloat(document.getElementById('salary').value) || 0;
    const otherIncome = parseFloat(document.getElementById('other-income').value) || 0;
    const rent = parseFloat(document.getElementById('rent').value) || 0;
    const utilities = parseFloat(document.getElementById('utilities').value) || 0;
    const groceries = parseFloat(document.getElementById('groceries').value) || 0;
    const transport = parseFloat(document.getElementById('transport').value) || 0;
    const education = parseFloat(document.getElementById('education').value) || 0;
    const healthcare = parseFloat(document.getElementById('healthcare').value) || 0;
    const entertainment = parseFloat(document.getElementById('entertainment').value) || 0;
    const savings = parseFloat(document.getElementById('savings').value) || 0;
    const miscellaneous = parseFloat(document.getElementById('miscellaneous').value) || 0;
    
    const totalIncome = salary + otherIncome;
    const totalExpenses = rent + utilities + groceries + transport + education + healthcare + entertainment + savings + miscellaneous;
    const balance = totalIncome - totalExpenses;
    
    document.getElementById('income-summary').textContent = `Total Income: ₹${totalIncome}`;
    document.getElementById('expenses-summary').textContent = `Total Expenses: ₹${totalExpenses}`;
    document.getElementById('balance-summary').textContent = `Balance: ₹${balance}`;
}