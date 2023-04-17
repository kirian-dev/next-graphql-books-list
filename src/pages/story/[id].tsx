'use client';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { FC, useState } from 'react';
import { AiFillMinusCircle } from 'react-icons/ai';

import { ADD_AUTHOR, DELETE_AUTHOR, UPDATE_STORY } from '@/graphql/mutation';
import { GET_STORY } from '@/graphql/queries';
import { IStory } from '@/shared/types';
import { useMutation, useQuery } from '@apollo/client';
import Link from 'next/link';

const Story: FC = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id) {
    return <p className="text-white flex items-center justify-center pt-10 text-3xl">ID is undefined ....</p>;
  }

  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');

  const { data, loading, error } = useQuery(GET_STORY, {
    variables: { id: id },
  });
  const [addAuthor] = useMutation(ADD_AUTHOR, {
    variables: { storyId: id, name },
    refetchQueries: [{ query: GET_STORY, variables: { id } }],
  });

  const [deleteAuthor] = useMutation(DELETE_AUTHOR, {
    refetchQueries: [{ query: GET_STORY, variables: { id } }],
  });

  const [updateStory] = useMutation(UPDATE_STORY, {
    variables: { id: id, title: title, image: url },
    refetchQueries: [{ query: GET_STORY, variables: { id } }],
  });

  const story: IStory = data?.story;

  const handleAddAuthor = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name === '') return alert('Please enter author name');
    addAuthor({ variables: { storyId: id, name } });
    setName('');
  };

  const handleUpdateStory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title === '' || url === '') return alert('Please enter fields');
    updateStory({ variables: { id: id, title: title, image: url } });
    setTitle('');
    setUrl('');
  };

  if (loading) return <p className="text-white flex items-center justify-center">Loading ....</p>;

  if (error) return <p className="text-white flex items-center justify-center">Something went wrong ....</p>;

  return (
    <article className="max-w-5xl mx-auto text-white mt-10">
      <section className="flex gap-2 ">
        {story.image && <Image height={500} width={500} src={story.image} alt="" />}

        <div className="p-2 flex flex-col">
          <h1 className="text-4xl pb-2">{story.title}</h1>

          <div className="flex gap-2">
            {story?.authors?.map((author: any) => (
              <div key={author.id} className="flex items-center gap-2 pb-4">
                <h2 className="font-bold">{author?.name}</h2>
                <AiFillMinusCircle
                  onClick={() =>
                    deleteAuthor({
                      variables: {
                        id: author.id,
                      },
                    })
                  }
                  color="red"
                  className="cursor-pointer"
                />
              </div>
            ))}
          </div>
          <p className="text-slate-400 ">
            Film is a remarkably effective medium in conveying drama and especially in the evocation of emotion. The art
            of motion pictures is exceedingly complex, requiring contributions from nearly all the other arts as well as
            countless technical skills (for example, in sound recording, photography, and optics). Emerging at the end
            of the 19th century, this new art form became one of the most popular and influential media of the 20th
            century and beyond.
          </p>
        </div>
        <Link href="/" className="rounded bg-slate-500 p-2 block max-h-[40px]">
          Back
        </Link>
      </section>

      <form onSubmit={handleUpdateStory} className="flex gap-2 mt-10">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Enter new title"
          className="bg-transparent border text-white p-2 rounded-lg"
        />
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          type="text"
          placeholder="new url"
          className="bg-transparent border text-white p-2 rounded-lg"
        />
        <button className="bg-blue-500 rounded-lg p-2">Update</button>
      </form>
      <form onSubmit={handleAddAuthor} className="mt-5 space-x-2">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Enter Author"
          className="bg-transparent border p-2 mx-2"
        />
        <button
          disabled={!name}
          className="border p-2 rounded-lg bg-green-500 disabled:text-gray-500 disabled:cursor-not-allowed"
        >
          Add Author
        </button>
      </form>
    </article>
  );
};

export default Story;
