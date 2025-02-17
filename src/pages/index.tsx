import FileUpload from '../components/FileUpload';

export default function Home() {
    const handleFileSelect = (file: File) => {
        console.log('Selected file:', file);
        // Handle the file upload logic here
    };

    return (
        <main className="min-h-screen p-8">
            <h1 className="text-2xl font-bold text-center mb-8">PDF Upload</h1>
            <FileUpload onFileSelect={handleFileSelect} />
        </main>
    );
} 