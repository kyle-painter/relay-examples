// @flow
import type {TodoList_todos$key} from 'relay/TodoList_todos.graphql';
import type {TodoList_user$key} from 'relay/TodoList_user.graphql';

import {useAddTodoMutation} from '../mutations/AddTodoMutation';
import {useMarkAllTodosMutation} from '../mutations/MarkAllTodosMutation';
import Todo from './Todo';
import TodoListFooter from './TodoListFooter';
import TodoTextInput from './TodoTextInput';

import * as React from 'react';
import {graphql, useFragment} from 'react-relay';

type Props = {|
  todosRef: TodoList_todos$key,
  userRef: TodoList_user$key,
|};

export default function TodoList({todosRef, userRef}: Props): React.Node {
  const todos = useFragment(
    graphql`
      fragment TodoList_todos on TodoConnection {
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
    `,
    todosRef,
  );

  const user = useFragment(
    graphql`
      fragment TodoList_user on User {
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

  const commitAddTodoMutation = useAddTodoMutation(user, todos.__id);
  const handleOnSave = (text: string) => commitAddTodoMutation(text);

  const commitMarkAllTodosMutation = useMarkAllTodosMutation(user, todos.edges);
  const handleMarkAllChange = (e: SyntheticEvent<HTMLInputElement>) => {
    const complete = e.currentTarget.checked;
    commitMarkAllTodosMutation(complete);
  };

  return (
    <>
      <header className="header">
        <h1>todos</h1>

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
          {todos.edges.map(({node}) => (
            <Todo
              key={node.id}
              todoRef={node}
              userRef={user}
              todoConnectionId={todos.__id}
            />
          ))}
        </ul>
      </section>

      <TodoListFooter userRef={user} todoConnectionRef={todos} />
    </>
  );
}
