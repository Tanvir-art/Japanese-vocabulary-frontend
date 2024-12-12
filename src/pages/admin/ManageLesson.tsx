import React, { useState } from 'react';
import {
    useGetLessonsQuery,
    useAddLessonMutation,
    useUpdateLessonMutation,
    useDeleteLessonMutation,
} from '../../redux/api/authApi';

type Lesson = {
    _id: string;
    lessonName: string;
    lessonNumber: number;
    vocabularyCount: number;
}
const ManageLessons: React.FC = () => {
    const { data: lessons = [], isLoading, refetch } = useGetLessonsQuery({});
    const [addLesson] = useAddLessonMutation();
    const [updateLesson] = useUpdateLessonMutation();
    const [deleteLesson] = useDeleteLessonMutation();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [editingLesson, setEditingLesson] = useState<any | null>(null);
    const [formValues, setFormValues] = useState({ lessonName: '' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (editingLesson) {
            await updateLesson({ id: editingLesson._id, ...formValues });
            setEditingLesson(null);
        } else {
            await addLesson(formValues);
        }
        setFormValues({ lessonName: '' });
        refetch();
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleEdit = (lesson: any) => {
        setEditingLesson(lesson);
        setFormValues({ lessonName: lesson.lessonName });
    };

    const handleDelete = async (id: string) => {
        await deleteLesson(id);
        refetch();
    };

    if (isLoading) return <p>Loading lessons...</p>;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-blue-600 mb-6">Manage Lessons</h1>

            {/* Add/Edit Form */}
            <form className="mb-6 bg-white p-4 shadow rounded" onSubmit={handleSubmit}>
                <h2 className="text-xl font-semibold mb-4">{editingLesson ? 'Edit Lesson' : 'Add Lesson'}</h2>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Lesson Name</label>
                    <input
                        type="text"
                        value={formValues.lessonName}
                        onChange={(e) => setFormValues({ ...formValues, lessonName: e.target.value })}
                        className="mt-1 block w-full p-2 border border-gray-300 rounded"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    {editingLesson ? 'Update Lesson' : 'Add Lesson'}
                </button>
                {editingLesson && (
                    <button
                        type="button"
                        onClick={() => {
                            setEditingLesson(null);
                            setFormValues({ lessonName: '' });
                        }}
                        className="ml-4 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                )}
            </form>

            {/* Lessons List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {lessons?.data?.map((lesson: Lesson) => (
                    <div
                        key={lesson._id}
                        className="bg-white p-4 shadow rounded flex flex-col justify-between"
                    >
                        <div>
                            <h3 className="text-lg font-semibold">{lesson.lessonName}</h3>
                            <p>Lesson Number: {lesson.lessonNumber}</p>
                            <p>Vocabulary Count: {lesson.vocabularyCount || 0}</p>
                        </div>
                        <div className="mt-4 flex space-x-2">
                            <button
                                onClick={() => handleEdit(lesson)}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(lesson._id)}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageLessons;
