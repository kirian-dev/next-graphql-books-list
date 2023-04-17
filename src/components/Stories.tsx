import React, { FC, FormEvent, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { GET_STORIES } from '@/graphql/queries';
import { IStory } from '@/shared/types';
import { ADD_STORY } from '@/graphql/mutation';
import { Story } from './Story';

export const Stories: FC = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const { data, loading, error } = useQuery(GET_STORIES);

  const [addNovel] = useMutation(ADD_STORY, {
    variables: { image, title },
    refetchQueries: [{ query: GET_STORIES }],
  });

  const stories: IStory[] = data?.stories;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (image === '' || title === '') return alert('Enter fields');

    addNovel({ variables: { image, title } });
    setTitle('');
    setImage('');
  };

  if (loading) return <p className="text-white flex items-center justify-center">Loading ....</p>;

  if (error) return <p className="text-white flex items-center justify-center">Something went wrong ....</p>;

  return (
    <div className="mt-5">
      <form onSubmit={handleSubmit} className="flex my-5 space-x-3">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Enter title.."
          className="bg-transparent border text-white p-2 rounded-lg"
        />
        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          type="text"
          placeholder="Enter Image url.."
          className="bg-transparent border text-white p-2 rounded-lg"
        />
        <button className="bg-green-500 p-2 rounded-lg ">Add Novel</button>
      </form>
      <div className="grid grid-cols-4 gap-2">
        {stories.map((story) => (
          <Story key={story.id} story={story} />
        ))}
      </div>
    </div>
  );
};
