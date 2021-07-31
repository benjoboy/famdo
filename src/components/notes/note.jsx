import React, { useEffect, useState } from "react";
import { Editor, EditorTools } from "@progress/kendo-react-editor";
import AutoSaveDisplay, { SavingState } from "./autoSaveDisplay";
import { updateNote } from "../../api/note/updateNote";

const {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Subscript,
  Superscript,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Indent,
  Outdent,
  OrderedList,
  UnorderedList,
  Undo,
  Redo,
  FontSize,
  FontName,
  FormatBlock,
  Link,
  Unlink,
  InsertImage,
  ViewHtml,
  InsertTable,
  AddRowBefore,
  AddRowAfter,
  AddColumnBefore,
  AddColumnAfter,
  DeleteRow,
  DeleteColumn,
  DeleteTable,
  MergeCells,
  SplitCell,
} = EditorTools;

export default function Note(props) {
  const [saving, setSaving] = useState(SavingState.NOT_SAVED);
  const [selectedNote, setSelectedNote] = useState({});
  let timer = null;

  const handleChange = (event) => {
    clearTimeout(timer);
    setSaving(SavingState.NOT_SAVED);

    setSaving(SavingState.SAVING);
    props.handleNoteChange(event.html, props.noteId);
    timer = setTimeout(async () => {
      try {
        var selected = props.notebook.find((note) => note._id === props.noteId);
        selected.content = event.html;
        console.log(selected);
        const res = await updateNote(selected);
        if (res.status === "updated") {
          setSaving(SavingState.SAVED);
        } else {
          setSaving(SavingState.NOT_SAVED);
        }
      } catch (e) {
        console.log(e, "error updating note");
      }
    }, 1000);
  };

  useEffect(() => {
    if (props.noteId) {
      setSelectedNote(
        props.notebook.find((notebook) => notebook._id === props.noteId)
      );
    }
  }, [props.noteId, props.notebook]);

  return (
    <div>
      <h1>{selectedNote && selectedNote.title}</h1>
      <Editor
        tools={[
          [Bold, Italic, Underline, Strikethrough],
          [Subscript, Superscript],
          [AlignLeft, AlignCenter, AlignRight, AlignJustify],
          [Indent, Outdent],
          [OrderedList, UnorderedList],
          FontSize,
          FontName,
          FormatBlock,
          [Undo, Redo],
          [Link, Unlink, InsertImage, ViewHtml],
          [InsertTable],
          [AddRowBefore, AddRowAfter, AddColumnBefore, AddColumnAfter],
          [DeleteRow, DeleteColumn, DeleteTable],
          [MergeCells, SplitCell],
        ]}
        contentStyle={{
          height: 400,
        }}
        value={selectedNote && selectedNote.content}
        onChange={handleChange}
      />
      <div className="d-flex">
        <button
          className="btn btn-danger"
          onClick={() => props.deleteNote(props.noteId)}
        >
          Delete note
        </button>
        <div className="p-2">
          <AutoSaveDisplay saving={saving} />
        </div>
      </div>
    </div>
  );
}
