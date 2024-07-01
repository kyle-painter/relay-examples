// @flow
import type {TodoList_user$key} from 'relay/TodoList_user.graphql';

import {useAddTodoMutation} from '../mutations/AddTodoMutation';
import {useMarkAllTodosMutation} from '../mutations/MarkAllTodosMutation';
import Todo from './Todo';
import TodoListFooter from './TodoListFooter';
import TodoTextInput from './TodoTextInput';

import * as React from 'react';
import {graphql, useRefetchableFragment} from 'react-relay';
import {useCallback, useState} from 'react';

type Props = {|
  userRef: TodoList_user$key,
|};

export default function TodoList({userRef}: Props): React.Node {
  const [count, setCount] = useState(0);
  const [user, refetch] = useRefetchableFragment(
    graphql`
      fragment TodoList_user on User
      @refetchable(queryName: "UserRefetchQuery") {
        todos(first: $first, after: $after) @connection(key: "TodoList_todos") {
          __id
          edges {
            node {
              id
              ...Todo_todo
            }
            ...MarkAllTodosMutation_todoEdge
          }
          ...TodoListFooter_todoConnection
        }
        totalCount
        completedCount
        ...AddTodoMutation_user
        ...MarkAllTodosMutation_user
        ...Todo_user
        ...TodoListFooter_user
      }
    `,
    userRef,
  );

  /*
   * Relay only performs a temporary retain of refetch queries with a timeout period of 5 minutes. This means refetch
   * onComplete callbacks can be inadvertently re-invoked after 5 minutes of inactivity. To reproduce:
   * 1. Press the 'Refetch' button and observe the onComplete alert dialog is shown.
   * 2. Wait 5 minutes.
   * 3. Press the 'Rerender' button and observe the onComplete alert dialog is shown again.
   */

  const refetchAndAlert = useCallback(() => {
    refetch({}, {onComplete: () => alert('REFETCH COMPLETED')});
  }, [refetch]);

  const rerender = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  const commitAddTodoMutation = useAddTodoMutation(user, user.todos.__id);
  const handleOnSave = (text: string) => commitAddTodoMutation(text);

  const commitMarkAllTodosMutation = useMarkAllTodosMutation(
    user,
    user.todos.edges,
  );
  const handleMarkAllChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const complete = e.currentTarget.checked;
    commitMarkAllTodosMutation(complete);
  };

  return (
    <>
      <header className="header">
        <h1>todos</h1>

        <div className="action-buttons">
          <button onClick={refetchAndAlert}>Refetch</button>
          <button onClick={rerender}>Rerender (Count: {count})</button>
        </div>

        <TodoTextInput
          className="new-todo"
          onSave={handleOnSave}
          placeholder="What needs to be done?"
        />
      </header>

      <section className="main">
        <input
          checked={user.totalCount === user.completedCount}
          className="toggle-all"
          onChange={handleMarkAllChange}
          type="checkbox"
        />

        <label htmlFor="toggle-all">Mark all as complete</label>

        <ul className="todo-list">
          {user.todos.edges.map(({node}) => (
            <Todo
              key={node.id}
              todoRef={node}
              userRef={user}
              todoConnectionId={user.todos.__id}
            />
          ))}
        </ul>
      </section>

      <TodoListFooter userRef={user} todoConnectionRef={user.todos} />
    </>
  );
}
