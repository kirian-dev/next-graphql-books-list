import { Context } from "@/pages/api/graphql";

export const resolvers = {
  Query: {
    stories: async (parent: any, args: any, context: Context) => {
      return await context.prisma.story.findMany();
    },
    story: async (parent: any, args: any, context: Context) => {
      return await context.prisma.story.findUnique({
        where: {
          id: args.id,
        },
      });
    },
  },
  Story: {
    authors: async (parent: any, args: any, context: Context) => {
      return await context.prisma.author.findMany({
        where: {
          storyId: parent.id,
        },
      });
    },
  },
  Mutation: {
    addStory: async (parent: any, args: any, context: Context) => {
      return await context.prisma.story.create({
        data: {
          title: args.title,
          image: args.image,
        },
      });
    },
    updateStory: async (parent: any, args: any, context: Context) => {
      return await context.prisma.story.update({
        where: {
          id: args.id,
        },
        data: {
          title: args.title,
          image: args.image,
        },
      });
    },
    deleteStory: async (parent: any, args: any, context: Context) => {
      return await context.prisma.story.delete({
        where: {
          id: args.id,
        },
      });
    },
    addAuthor: async (parent: any, args: any, context: Context) => {
      return await context.prisma.author.create({
        data: {
          storyId: args.storyId,
          name: args.name,
        },
      });
    },
    deleteAuthor: async (parent: any, args: any, context: Context) => {
      return await context.prisma.author.delete({
        where: {
          id: args.id,
        },
      });
    },
  },
};
