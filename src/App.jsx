import React, { useState, useEffect } from 'react';

// Component to hold all the styles
const DashboardStyles = () => (
    <style>{`
        /* General Styles & Theming */
        :root {
          --background-light: #f3f4f6;
          --text-light: #1f2937;
          --card-bg-light: #ffffff;
          --input-bg-light: #f3f4f6;
          --border-light: #d1d5db;
          --subtitle-text-light: #6b7280;
          
          --background-dark: #111827;
          --text-dark: #e5e7eb;
          --card-bg-dark: #1f2937;
          --input-bg-dark: #374151;
          --border-dark: #4b5563;
          --subtitle-text-dark: #9ca3af;
        
          --blue-600: #2563eb;
          --blue-700: #1d4ed8;
          --green-500: #22c55e;
          --red-500: #ef4444;
        }
        
        body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
              'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
              sans-serif;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
        }
        
        .dashboard-app {
            min-height: 100vh;
            background-color: var(--background-light);
            color: var(--text-light);
            transition: background-color 0.5s, color 0.5s;
        }
        
        .dashboard-app.dark {
            background-color: var(--background-dark);
            color: var(--text-dark);
        }
        
        .container {
            max-width: 1280px;
            margin: 0 auto;
            padding: 1rem;
        }
        
        /* Header */
        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
            flex-wrap: wrap; /* Allow wrapping on small screens */
            gap: 1rem;
        }
        
        .header-title {
            font-size: 1.5rem; /* Smaller base font size */
            font-weight: bold;
            margin: 0;
        }
        .dashboard-app.dark .header-title {
            color: white;
        }
        
        .header-subtitle {
            color: var(--subtitle-text-light);
            margin: 0;
        }
        .dashboard-app.dark .header-subtitle {
            color: var(--subtitle-text-dark);
        }
        
        .header-right {
            display: flex;
            align-items: center;
            gap: 1rem;
            flex-shrink: 0;
        }
        
        .time-display {
            text-align: right;
        }
        
        .time {
            font-family: monospace;
            font-size: 1.125rem; /* Smaller base font size */
            margin: 0;
        }
        .dashboard-app.dark .time {
            color: white;
        }
        
        .date {
            font-size: 0.75rem; /* Smaller base font size */
            color: var(--subtitle-text-light);
        }
        .dashboard-app.dark .date {
            color: var(--subtitle-text-dark);
        }
        
        .theme-toggle-btn {
            padding: 0.5rem;
            border-radius: 9999px;
            border: none;
            cursor: pointer;
            background-color: #e5e7eb;
        }
        .dashboard-app.dark .theme-toggle-btn {
            background-color: #374151;
        }
        .theme-toggle-btn:focus {
            outline: 2px solid var(--blue-600);
            outline-offset: 2px;
        }
        
        .sun-icon { color: #f59e0b; }
        .moon-icon { color: #9ca3af; }
        
        /* Main Grid & Cards */
        .main-grid {
            display: grid;
            grid-template-columns: 1fr;
            gap: 1.5rem; /* Smaller gap for mobile */
        }
        
        .card {
            background-color: var(--card-bg-light);
            padding: 1.5rem;
            border-radius: 1rem;
            box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05);
            transition: box-shadow 0.3s;
        }
        .card:hover {
            box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04);
        }
        .dashboard-app.dark .card {
            background-color: var(--card-bg-dark);
        }
        
        .card-title {
            font-size: 1.25rem;
            font-weight: 600;
            margin-top: 0;
            margin-bottom: 1rem;
        }
        
        /* To-Do List */
        .add-task-form {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 1rem;
        }
        
        .add-task-input {
            flex-grow: 1;
            padding: 0.5rem;
            border: 1px solid var(--border-light);
            border-radius: 0.5rem;
            background-color: var(--input-bg-light);
            color: var(--text-light);
        }
        .dashboard-app.dark .add-task-input {
            border-color: var(--border-dark);
            background-color: var(--input-bg-dark);
            color: var(--text-dark);
        }
        .add-task-input:focus {
            outline: none;
            box-shadow: 0 0 0 2px var(--blue-600);
        }
        
        .add-task-btn {
            padding: 0.5rem 1rem;
            background-color: var(--blue-600);
            color: white;
            border: none;
            border-radius: 0.5rem;
            cursor: pointer;
            transition: background-color 0.2s;
        }
        .add-task-btn:hover {
            background-color: var(--blue-700);
        }
        .add-task-btn:focus {
            outline: 2px solid var(--blue-600);
            outline-offset: 2px;
        }
        
        .task-list {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
            height: 14rem; /* Smaller height for mobile */
            overflow-y: auto;
            padding-right: 0.5rem;
        }
        
        .task-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0.75rem;
            border-radius: 0.5rem;
            transition: all 0.3s;
            background-color: #f3f4f6;
        }
        .dashboard-app.dark .task-item {
            background-color: #374151;
        }
        
        .task-item.completed {
            background-color: #dcfce7;
        }
        .dashboard-app.dark .task-item.completed {
            background-color: rgba(34, 197, 94, 0.2);
        }
        
        .task-text {
            flex-grow: 1;
            cursor: pointer;
            padding-right: 0.5rem;
        }
        .task-item.completed .task-text {
            text-decoration: line-through;
            color: #6b7280;
        }
        .dashboard-app.dark .task-item.completed .task-text {
            color: #9ca3af;
        }
        
        .task-actions {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            flex-shrink: 0;
        }
        
        .task-actions button {
            background: none;
            border: none;
            cursor: pointer;
            padding: 0;
        }
        
        .check-icon { width: 1.25rem; height: 1.25rem; color: var(--green-500); }
        .check-icon.filled { fill: var(--green-500); }
        .trash-icon { width: 1.25rem; height: 1.25rem; color: var(--red-500); }
        
        
        .empty-tasks {
            text-align: center;
            padding-top: 2.5rem;
            padding-bottom: 2.5rem;
            color: var(--subtitle-text-light);
        }
        .dashboard-app.dark .empty-tasks {
            color: var(--subtitle-text-dark);
        }
        .empty-tasks-subtitle {
            font-size: 0.875rem;
        }
        
        /* Progress Card */
        .progress-card {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        
        .progress-circle {
            position: relative;
            width: 8rem; /* Smaller base size */
            height: 8rem;
        }
        
        .progress-svg {
            width: 100%;
            height: 100%;
            transform: rotate(-90deg);
        }
        
        .circle-bg, .circle {
            fill: none;
            stroke-width: 3;
        }
        
        .circle-bg {
            stroke: #e5e7eb;
        }
        .dashboard-app.dark .circle-bg {
            stroke: #374151;
        }
        
        .circle {
            stroke: var(--blue-600);
            stroke-linecap: round;
            transition: stroke-dasharray 0.5s ease-in-out;
        }
        
        .progress-text {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
        
        .progress-percentage {
            font-size: 1.5rem; /* Smaller base font size */
            font-weight: bold;
        }
        .dashboard-app.dark .progress-percentage {
            color: white;
        }
        
        .progress-label {
            color: var(--subtitle-text-light);
        }
        .dashboard-app.dark .progress-label {
            color: var(--subtitle-text-dark);
        }
        
        .progress-summary {
            margin-top: 1rem;
            text-align: center;
            color: #4b5563;
        }
        .dashboard-app.dark .progress-summary {
            color: #d1d5db;
        }

        /* Responsive Breakpoints */
        
        /* Small devices (tablets, 640px and up) */
        @media (min-width: 640px) {
            .container {
                padding: 2rem;
            }
            .header-title {
                font-size: 1.875rem;
            }
            .time {
                font-size: 1.25rem;
            }
            .date {
                font-size: 0.875rem;
            }
             .main-grid {
                gap: 2rem;
            }
            .task-list {
                height: 16rem;
            }
            .check-icon, .trash-icon {
                width: 1.5rem;
                height: 1.5rem;
            }
            .progress-circle {
                width: 10rem;
                height: 10rem;
            }
            .progress-percentage {
                font-size: 1.875rem;
            }
        }

        /* Medium devices (laptops, 768px and up) */
        @media (min-width: 768px) {
            .main-grid {
                grid-template-columns: 2fr 1fr;
            }
        }
    `}</style>
);


// SVG Icons for the UI, makes it clean and dependency-free
const SunIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="sun-icon">
        <circle cx="12" cy="12" r="5"></circle>
        <line x1="12" y1="1" x2="12" y2="3"></line>
        <line x1="12" y1="21" x2="12" y2="23"></line>
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
        <line x1="1" y1="12" x2="3" y2="12"></line>
        <line x1="21" y1="12" x2="23" y2="12"></line>
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
    </svg>
);

const MoonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="moon-icon">
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
    </svg>
);

const CheckCircleIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
    </svg>
);

const Trash2Icon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        <line x1="10" y1="11" x2="10" y2="17"></line>
        <line x1="14" y1="11" x2="14" y2="17"></line>
    </svg>
);


// Main Application Component
export default function App() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [time, setTime] = useState(new Date());
    const [tasks, setTasks] = useState([
        { id: 1, text: 'Review design mockups', completed: true },
        { id: 2, text: 'Develop new feature', completed: false },
        { id: 3, text: 'Write documentation', completed: false },
    ]);
    const [newTask, setNewTask] = useState('');

    // Effect for the clock
    useEffect(() => {
        const timerId = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timerId);
    }, []);
    
    const getGreeting = () => {
        const currentHour = time.getHours();
        if (currentHour >= 5 && currentHour < 12) {
            return 'Good Morning!';
        } else if (currentHour >= 12 && currentHour < 18) {
            return 'Good Afternoon!';
        } else {
            return 'Good Evening!';
        }
    };

    const handleToggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    const handleTaskToggle = (id) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const handleTaskDelete = (id) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const handleAddTask = (e) => {
        e.preventDefault();
        if (newTask.trim() === '') return;
        const newTaskObject = {
            id: Date.now(),
            text: newTask,
            completed: false
        };
        setTasks([...tasks, newTaskObject]);
        setNewTask('');
    };

    const completedTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    return (
        <>
            <DashboardStyles />
            <div className={`dashboard-app ${isDarkMode ? 'dark' : ''}`}>
                <div className="container">

                    {/* Header */}
                    <header className="header">
                        <div>
                            <h1 className="header-title">{getGreeting()}</h1>
                            <p className="header-subtitle">Welcome to your interactive dashboard.</p>
                        </div>
                        <div className="header-right">
                            <div className="time-display">
                                <p className="time">{time.toLocaleTimeString()}</p>
                                <p className="date">{time.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            </div>
                            <button onClick={handleToggleTheme} className="theme-toggle-btn">
                                {isDarkMode ? <SunIcon /> : <MoonIcon />}
                            </button>
                        </div>
                    </header>

                    {/* Main Content Grid */}
                    <main className="main-grid">

                        {/* To-Do List Card */}
                        <div className="card todo-card">
                            <h2 className="card-title">Your Tasks</h2>
                            <form onSubmit={handleAddTask} className="add-task-form">
                                <input
                                    type="text"
                                    value={newTask}
                                    onChange={(e) => setNewTask(e.target.value)}
                                    placeholder="Add a new task..."
                                    className="add-task-input"
                                />
                                <button type="submit" className="add-task-btn">Add</button>
                            </form>

                            <div className="task-list">
                                {tasks.map(task => (
                                    <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                                        <span className="task-text" onClick={() => handleTaskToggle(task.id)}>
                                            {task.text}
                                        </span>
                                        <div className="task-actions">
                                            <button onClick={() => handleTaskToggle(task.id)} className="task-btn-complete">
                                                <CheckCircleIcon className={`check-icon ${task.completed ? 'filled' : ''}`} />
                                            </button>
                                            <button onClick={() => handleTaskDelete(task.id)} className="task-btn-delete">
                                                <Trash2Icon className="trash-icon" />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {tasks.length === 0 && (
                                    <div className="empty-tasks">
                                        <p>You're all caught up!</p>
                                        <p className="empty-tasks-subtitle">Add a new task to get started.</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Progress Card */}
                        <div className="card progress-card">
                            <h2 className="card-title">Task Progress</h2>
                            <div className="progress-circle">
                                <svg className="progress-svg" viewBox="0 0 36 36">
                                    <path className="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                    <path className="circle" strokeDasharray={`${progressPercentage}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                </svg>
                                <div className="progress-text">
                                    <span className="progress-percentage">{Math.round(progressPercentage)}%</span>
                                    <span className="progress-label">Done</span>
                                </div>
                            </div>
                            <p className="progress-summary">{completedTasks} of {totalTasks} tasks completed</p>
                        </div>
                    </main>
                </div>
            </div>
        </>
    );
}

