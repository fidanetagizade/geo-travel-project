import { useState } from "react"; 
import Header from "./Header";
import "./Tools.css";

function Tools() {
   
    const [todoList, setTodoList] = useState([]);
    const [newTodo, setNewTodo] = useState("");
    const [expenses, setExpenses] = useState([]);
    const [expenseText, setExpenseText] = useState("");
    const [expenseAmount, setExpenseAmount] = useState("");


    const addTodo = (e) => {
        e.preventDefault(); 
        if (!newTodo.trim()) return; 

        setTodoList([
            ...todoList, 
            { id: Date.now(), text: newTodo, completed: false } 
        ]);
        setNewTodo(""); 
    };

    const deleteTodo = (id) => {
        setTodoList(todoList.filter(todo => todo.id !== id));
    };

    const toggleComplete = (id) => {
        setTodoList(todoList.map(todo => 
            todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
    };

    const totalItems = todoList.length;
    const completedItems = todoList.filter(todo => todo.completed).length;

    const addExpense = (e) => {
        e.preventDefault();
        
        if (!expenseText.trim() || !expenseAmount)
             return;

        setExpenses([
            ...expenses,
            { id: Date.now(), text: expenseText, amount: parseFloat(expenseAmount) }
        ]);
        setExpenseText("");
        setExpenseAmount("");
    };

    const deleteExpense = (id) => {
        setExpenses(expenses.filter(item => item.id !== id));
    };

    const totalBudget = expenses.reduce((sum, item) => sum + item.amount, 0);


    return (
        <div>
            <Header />
            <div className="tools-main">
                <h1 className="tools-title">Travel Toolkit</h1>
                <div className="tools-flex">
                    
                   
                    <div className="tool-card">
                        <h2>Travel CheckList</h2>
                        <p>List your travel essentials</p>
                        
                        <form className="todo-form" onSubmit={addTodo}>
                            <input 
                                type="text" 
                                placeholder="Add item (e.g., Passport)..." 
                                value={newTodo}
                                onChange={(e) => setNewTodo(e.target.value)}
                            />
                            <button type="submit">+</button>
                        </form>

                        <ul className="todo-list">
                            {todoList.map((todo) => (
                                <li key={todo.id}>
                                    <span 
                                        className={`todo-text ${todo.completed ? "completed" : ""}`}
                                        onClick={() => toggleComplete(todo.id)}
                                    >
                                        {todo.text}
                                    </span>
                                    <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>✕</button>
                                </li>
                            ))}
                        </ul>

                        <div className="todo-stats">
                            {totalItems === 0 ? (
                                "Your list is empty. Add some items!"
                            ) : totalItems === completedItems ? (
                                "Everything is ready, you're good to go!"
                            ) : (
                                `Packed: ${completedItems} / ${totalItems} item`
                            )}
                        </div>
                    </div>

                  
                    <div className="tool-card">
                        <h2>Budget Planner</h2>
                        <p>Track your travel expenses</p>
                        
                        <form className="budget-form" onSubmit={addExpense}>
                            <input 
                                type="text" 
                                placeholder="Expense (e.g., Hotel)" 
                                value={expenseText}
                                onChange={(e) => setExpenseText(e.target.value)}
                                className="budget-input-text"
                            />
                            <input 
                                type="number" 
                                placeholder="Amount ($)" 
                                value={expenseAmount}
                                onChange={(e) => setExpenseAmount(e.target.value)}
                                className="budget-input-num"
                            />
                            <button type="submit">+</button>
                        </form>

                        <ul className="todo-list">
                            {expenses.map((item) => (
                                <li key={item.id}>
                                    <span>{item.text}</span>
                                    <div className="expense-right">
                                        <span className="expense-amount">${item.amount}</span>
                                        <button className="delete-btn" onClick={() => deleteExpense(item.id)}>✕</button>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="todo-stats budget-total">
                            Total budget: <span>${totalBudget}</span> 
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Tools;