import { ContentState, convertToRaw, EditorState, Modifier } from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import React, { useEffect, useState } from "react";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export interface IWYSIWYGEditorProps {
    onChange: (...event: any[]) => void;
    value: string;
    readonly: boolean;
    noEdit: boolean;
}
const WYSIWYGEditor = ({
    onChange,
    value,
    readonly,
    noEdit = false,
}: IWYSIWYGEditorProps) => {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const [updated, setUpdated] = useState(false);

    useEffect(() => {
        if (!updated) {
            const defaultValue = value ? value : "";
            const blocksFromHtml = htmlToDraft(defaultValue);
            const contentState = ContentState.createFromBlockArray(
                blocksFromHtml.contentBlocks,
                blocksFromHtml.entityMap
            );
            const newEditorState = EditorState.createWithContent(contentState);
            setEditorState(newEditorState);
        }
    }, [value]);

    const onEditorStateChange = (editorState: EditorState) => {
        setUpdated(true);
        setEditorState(editorState);

        return onChange(
            draftToHtml(convertToRaw(editorState.getCurrentContent()))
        );
    };

    return (
        <React.Fragment>
            <div className='editor'>
                <Editor
                    toolbarHidden={noEdit}
                    readOnly={readonly}
                    spellCheck
                    editorState={editorState}
                    onEditorStateChange={onEditorStateChange}
                />
            </div>
        </React.Fragment>
    );
};

export default WYSIWYGEditor;
