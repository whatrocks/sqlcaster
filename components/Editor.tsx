import React, { useCallback, useEffect } from "react";
import { EditorState } from "@codemirror/state";

import useCodeMirror from "./useCodeMirror";

import styles from "../styles/Editor.module.css";

interface Props {
  // normal changes
  initialQuery: string;
  onChange: (query: string) => void;
  // external replacement
  onReplace: () => void;
  replaceQuery: string;
}

const Editor: React.FC<Props> = (props) => {
  const { onChange, initialQuery, onReplace, replaceQuery } = props;
  const handleChange = useCallback(
    (state: EditorState) => onChange(state.doc.toString()),
    [onChange]
  );
  const [refContainer, editorView] = useCodeMirror<HTMLDivElement>({
    initialQuery: initialQuery,
    onChange: handleChange,
  });
  if (replaceQuery) {
    const transaction = {
      changes: {
        from: 0,
        to: editorView.state.doc.length,
        insert: replaceQuery,
      },
    };
    const update = editorView.state.update(transaction);
    editorView.update([update]);
    onReplace();
  }

  return <div className={styles.editor} ref={refContainer}></div>;
};

export default Editor;
