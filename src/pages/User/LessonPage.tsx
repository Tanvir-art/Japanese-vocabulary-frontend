import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGetLessonsQuery } from '../../redux/api/authApi';
export type Lesson = {
    _id: string;
    lessonName: string;
    lessonNumber: number;
    vocabularyCount: number;
}
const LessonPage: React.FC = () => {
    const { data: lessons, isLoading, error } = useGetLessonsQuery({});
    const navigate = useNavigate();

    if (isLoading) {
        return <p>Loading lessons...</p>;
    }

    if (error) {
        return <p>Something went wrong while fetching lessons.</p>;
    }

    return (
        <div className="p-6 h-screen">
            <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">All Lessons</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-4">
                {lessons?.data?.map((lesson: Lesson) => (
                    <div
                        key={lesson._id}
                        className="bg-white p-4 shadow rounded hover:shadow-lg cursor-pointer"
                        onClick={() => navigate(`/lesson/${lesson._id}`)}
                    >
                        <h2 className="text-xl font-bold text-gray-800">{lesson.lessonName}</h2>
                        <p>Lesson Number: {lesson.lessonNumber}</p>
                        <p>Vocabulary Count: {lesson.vocabularyCount || 0}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LessonPage;
