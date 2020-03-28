import React from "react";
import Note from "../components/note";
import ListContainer from "../components/list-container";
import { useStore } from "../stores/editor-store";
import { useStore as useNotesStore } from "../stores/note-store";
import { DEFAULT_CONTEXT } from "../common";

function Notes(props) {
  const newSession = useStore(store => store.newSession);
  const context = useNotesStore(store => store.context);

  return (
    <ListContainer
      type="notes"
      items={context.notes}
      item={(index, item) => (
        <Note index={index} pinnable={false} item={item} context={context} />
      )}
      button={{
        content: "Make a new note",
        onClick: () =>
          newSession({
            ...DEFAULT_CONTEXT,
            ...props.context
          })
      }}
    />
  );
}
export default Notes;
