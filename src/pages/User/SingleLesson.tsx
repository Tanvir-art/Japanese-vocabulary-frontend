import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetVocabulariesByLessonQuery } from '../../redux/api/authApi';

// type Vocabulary = {
//     _id: string;
//     word: string;
//     pronunciation: string;
//     meaning: string;
//     whenToSay: string;
// };

const LessonDetailsPage: React.FC = () => {
    const { id: lessonId } = useParams();
    const { data: vocabularies, isLoading, error } = useGetVocabulariesByLessonQuery(lessonId || '');

    const [currentIndex, setCurrentIndex] = useState(0);

    if (isLoading) {
        return <p>Loading vocabularies...</p>;
    }

    if (error || !vocabularies?.data || vocabularies.data.length === 0) {
        return <p>Something went wrong while fetching vocabularies.</p>;
    }

    const vocabulary = vocabularies.data[currentIndex];

    const speakWord = (word: string) => {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = 'ja-JP'; // Set the language to Japanese
        window.speechSynthesis.speak(utterance);
    };

    const handleNext = () => {
        if (currentIndex < vocabularies.data.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <div className="p-6 h-screen">
            <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center py-5">Lesson Details</h1>
            <div className="flex flex-col items-center mt-4">
                {/* Vocabulary Card */}
                <div
                    onClick={() => speakWord(vocabulary.word)}
                    className="bg-white p-6 shadow rounded cursor-pointer mb-6 text-center hover:shadow-lg transition"
                >
                    <h2 className="text-2xl font-bold text-gray-800">{vocabulary.word}</h2>
                    <p className="text-gray-700">Pronunciation: {vocabulary.pronunciation}</p>
                    <p className="text-gray-700">Meaning: {vocabulary.meaning}</p>
                    <p className="text-gray-700">When to Say: {vocabulary.whenToSay}</p>
                    <p className="text-blue-500 italic mt-4">(Click to hear pronunciation)</p>
                </div>

                {/* Navigation Buttons */}
                <div className="flex space-x-4">
                    <button
                        onClick={handlePrevious}
                        disabled={currentIndex === 0}
                        className={`px-4 py-2 rounded text-white ${currentIndex === 0 ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} transition`}
                    >
                        Previous
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={currentIndex === vocabularies.data.length - 1}
                        className={`px-4 py-2 rounded text-white ${currentIndex === vocabularies.data.length - 1 ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'} transition`}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LessonDetailsPage;
