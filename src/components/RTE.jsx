import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form';


const RTE = ({
    label = '',
    name = '',
    control,
    errors,
    defaultValue = '',
    ...rest
}) => {
    return (
        <div>
            {label && <label className="text-sm font-semibold text-gray-600">{label}</label>}
            <Controller
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={({ field }) => (
                    <Editor
                        apiKey='tqqx0r9h6z365kvdgi6pqvh2lma2szc8ks61mw1jhwdtax5b'
                        value={field.value}
                        init={{
                            selector: 'textarea',
                            browser_spellcheck: false, 
                            automatic_uploads: false,
                            language: 'en', 
                            directionality: 'ltr',
                            branding: false,
                            height: 500,
                            menubar: true,
                            plugins: [
                                'advlist autolink lists link image charmap print preview anchor',
                                'searchreplace visualblocks code fullscreen',
                                'insertdatetime media table paste code help wordcount'
                            ],
                            toolbar:
                                'undo redo | formatselect | bold italic backcolor | \
                                alignleft aligncenter alignright alignjustify | \
                                bullist numlist outdent indent | removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
                        }}
                        onEditorChange={(content) => {
                            field.onChange(content); 
                        }}
                        {...rest}
                    />
                )}
            />
            {errors && <p className="text-red-500 text-sm">{errors.message}</p>}
        </div>
    );
};

export default RTE;