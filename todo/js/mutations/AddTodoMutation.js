// @flow
import type {AddTodoMutation_user$key} from 'relay/AddTodoMutation_user.graphql';

import {useCallback} from 'react';
import {graphql, useFragment, useMutation} from 'react-relay';

const mutation = graphql`
  mutation AddTodoMutation($connections: [ID!]!, $input: AddTodoInput!) {
    addTodo(input: $input) {
      todoEdge @appendEdge(connections: $connections) {
        node {
          id
          text
        }
      }
      user {
        id
        totalCount
      }
    }
  }
`;

let tempID = 0;

export function useAddTodoMutation(
  userRef: AddTodoMutation_user$key,
  todoConnectionId: string,
): (string) => void {
  const user = useFragment(
    graphql`
      fragment AddTodoMutation_user on User {
        userId
        id
        totalCount
      }
    `,
    userRef,
  );
  const [commit] = useMutation(mutation);

  return useCallback(
    (text: string) => {
      commit({
        variables: {
          input: {
            text,
            userId: user.userId,
          },
          connections: [todoConnectionId],
        },
        optimisticResponse: {
          addTodo: {
            todoEdge: {
              node: {
                // We omit data here present in fragments consumed by our connection. This flags the Todo.js fragment as
                // missing data and prevents the record being cached in the useFragment hook https://github.com/facebook/relay/blob/a5a794743d6f6a0cded6d2ef3497acbba821f721/packages/react-relay/relay-hooks/legacy/FragmentResource.js#L378
                id: 'client:newTodo:' + tempID++,
                text,
              },
            },
            user: {
              id: user.id,
              totalCount: user.totalCount + 1,
            },
          },
        },
      });
    },
    [commit, user, todoConnectionId],
  );
}
