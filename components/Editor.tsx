import React, { useCallback, useEffect } from "react";
import { EditorState } from "@codemirror/state";

import useCodeMirror from "./useCodeMirror";

import styles from "../styles/Editor.module.css";

interface Props {
  initialQuery: string;
  onChange: (query: string) => void;
}

const Editor: React.FC<Props> = (props) => {
  const { onChange, initialQuery } = props;
  const handleChange = useCallback(
    (state: EditorState) => onChange(state.doc.toString()),
    [onChange]
  );
  const [refContainer, editorView] = useCodeMirror<HTMLDivElement>({
    initialQuery: initialQuery,
    onChange: handleChange,
  });

  useEffect(() => {
    if (editorView) {
      // do nothing
    } else {
      // loading editor
    }
  }, [editorView]);

  return <div className={styles.editor} ref={refContainer}></div>;
};

export default Editor;
