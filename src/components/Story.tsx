import Link from 'next/link';
import React, { FC } from 'react';
import { useMutation } from '@apollo/client';

import { DELETE_STORY } from '@/graphql/mutation';
import { GET_STORIES } from '@/graphql/queries';
import { BASE_URL } from '@/shared/config';
import { IStory } from '@/shared/types';
import Image from 'next/image';

type StoryProps = {
  story: IStory;
};

export const Story: FC<StoryProps> = ({ story }) => {
  const [deleteStory] = useMutation(DELETE_STORY, {
    refetchQueries: [{ query: GET_STORIES }],
  });
  return (
    <section className="flex flex-col p-4  bg-slate-200 dark:bg-zinc-800 shadow-sm hover:shadow-lg hover:bg-slate-400 transition duration-300 ease-out text-white ">
      {story?.image && (
        <div>
          <Image
            width={500}
            height={500}
            src={story?.image}
            alt={story?.title}
            className="h-56 w-full object-contain rounded-t-lg shadow-md"
          />
        </div>
      )}
      <h1 className="font-bold text-xl my-2">{story?.title}</h1>
      <p className="text-xs my-2 line-clamp-3">
        Film is a remarkably effective medium in conveying drama and especially in the evocation of emotion. The art of
        motion pictures is exceedingly complex, requiring contributions from nearly all the other arts as well as
        countless technical skills (for example, in sound recording, photography, and optics). Emerging at the end of
        the 19th century, this new art form became one of the most popular and influential media of the 20th century and
        beyond.
      </p>
      <div className="flex justify-between italic	 ß text-xs mt-auto  text-slate-500">
        <p className="text-white text-lg">Authors :{story?.authors.length}</p>
      </div>
      <Link href={`/story/${story?.id}`} className="bg-blue-800 mt-5 p-2 rounded-lg">
        Read More
      </Link>
      <button onClick={() => deleteStory({ variables: { id: story?.id } })} className="bg-red-700 mt-5 p-2 rounded-lg">
        Delete
      </button>
    </section>
  );
};
