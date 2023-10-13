import React, { useCallback, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import style from './quill.module.css';
import { divide } from 'lodash';
import { Box } from '@mui/material';



const QuillEditor = ({ data, setData }) => {

    const reactQuillRef = useRef(null);
    // const [editorHtml, setEditorHtml] = useState('');

    const handleImageUpload = (file) => {
        const formData = new FormData();
        formData.append('image', file);

        // axios.post('YOUR_UPLOAD_ENDPOINT', formData)
        //     .then((response) => {
        //         const imageUrl = response.data.imageUrl;
        //         insertImage(imageUrl);
        //     })
        //     .catch((error) => {
        //         console.error('Error uploading image: ', error);
        //     });
    };
    const imageHandler = useCallback(() => {
        const input = document.createElement("input");
        input.setAttribute("type", "file");
        input.setAttribute("accept", "image/*");
        input.click();
        input.onchange = async () => {
            if (input !== null && input.files !== null) {
                const file = input.files[0];
                // const url = await uploadToCloudinary(file);
                // const quill = reactQuillRef.current;
                // if (quill) {
                //   const range = quill.getEditorSelection();
                //   range && quill.getEditor().insertEmbed(range.index, "image", url);
                // }
            }
        };
    }, []);

    const insertImage = (imageUrl) => {
        const editor = document.getElementsByClassName('ql-editor')[0];
        const range = editor.getSelection(true);

        editor.insertEmbed(range.index, 'image', imageUrl);
        editor.setSelection(range.index + 1);
    };

    const modules = {
        toolbar: {
            container: [                                    // remove formatting button
                ['image']                                  // link and image, video
            ],
            handlers: {
                image: imageHandler
            }
        }
        , clipboard: {
            // toggle to add extra line breaks when pasting HTML:
            matchVisual: false,
        }
    };
    const isBase64Image = (str) => {
        const base64Regex = /^data:image\/(jpeg|jpg|gif|png|svg);base64,/;
        return base64Regex.test(str);
    };
    const isImageUrl = (url) => {
        const imageRegex = /\.(jpeg|jpg|gif|png|svg)$/i;
        return imageRegex.test(url);
    };

    return (
        <Box sx={{
            width: '100%',
            '&.ql-editor': {
                height: '70%',
                fontSize: '15px'
            }
        }}>

            <ReactQuill
                className={style.quill}
                ref={reactQuillRef}
                theme="snow"
                value={data}
                onChange={setData}
                modules={modules}
                placeholder='Please typing note...'
                spellCheck={false}
            />
        </Box>
    );
};

export default QuillEditor;
