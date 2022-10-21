import type React from "react";
import { useEffect, useState, useRef } from "react";
import { basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { EditorView, keymap } from "@codemirror/view";
import { indentWithTab } from "@codemirror/commands";
import { PostgreSQL, sql } from "@codemirror/lang-sql";

interface Props {
  initialQuery: string;
  onChange?: (state: EditorState) => void;
}

const useCodeMirror = <T extends Element>(
  props: Props
): [React.MutableRefObject<T | null>, EditorView?] => {
  const refContainer = useRef<T>(null);
  const [editorView, setEditorView] = useState<EditorView>();
  const { onChange } = props;
  useEffect(() => {
    if (!refContainer.current) {
      return;
    }
    const startState = EditorState.create({
      doc: props.initialQuery,
      extensions: [
        basicSetup,
        keymap.of([indentWithTab]),
        sql({
          dialect: PostgreSQL,
          upperCaseKeywords: true,
        }),
        EditorView.updateListener.of((update) => {
          if (update.changes) {
            onChange && onChange(update.state);
          }
        }),
      ],
    });

    const view = new EditorView({
      state: startState,
      parent: refContainer.current,
    });
    setEditorView(view);
    return () => {
      view.destroy();
    };
  }, [refContainer]);
  return [refContainer, editorView];
};
export default useCodeMirror;
