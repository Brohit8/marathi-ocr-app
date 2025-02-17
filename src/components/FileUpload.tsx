import React, { useState, useRef } from 'react';

interface FileUploadProps {
    maxSizeInMB?: number;
    onFileSelect?: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({
    maxSizeInMB = 4,
    onFileSelect
}) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        setError(null);

        if (!file) return;

        // Validate file type
        if (!file.type.includes('pdf')) {
            setError('Please upload a PDF file');
            return;
        }

        // Add loading state
        const fileSizeInMB = file.size / (1024 * 1024);
        if (fileSizeInMB > maxSizeInMB) {
            setError(`File size must be less than ${maxSizeInMB}MB for Vercel deployment`);
            return;
        }

        setSelectedFile(file);
        if (onFileSelect) {
            onFileSelect(file);
        }
    };

    const handleDragOver = (event: React.DragEvent) => {
        event.preventDefault();
    };

    const handleDrop = (event: React.DragEvent) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file) {
            handleFileChange({ target: { files: event.dataTransfer.files } } as React.ChangeEvent<HTMLInputElement>);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400"
                onClick={() => fileInputRef.current?.click()}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf"
                    className="hidden"
                />

                {selectedFile && (
                    <div>
                        <p className="text-sm text-gray-600">Selected file: {selectedFile.name}</p>
                        <p className="text-xs text-gray-500">
                            Size: {(selectedFile.size / (1024 * 1024)).toFixed(2)}MB
                        </p>
                        <embed
                            src={URL.createObjectURL(selectedFile)}
                            type="application/pdf"
                            className="w-full h-64 mt-4"
                        />
                    </div>
                )}

                {error && (
                    <p className="text-red-500 text-sm mt-2">{error}</p>
                )}
            </div>
        </div>
    );
};

export default FileUpload; 