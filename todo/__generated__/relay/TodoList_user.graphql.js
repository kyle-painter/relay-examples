/**
 * @generated SignedSource<<22ea1f8169227fc4903749f8c28746ac>>
 * @flow
 * @lightSyntaxTransform
 * @nogrep
 */

/* eslint-disable */

'use strict';

/*::
import type { Fragment, ReaderFragment } from 'relay-runtime';
import type { AddTodoMutation_user$fragmentType } from "./AddTodoMutation_user.graphql";
import type { MarkAllTodosMutation_user$fragmentType } from "./MarkAllTodosMutation_user.graphql";
import type { TodoListFooter_user$fragmentType } from "./TodoListFooter_user.graphql";
import type { Todo_user$fragmentType } from "./Todo_user.graphql";
import type { FragmentType } from "relay-runtime";
declare export opaque type TodoList_user$fragmentType: FragmentType;
export type TodoList_user$data = {|
  +completedCount: number,
  +totalCount: number,
  +$fragmentSpreads: AddTodoMutation_user$fragmentType & MarkAllTodosMutation_user$fragmentType & TodoListFooter_user$fragmentType & Todo_user$fragmentType,
  +$fragmentType: TodoList_user$fragmentType,
|};
export type TodoList_user$key = {
  +$data?: TodoList_user$data,
  +$fragmentSpreads: TodoList_user$fragmentType,
  ...
};
*/

var node/*: ReaderFragment*/ = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "TodoList_user",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "totalCount",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "completedCount",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AddTodoMutation_user"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "MarkAllTodosMutation_user"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "Todo_user"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "TodoListFooter_user"
    }
  ],
  "type": "User",
  "abstractKey": null
};

(node/*: any*/).hash = "e006438298d8a2ad11c51d62ea9680a2";

module.exports = ((node/*: any*/)/*: Fragment<
  TodoList_user$fragmentType,
  TodoList_user$data,
>*/);
