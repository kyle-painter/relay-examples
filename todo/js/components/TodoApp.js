// @flow
import type {TodoAppQuery} from 'relay/TodoAppQuery.graphql';
import type {
  PreloadedQuery,
  EntryPointProps,
  EntryPointComponent,
} from 'react-relay';

import TodoList from './TodoList';

import * as React from 'react';
import {graphql, usePreloadedQuery} from 'react-relay';
import {Flags} from '../common/flags';

type PreloadedQueries = {|todoAppQueryRef: PreloadedQuery<TodoAppQuery>|};
type Props = EntryPointProps<PreloadedQueries>;

export default (function TodoApp({queries}: Props): React.Node {
  const [isBatchedSchedulerEnabled, setIsBatchSchedulerEnabled] =
    React.useState(Flags.IS_BATCH_SCHEDULER_ENABLED);

  const [listKey, setListKey] = React.useState(0);
  const {user} = usePreloadedQuery(
    graphql`
      query TodoAppQuery($userId: String) @preloadable {
        user(id: $userId) @required(action: THROW) {
          todos(
            first: 2147483647 # max GraphQLInt
          ) @connection(key: "TodoApp_todos") {
            edges {
              # Read from the connection to ensure the app re-renders when appending a new edge
              node {
                id
              }
            }
            ...TodoList_todos
          }
          ...TodoList_user
        }
      }
    `,
    queries.todoAppQueryRef,
  );

  React.useEffect(() => {
    // Force a remount of the TodoList so it appears AFTER TodoApp in Relay's subscription set. When the connection is
    // updated this will ensure the TodoApp is rendered BEFORE TodoList as subscription notifications are pushed,
    // rendering the app children which still reference the stale connection data.
    setListKey((prev) => prev + 1);
  }, []);

  return (
    <div>
      <section className="todoapp">
        <TodoList key={listKey} todosRef={user.todos} userRef={user} />
      </section>

      <label>
        <input
          type="checkbox"
          checked={isBatchedSchedulerEnabled}
          onChange={() => {
            Flags.IS_BATCH_SCHEDULER_ENABLED = !isBatchedSchedulerEnabled;
            setIsBatchSchedulerEnabled(!isBatchedSchedulerEnabled);
          }}
        />
        Enable batched Relay scheduler
      </label>

      <footer className="info">
        <p>Double-click to edit a todo</p>

        <p>
          Created by the{' '}
          <a href="https://facebook.github.io/relay/">Relay team</a>
        </p>

        <p>
          Part of <a href="http://todomvc.com">TodoMVC</a>
        </p>
      </footer>
    </div>
  );
}: EntryPointComponent<PreloadedQueries>);
