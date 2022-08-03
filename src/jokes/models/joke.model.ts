import { ApiJokeModel, JokeCategory } from "./joke-api.model";

export class Joke{
  private constructor(args: MappedJoke) {
    this.joke = args.joke;
    this.category = args.category;
    this.rate = args.rate;
  }
  public joke!: string;
  public category!: JokeCategory | undefined;
  public rate!: number | undefined;


  public static deserialize(
    data: ApiJokeModel,
  ): Joke {

    return new Joke({
      joke: data.joke,
      category: data.category,
    });
  }
}

export interface MappedJoke {
   joke: string;
   category?: JokeCategory;
   rate?: number
}