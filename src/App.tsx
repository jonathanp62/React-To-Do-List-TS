/*
 * (#)App.tsx   0.1.0   10/21/2025
 *
 * @author  Jonathan Parker
 * @version 0.1.0
 * @since   0.1.0
 *
 * MIT License
 *
 * Copyright (c) 2025 Jonathan M. Parker
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import type { JSX } from "react";
import type { ToDoItemType } from "./types/ToDoItemType.tsx";

import './styles/styles.css'
import { useEffect, useState } from 'react';
import NewToDoForm from "./NewToDoForm.tsx";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import ToDoList from "./ToDoList.tsx";
import packageJson from "../package.json";

/**
 * The App component.
 *
 * @returns {JSX.Element}
 */
function App(): JSX.Element {
    const [todos, setTodos] = useState(() => {
        const localValue: string | null = localStorage.getItem("TODOS");

        if (localValue == null)
            return [];

        return JSON.parse(localValue);
    });

    // Executed after the component is rendered

    useEffect(() => {
        localStorage.setItem("TODOS", JSON.stringify(todos));
    });

    /**
     * Add a new to-do item.
     *
     * @param   {string}    newToDo
     */
    function addToDoItem(newToDo: string): void {
        setTodos((currentTodos: ToDoItemType[]) => {
            // Return the current list with a new todo added

            return [
                ...currentTodos,    // Destructure into distinct variables
                { id: crypto.randomUUID(), toDoItem: newToDo, completed: false },
            ];
        });
    }

    /**
     * Delete the to-do item.
     *
     * @param   {string}    id
     */
    function deleteTodo(id: string): void {

    }

    /**
     * Toggle the completed setting.
     *
     * @param   {string}    id
     * @param   {boolean}   completed
     */
    function toggleTodoCompleted(id: string, completed: boolean): void {

    }

    return (
        <>
            <NewToDoForm addToDoItemFunction={ addToDoItem } />
            <Header title={ packageJson.appConfig.header } />
            <ToDoList todos={ todos }
                      deleteTodoFunction={ deleteTodo }
                      toggleTodoCompletedFunction={ toggleTodoCompleted }
            />
            <Footer title={ packageJson.appConfig.footer }
                    version={ packageJson.version }
            />
        </>
    );
}

export default App;
