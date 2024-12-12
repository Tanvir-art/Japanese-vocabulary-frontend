import React, { useState } from 'react';
import {
    useGetLessonsQuery,
    useGetVocabulariesByLessonQuery,
    useAddVocabularyMutation,
    useUpdateVocabularyMutation,
    useDeleteVocabularyMutation,
} from '../../redux/api/authApi';

type Vocabulary = {
    _id: string;
    word: string;
    pronunciation: string;
    meaning: string;
    whenToSay: string;
};

const ManageVocabularies: React.FC = () => {
    // Fetch lessons
    const { data: lessons, isLoading: lessonsLoading } = useGetLessonsQuery({});
    const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);

    // Fetch vocabularies for the selected lesson
    const { data: vocabularies, isLoading: vocabulariesLoading, refetch } =
        useGetVocabulariesByLessonQuery(selectedLessonId, { skip: !selectedLessonId });

    const [addVocabulary] = useAddVocabularyMutation();
    const [updateVocabulary] = useUpdateVocabularyMutation();
    const [deleteVocabulary] = useDeleteVocabularyMutation();

    const [editingVocabulary, setEditingVocabulary] = useState<Vocabulary | null>(null);
    const [formValues, setFormValues] = useState({
        word: '',
        pronunciation: '',
        meaning: '',
        whenToSay: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedLessonId) return alert('Please select a lesson.');

        if (editingVocabulary) {
            await updateVocabulary({ id: editingVocabulary._id, ...formValues });
            setEditingVocabulary(null);
        } else {
            await addVocabulary({ ...formValues, lessonId: selectedLessonId });
        }
        setFormValues({ word: '', pronunciation: '', meaning: '', whenToSay: '' });
        refetch();
    };

    const handleEdit = (vocabulary: Vocabulary) => {
        setEditingVocabulary(vocabulary);
        setFormValues({
            word: vocabulary.word,
            pronunciation: vocabulary.pronunciation,
            meaning: vocabulary.meaning,
            whenToSay: vocabulary.whenToSay,
        });
    };

    const handleDelete = async (id: string) => {
        await deleteVocabulary(id);
        refetch();
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-blue-600 mb-6">Manage Vocabularies</h1>

            {/* Lesson Selector */}
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">Select a Lesson</label>
                {lessonsLoading ? (
                    <p>Loading lessons...</p>
                ) : (
                    <select
                        value={selectedLessonId || ''}
                        onChange={(e) => setSelectedLessonId(e.target.value)} // Set the lesson ID
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                    >
                        <option value="" disabled>
                            -- Select a Lesson --
                        </option>
                        {/*  eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                        {lessons?.data?.map((lesson: any) => (
                            <option key={lesson._id} value={lesson._id}>
                                {lesson.lessonName} (Lesson {lesson.lessonNumber})
                            </option>
                        ))}
                    </select>
                )}
            </div>

            {/* Add/Edit Form */}
            {selectedLessonId && (
                <form className="mb-6 bg-white p-4 shadow rounded" onSubmit={handleSubmit}>
                    <h2 className="text-xl font-semibold mb-4">
                        {editingVocabulary ? 'Edit Vocabulary' : 'Add Vocabulary'}
                    </h2>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Word</label>
                        <input
                            type="text"
                            value={formValues.word}
                            onChange={(e) => setFormValues({ ...formValues, word: e.target.value })}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Pronunciation</label>
                        <input
                            type="text"
                            value={formValues.pronunciation}
                            onChange={(e) => setFormValues({ ...formValues, pronunciation: e.target.value })}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Meaning</label>
                        <input
                            type="text"
                            value={formValues.meaning}
                            onChange={(e) => setFormValues({ ...formValues, meaning: e.target.value })}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">When to Say</label>
                        <input
                            type="text"
                            value={formValues.whenToSay}
                            onChange={(e) => setFormValues({ ...formValues, whenToSay: e.target.value })}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        {editingVocabulary ? 'Update Vocabulary' : 'Add Vocabulary'}
                    </button>
                    {editingVocabulary && (
                        <button
                            type="button"
                            onClick={() => {
                                setEditingVocabulary(null);
                                setFormValues({ word: '', pronunciation: '', meaning: '', whenToSay: '' });
                            }}
                            className="ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                    )}
                </form>
            )}

            {/* Vocabulary List */}
            {selectedLessonId && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {vocabulariesLoading ? (
                        <p>Loading vocabularies...</p>
                    ) : (
                        vocabularies?.data?.map((vocabulary: Vocabulary) => (
                            <div
                                key={vocabulary._id}
                                className="bg-white p-4 shadow rounded flex flex-col justify-between"
                            >
                                <div>
                                    <h3 className="text-lg font-semibold">{vocabulary.word}</h3>
                                    <p>Pronunciation: {vocabulary.pronunciation}</p>
                                    <p>Meaning: {vocabulary.meaning}</p>
                                    <p>When to Say: {vocabulary.whenToSay}</p>
                                </div>
                                <div className="mt-4 flex space-x-2">
                                    <button
                                        onClick={() => handleEdit(vocabulary)}
                                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(vocabulary._id)}
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default ManageVocabularies;
