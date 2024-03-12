/**
 * @generated SignedSource<<d615177c1f88ee9da6dfa4ab1b89a35a>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
import type { MarkAllTodosMutation_todoEdge$fragmentType } from "./MarkAllTodosMutation_todoEdge.graphql";
import type { TodoListFooter_todoConnection$fragmentType } from "./TodoListFooter_todoConnection.graphql";
import type { Todo_todo$fragmentType } from "./Todo_todo.graphql";
import type { FragmentType } from "relay-runtime";
declare export opaque type TodoList_todos$fragmentType: FragmentType;
export type TodoList_todos$data = {|
  +__id: string,
  +edges: ?$ReadOnlyArray<?{|
    +node: ?{|
      +id: string,
      +$fragmentSpreads: Todo_todo$fragmentType,
    |},
    +$fragmentSpreads: MarkAllTodosMutation_todoEdge$fragmentType,
  |}>,
  +$fragmentSpreads: TodoListFooter_todoConnection$fragmentType,
  +$fragmentType: TodoList_todos$fragmentType,
|};
export type TodoList_todos$key = {
  +$data?: TodoList_todos$data,
  +$fragmentSpreads: TodoList_todos$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TodoList_todos",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "TodoEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Todo",
          "kind": "LinkedField",
          "name": "node",
          "plural": false,
          "selections": [
            {
              "alias": null,
              "args": null,
              "kind": "ScalarField",
              "name": "id",
              "storageKey": null
            },
            {
              "args": null,
              "kind": "FragmentSpread",
              "name": "Todo_todo"
            }
          ],
          "storageKey": null
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "MarkAllTodosMutation_todoEdge"
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "TodoListFooter_todoConnection"
    },
    {
      "kind": "ClientExtension",
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "__id",
          "storageKey": null
        }
      ]
    }
  ],
  "type": "TodoConnection",
  "abstractKey": null
};

(node/*: any*/).hash = "77ce67f603af226d50b62ad8e3471d1f";

module.exports = ((node/*: any*/)/*: Fragment<
  TodoList_todos$fragmentType,
  TodoList_todos$data,
>*/);
