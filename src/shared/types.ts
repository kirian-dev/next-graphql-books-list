import { Story, Author } from '@prisma/client';

export interface IStory extends Story {
  authors: Author[];
}
